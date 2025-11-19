import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactFormSchema, type ContactApiResponse } from '@/lib/validations/quote';
import { sendContactNotificationEmail, sendContactConfirmationEmail } from '@/lib/email';
import { checkRateLimit, getClientIP, RATE_LIMIT_CONFIG } from '@/lib/rate-limit';
import { z } from 'zod';

// CORS headers - restrict to allowed origins
const getAllowedOrigins = () => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
  return allowedOrigins;
};

const getCorsHeaders = (origin?: string | null) => {
  const allowedOrigins = getAllowedOrigins();
  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return NextResponse.json({}, { headers: getCorsHeaders(origin) });
}

// POST endpoint to handle contact form submissions
export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin');
    const corsHeaders = getCorsHeaders(origin);

    // Check rate limit
    const clientIP = getClientIP(request.headers);
    const rateLimitCheck = checkRateLimit(
      `contact:${clientIP}`,
      RATE_LIMIT_CONFIG.contact
    );

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests',
          error: 'You have exceeded the rate limit for contact submissions. Please try again later.',
        } as ContactApiResponse,
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Retry-After': String(Math.ceil((rateLimitCheck.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(RATE_LIMIT_CONFIG.contact.maxRequests),
            'X-RateLimit-Remaining': String(rateLimitCheck.remaining),
            'X-RateLimit-Reset': String(rateLimitCheck.resetTime),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate request data with Zod schema
    const validatedData = contactFormSchema.parse(body);

    // Save contact to database
    const contact = await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        status: 'new',
      },
    });

    // Log the contact form submission for monitoring
    console.log('Contact form submission saved:', {
      id: contact.id,
      name: validatedData.name,
      email: validatedData.email,
      timestamp: new Date().toISOString(),
    });

    // Send admin notification email
    await sendContactNotificationEmail({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
      contactId: contact.id,
    });

    // Send confirmation email to user
    await sendContactConfirmationEmail({
      name: validatedData.name,
      email: validatedData.email,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! We will get back to you within 24 hours.',
      } as ContactApiResponse,
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    const origin = request.headers.get('origin');
    const corsHeaders = getCorsHeaders(origin);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => err.message).join(', ');
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          error: errorMessages,
        } as ContactApiResponse,
        { status: 400, headers: corsHeaders }
      );
    }

    // Handle database errors
    if (error instanceof Error) {
      if (error.message.includes('database') || error.message.includes('connection')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Database error',
            error: 'Unable to save your message. Please try again later.',
          } as ContactApiResponse,
          { status: 503, headers: corsHeaders }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message: 'Server error',
        error: 'An unexpected error occurred. Please try again later.',
      } as ContactApiResponse,
      { status: 500, headers: corsHeaders }
    );
  }
}

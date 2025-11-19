import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { quoteFormSchema, type QuoteApiResponse } from '@/lib/validations/quote';
import { sendQuoteConfirmationEmail } from '@/lib/email';
import { checkRateLimit, getClientIP, RATE_LIMIT_CONFIG } from '@/lib/rate-limit';
import { z } from 'zod';

// CORS headers - restrict to allowed origins
const getAllowedOrigins = () => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
  return allowedOrigins;
};

const getCorsHeaders = (origin?: string) => {
  const allowedOrigins = getAllowedOrigins();
  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return NextResponse.json({}, { headers: getCorsHeaders(origin) });
}

// POST endpoint to handle quote submissions
export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin');
    const corsHeaders = getCorsHeaders(origin);

    // Check rate limit
    const clientIP = getClientIP(request.headers);
    const rateLimitCheck = checkRateLimit(
      `quote:${clientIP}`,
      RATE_LIMIT_CONFIG.quote
    );

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests',
          error: 'You have exceeded the rate limit for quote submissions. Please try again later.',
        } as QuoteApiResponse,
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Retry-After': String(Math.ceil((rateLimitCheck.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(RATE_LIMIT_CONFIG.quote.maxRequests),
            'X-RateLimit-Remaining': String(rateLimitCheck.remaining),
            'X-RateLimit-Reset': String(rateLimitCheck.resetTime),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate request data with Zod schema
    const validatedData = quoteFormSchema.parse(body);

    // Convert deliveryDate string to Date object
    const deliveryDate = new Date(validatedData.deliveryDate);

    // Check if deliveryDate is valid
    if (isNaN(deliveryDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid delivery date',
          error: 'The delivery date provided is not valid',
        } as QuoteApiResponse,
        { status: 400, headers: corsHeaders }
      );
    }

    // Optional: Validate city if cityId is provided
    let validatedCityId: string | undefined = undefined;
    if (validatedData.cityId) {
      const city = await prisma.city.findUnique({
        where: { id: validatedData.cityId },
      });

      if (city) {
        validatedCityId = city.id;
      }
    }

    // Save quote to database using Prisma
    const quote = await prisma.quote.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        zipCode: validatedData.zipCode,
        cityId: validatedCityId,
        dumpsterSize: validatedData.dumpsterSize,
        serviceType: validatedData.serviceType,
        projectType: validatedData.projectType,
        rentalDuration: validatedData.rentalDuration,
        deliveryDate: deliveryDate,
        address: validatedData.address,
        message: validatedData.message || null,
        status: 'pending',
      },
    });

    // Send confirmation email to customer
    await sendQuoteConfirmationEmail({
      name: validatedData.name,
      email: validatedData.email,
      quoteId: quote.id,
      dumpsterSize: validatedData.dumpsterSize,
      deliveryDate: deliveryDate,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Quote submitted successfully! We will contact you within 24 hours.',
        quoteId: quote.id,
      } as QuoteApiResponse,
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error processing quote submission:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => err.message).join(', ');
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          error: errorMessages,
        } as QuoteApiResponse,
        { status: 400, headers: corsHeaders }
      );
    }

    // Handle Prisma errors
    if (error instanceof Error) {
      // Check for specific Prisma errors
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Duplicate entry',
            error: 'This quote already exists',
          } as QuoteApiResponse,
          { status: 409, headers: corsHeaders }
        );
      }

      // Database connection errors
      if (error.message.includes('database') || error.message.includes('connection')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Database error',
            error: 'Unable to connect to the database. Please try again later.',
          } as QuoteApiResponse,
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
      } as QuoteApiResponse,
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET endpoint to retrieve quotes (optional - for admin/dashboard use)
export async function GET(request: NextRequest) {
  try {
    const origin = request.headers.get('origin');
    const corsHeaders = getCorsHeaders(origin);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where = status ? { status } : {};

    const quotes = await prisma.quote.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        city: {
          include: {
            state: true,
          },
        },
      },
    });

    const total = await prisma.quote.count({ where });

    return NextResponse.json(
      {
        quotes,
        total,
        limit,
        offset,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error fetching quotes:', error);
    const origin = request.headers.get('origin');
    const corsHeaders = getCorsHeaders(origin);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500, headers: corsHeaders }
    );
  }
}

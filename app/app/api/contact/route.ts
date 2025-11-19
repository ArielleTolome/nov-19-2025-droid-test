import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema, type ContactApiResponse } from '@/lib/validations/quote';
import { z } from 'zod';

// CORS headers (optional - remove if not needed)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// POST endpoint to handle contact form submissions
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request data with Zod schema
    const validatedData = contactFormSchema.parse(body);

    // TODO: Here you can implement various actions:
    // 1. Save to database (create a Contact model in Prisma)
    // 2. Send email notification to admin
    // 3. Send confirmation email to user
    // 4. Integrate with CRM system
    // 5. Send to Slack/Discord webhook

    // Example: Log the contact form submission (replace with actual implementation)
    console.log('Contact form submission received:', {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      messageLength: validatedData.message.length,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send email notification
    // This is a placeholder for email functionality
    /*
    await sendContactNotification({
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      from: validatedData.email,
      name: validatedData.name,
      phone: validatedData.phone,
      message: validatedData.message,
    });

    await sendConfirmationEmail({
      to: validatedData.email,
      name: validatedData.name,
    });
    */

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! We will get back to you within 24 hours.',
      } as ContactApiResponse,
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error processing contact form submission:', error);

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

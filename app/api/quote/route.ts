import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      zipCode,
      dumpsterSize,
      serviceType,
      projectType,
      rentalDuration,
      deliveryDate,
      address,
      message,
    } = body;

    // Find city by zip code (simplified - in production, use proper zip code lookup)
    const city = await prisma.city.findFirst({
      where: {
        zipCodes: {
          has: zipCode,
        },
      },
    });

    // Create quote
    const quote = await prisma.quote.create({
      data: {
        name,
        email,
        phone,
        cityId: city?.id,
        dumpsterSize,
        serviceType,
        projectType,
        rentalDuration,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        address,
        zipCode,
        message,
        status: 'pending',
      },
    });

    // TODO: Send email notification
    // await sendQuoteEmail(quote);

    return NextResponse.json({ success: true, quoteId: quote.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating quote:', error);
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}

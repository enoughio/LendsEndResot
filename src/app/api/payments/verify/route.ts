import { BookingStatus, PaymentStatus } from '@prisma/client';
import { createHmac } from 'crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
      return NextResponse.json({ message: 'Missing payment params' }, { status: 400 });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
    }

    const bookingExists = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!bookingExists) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: BookingStatus.CONFIRMED,
        paymentStatus: PaymentStatus.PAID,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Payment verify error', error);
    return NextResponse.json({ message: 'Verification failed' }, { status: 500 });
  }
}

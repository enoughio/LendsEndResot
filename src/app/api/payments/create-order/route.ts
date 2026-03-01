import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { razorpay } from '@/lib/razorpay';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { amount, currency = 'INR', receipt } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency,
      receipt: receipt || `booking-${Date.now()}`,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Razorpay order error', error);
    return NextResponse.json({ message: 'Unable to create order' }, { status: 500 });
  }
}

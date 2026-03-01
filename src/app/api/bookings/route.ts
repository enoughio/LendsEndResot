import { BookingStatus, PaymentStatus, Role } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { bookingSchema } from '@/lib/validators';

const MS_IN_DAY = 1000 * 60 * 60 * 24;

function calculateNights(checkIn: Date, checkOut: Date) {
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.max(1, Math.ceil(diff / MS_IN_DAY));
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const isAdmin = session.user.role === Role.ADMIN;
  const bookings = await prisma.booking.findMany({
    where: isAdmin ? undefined : { userId: session.user.id },
    include: { room: true, activities: { include: { activity: true } }, user: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const json = await req.json();
  const parsed = bookingSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { roomId, checkIn, checkOut, guests, activities, totalAmount, currency, razorpayOrderId } = parsed.data;

  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) {
    return NextResponse.json({ message: 'Room not found' }, { status: 404 });
  }

  if (room.status !== 'AVAILABLE') {
    return NextResponse.json({ message: 'Room is unavailable' }, { status: 400 });
  }

  const overlapping = await prisma.booking.count({
    where: {
      roomId,
      status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      checkIn: { lt: checkOut },
      checkOut: { gt: checkIn },
    },
  });

  if (overlapping >= room.totalInventory) {
    return NextResponse.json({ message: 'Selected dates are fully booked' }, { status: 409 });
  }

  const nights = calculateNights(checkIn, checkOut);
  const baseAmount = room.price * nights;

  // Validate activities against DB pricing to avoid tampering
  const activityCosts = await Promise.all(
    (activities || []).map(async (item) => {
      const activity = await prisma.activity.findUnique({ where: { id: item.activityId } });
      if (!activity) return 0;
      return activity.price * item.quantity;
    }),
  );

  const computedTotal = baseAmount + activityCosts.reduce((sum, value) => sum + value, 0);

  if (computedTotal !== totalAmount) {
    return NextResponse.json({ message: 'Amount mismatch. Please refresh and try again.' }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      roomId,
      checkIn,
      checkOut,
      guests,
      status: BookingStatus.PENDING,
      totalAmount,
      currency,
      razorpayOrderId,
      paymentStatus: PaymentStatus.PENDING,
      activities: {
        create: (activities || []).map((item) => ({
          activityId: item.activityId,
          quantity: item.quantity,
        })),
      },
    },
    include: { room: true },
  });

  return NextResponse.json(booking, { status: 201 });
}

import { BookingStatus, PaymentStatus, Role } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: { id: string };
}

export async function GET(_req: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: { room: true, activities: { include: { activity: true } }, user: true },
  });

  if (!booking) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  const isOwner = booking.userId === session.user.id;
  const isAdmin = session.user.role === Role.ADMIN;
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(booking);
}

export async function PATCH(req: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== Role.ADMIN) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { status, paymentStatus } = await req.json();

  const booking = await prisma.booking.update({
    where: { id: params.id },
    data: {
      status: status as BookingStatus | undefined,
      paymentStatus: paymentStatus as PaymentStatus | undefined,
    },
  });

  return NextResponse.json(booking);
}

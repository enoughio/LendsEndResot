import { BookingStatus, PaymentStatus, Role } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== Role.ADMIN) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const [totalBookings, confirmedBookings, pendingBookings, revenue, upcoming, rooms] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: BookingStatus.CONFIRMED } }),
    prisma.booking.count({ where: { status: BookingStatus.PENDING } }),
    prisma.booking.aggregate({ _sum: { totalAmount: true }, where: { paymentStatus: PaymentStatus.PAID } }),
    prisma.booking.count({ where: { checkIn: { gte: new Date() }, status: { in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] } } }),
    prisma.room.findMany(),
  ]);

  const occupiedRooms = await prisma.booking.count({
    where: {
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] },
      checkIn: { lte: new Date() },
      checkOut: { gte: new Date() },
    },
  });

  return NextResponse.json({
    summary: {
      totalBookings,
      confirmedBookings,
      pendingBookings,
      revenue: revenue._sum.totalAmount || 0,
      upcoming,
    },
    occupancy: rooms.length ? (occupiedRooms / rooms.reduce((sum, room) => sum + room.totalInventory, 0)) * 100 : 0,
    rooms,
  });
}

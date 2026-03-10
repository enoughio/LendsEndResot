import { NextResponse } from "next/server";
import type { Booking, User } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const url = new URL(request.url);
    const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || 10), 1), 50);

    const bookings = await prisma.booking.findMany({
      where: { deletedAt: null },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    return NextResponse.json({
      data: bookings.map((booking: Booking & { user: User | null }) => ({
        bookingId: booking.id,
        name: booking.guestName || booking.user?.name || "Guest",
        type: booking.bookingType,
        status: booking.status,
        createdAt: booking.createdAt,
      })),
    });
  } catch (error) {
    console.error("GET /api/admin/dashboard/recent-bookings failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to load recent bookings." } },
      { status: 500 }
    );
  }
}

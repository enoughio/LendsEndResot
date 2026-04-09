import { NextResponse } from "next/server";
import type { Booking, BookingActivity, Room, RoomType } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";
import { toBookingDto } from "@/lib/admin-serializers";

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const url = new URL(request.url);
    const statusParam = url.searchParams.get("status");
    const typeParam = url.searchParams.get("type");
    const page = Math.max(Number(url.searchParams.get("page") || 1), 1);
    const pageSize = Math.min(Math.max(Number(url.searchParams.get("pageSize") || 20), 1), 100);
    const skip = (page - 1) * pageSize;


    // creating where clause
    const where = {
      deletedAt: null as Date | null,
      ...(statusParam ? { status: statusParam as "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "REFUNDED" | "FAILED" } : {}),
      ...(typeParam ? { bookingType: typeParam as "STAY" | "VISIT" } : {}),
    };

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          room: { include: { roomType: true } },
          bookingActivities: { include: { activity: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      data: bookings.map(
        (
          booking: Booking & {
            room: (Room & { roomType: RoomType | null }) | null;
            bookingActivities: Array<BookingActivity & { activity: { id: string; name: string; price: number } }>;
          }
        ) => toBookingDto(booking)
      ),
      meta: {
        page,
        pageSize,
        total,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/bookings failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to load bookings." } }, { status: 500 });
  }
}

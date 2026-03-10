import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const now = new Date();

    const [activeStay, activeVisit, upcomingBookings, availableRooms] = await Promise.all([
      prisma.booking.count({
        where: {
          deletedAt: null,
          bookingType: "STAY",
          status: "CONFIRMED",
          checkIn: { lte: now },
          checkOut: { gt: now },
        },
      }),
      prisma.booking.count({
        where: {
          deletedAt: null,
          bookingType: "VISIT",
          status: "CONFIRMED",
          visitDate: { gte: now },
        },
      }),
      prisma.booking.count({
        where: {
          deletedAt: null,
          status: { in: ["PENDING", "CONFIRMED"] },
          OR: [{ checkIn: { gte: now } }, { visitDate: { gte: now } }],
        },
      }),
      prisma.room.count({
        where: {
          roomStatus: "AVAILABLE",
        },
      }),
    ]);

    return NextResponse.json({
      data: {
        activeStay,
        activeVisit,
        upcomingBookings,
        availableRooms,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/dashboard/stats failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to load dashboard stats." } },
      { status: 500 }
    );
  }
}

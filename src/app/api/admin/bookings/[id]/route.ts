import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";
import { toBookingDto } from "@/lib/admin-serializers";

type Params = { params: Promise<{ id: string }> };

const ALLOWED_STATUS = new Set(["PENDING", "CONFIRMED", "CANCELLED", "REFUNDED", "FAILED"]);

export async function GET(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const booking = await prisma.booking.findFirst({
      where: { id, deletedAt: null },
      include: {
        room: { include: { roomType: true } },
        bookingActivities: { include: { activity: true } },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Booking not found." } }, { status: 404 });
    }

    return NextResponse.json({ data: toBookingDto(booking) });
  } catch (error) {
    console.error("GET /api/admin/bookings/:id failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to load booking." } }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await request.json();

    const status = body?.status ? String(body.status).toUpperCase() : undefined;
    const roomId = body?.roomId ? String(body.roomId) : undefined;
    const guestName = body?.guestName !== undefined ? String(body.guestName) : undefined;
    const guestEmail = body?.guestEmail !== undefined ? String(body.guestEmail) : undefined;
    const guestPhone = body?.guestPhone !== undefined ? String(body.guestPhone) : undefined;
    const specialRequest = body?.specialRequest !== undefined ? String(body.specialRequest) : undefined;

    if (status && !ALLOWED_STATUS.has(status)) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Invalid status value." } },
        { status: 400 }
      );
    }

    const existing = await prisma.booking.findFirst({ where: { id, deletedAt: null } });
    if (!existing) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Booking not found." } }, { status: 404 });
    }

    if (roomId) {
      const room = await prisma.room.findUnique({ where: { id: roomId } });
      if (!room) {
        return NextResponse.json({ error: { code: "NOT_FOUND", message: "Room not found." } }, { status: 404 });
      }
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status: status as "PENDING" | "CONFIRMED" | "CANCELLED" | "REFUNDED" | "FAILED" | undefined,
        roomId,
        guestName,
        guestEmail,
        guestPhone,
        specialRequest,
      },
      include: {
        room: { include: { roomType: true } },
        bookingActivities: { include: { activity: true } },
      },
    });

    return NextResponse.json({ data: toBookingDto(updated) });
  } catch (error) {
    console.error("PUT /api/admin/bookings/:id failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to update booking." } }, { status: 500 });
  }
}

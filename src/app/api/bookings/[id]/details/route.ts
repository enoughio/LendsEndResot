import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const specialRequest = body?.specialRequest ? String(body.specialRequest).trim() : null;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "name, email and phone are required." } },
        { status: 400 }
      );
    }

    const existing = await prisma.booking.findFirst({ where: { id, deletedAt: null } });
    if (!existing) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Booking not found." } },
        { status: 404 }
      );
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        specialRequest,
      },
    });

    return NextResponse.json({
      data: {
        bookingId: booking.id,
        detailsSaved: true,
      },
    });
  } catch (error) {
    console.error("POST /api/bookings/:id/details failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to save guest details." } },
      { status: 500 }
    );
  }
}

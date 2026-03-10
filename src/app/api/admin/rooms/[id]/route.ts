import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";
import { toRoomDbStatus, toRoomDto } from "@/lib/admin-serializers";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.room.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Room not found." } }, { status: 404 });
    }

    const updated = await prisma.room.update({
      where: { id },
      data: {
        roomNo: body?.roomNo ?? body?.roomNumber ?? undefined,
        roomTypeId: body?.roomTypeId ?? undefined,
        floor: body?.floor !== undefined ? Number(body.floor) : undefined,
        view: body?.view !== undefined ? String(body.view) : undefined,
        roomStatus: body?.status ? toRoomDbStatus(String(body.status).toLowerCase()) : undefined,
      },
      include: {
        roomType: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json({ data: toRoomDto(updated) });
  } catch (error) {
    console.error("PATCH /api/admin/rooms/:id failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to update room." } }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const linkedBookings = await prisma.booking.count({
      where: {
        roomId: id,
        deletedAt: null,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (linkedBookings > 0) {
      return NextResponse.json(
        { error: { code: "CONFLICT", message: "Cannot delete room with active bookings." } },
        { status: 409 }
      );
    }

    await prisma.room.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/admin/rooms/:id failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to delete room." } }, { status: 500 });
  }
}

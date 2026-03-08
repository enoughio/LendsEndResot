import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";
import { toRoomTypeDto } from "@/lib/admin-serializers";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.roomType.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Room type not found." } }, { status: 404 });
    }

    const updated = await prisma.roomType.update({
      where: { id },
      data: {
        name: body?.name ?? undefined,
        description: body?.description ?? undefined,
        basePrice: body?.basePrice ?? undefined,
        capacity: body?.maxCapacity ?? body?.capacity ?? undefined,
        amenities: Array.isArray(body?.amenities) ? body.amenities : undefined,
        totalRooms: typeof body?.totalRooms === "number" ? body.totalRooms : undefined,
        bedType: body?.bedType ?? undefined,
        size_sqft: body?.size_sqft ?? body?.sizeSqft ?? undefined,
      },
    });

    return NextResponse.json({ data: toRoomTypeDto(updated) });
  } catch (error) {
    console.error("PATCH /api/admin/room-types/:id failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to update room type." } }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const linkedRooms = await prisma.room.count({ where: { roomTypeId: id } });
    if (linkedRooms > 0) {
      return NextResponse.json(
        { error: { code: "CONFLICT", message: "Cannot delete room type while rooms exist for it." } },
        { status: 409 }
      );
    }

    await prisma.roomType.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/admin/room-types/:id failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to delete room type." } }, { status: 500 });
  }
}

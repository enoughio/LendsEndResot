import { NextResponse } from "next/server";
import type { RoomType } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";
import { toRoomTypeDto } from "@/lib/admin-serializers";

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const roomTypes = await prisma.roomType.findMany({
      include: { _count: { select: { rooms: true } } },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      data: roomTypes.map((roomType: RoomType & { _count: { rooms: number } }) => toRoomTypeDto(roomType, roomType._count.rooms)),
    });
  } catch (error) {
    console.error("GET /api/admin/room-types failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to load room types." } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();

    const name = String(body?.name || "").trim();
    const description = String(body?.description || "").trim();
    const basePrice = Number(body?.basePrice ?? body?.base_price ?? 0);
    const capacity = Number(body?.maxCapacity ?? body?.capacity ?? 0);
    const baseOccupancy = Number(body?.baseOccupancy ?? body?.base_occupancy ?? 0);
    const extraPersonPrice = Number(body?.extraPersonPrice ?? body?.extra_person_price ?? 0);
    const amenities: string[] = Array.isArray(body?.amenities)
      ? body.amenities.map((item: unknown) => String(item).trim()).filter(Boolean)
      : [];
    const totalRooms = Number(body?.totalRooms ?? 0);
    const bedType = String(body?.bedType || "Standard").trim();
    const sizeSqft = String(body?.size_sqft || body?.sizeSqft || "N/A").trim();
    const isSingleOccupancy = Boolean(body?.isSingleOccupancy);

    if (!name || !description || basePrice <= 0 || capacity <= 0 || amenities.length < 1) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "name, description, basePrice, capacity and at least one amenity are required." } },
        { status: 400 }
      );
    }

    if (!isSingleOccupancy && (baseOccupancy < 1 || baseOccupancy > capacity)) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "baseOccupancy must be between 1 and capacity." } },
        { status: 400 }
      );
    }

    const resolvedCapacity = isSingleOccupancy ? 1 : capacity;
    const resolvedBaseOccupancy = isSingleOccupancy ? 1 : baseOccupancy;
    const resolvedExtraPersonPrice = isSingleOccupancy ? 0 : Math.max(0, extraPersonPrice);

    const created = await prisma.roomType.create({
      data: {
        name,
        description,
        basePrice,
        capacity: resolvedCapacity,
        baseOccupancy: resolvedBaseOccupancy,
        extraPersonPrice: resolvedExtraPersonPrice,
        amenities,
        totalRooms: Math.max(0, totalRooms),
        bedType,
        size_sqft: sizeSqft,
        isSingleOccupancy,
      },
    });

    return NextResponse.json({ data: toRoomTypeDto(created) }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/room-types failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to create room type." } }, { status: 500 });
  }
}

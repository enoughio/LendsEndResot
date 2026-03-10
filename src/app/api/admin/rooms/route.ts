import { NextResponse } from "next/server";
import type { Room } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";
import { toRoomDbStatus, toRoomDto } from "@/lib/admin-serializers";

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const rooms = await prisma.room.findMany({
      include: {
        roomType: {
          select: { name: true },
        },
      },
      orderBy: { roomNo: "asc" },
    });

    return NextResponse.json({
      data: rooms.map((room: Room & { roomType: { name: string } }) => toRoomDto(room)),
    });
  } catch (error) {
    console.error("GET /api/admin/rooms failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to load rooms." } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const roomNo = String(body?.roomNo || body?.roomNumber || "").trim();
    const roomTypeId = String(body?.roomTypeId || "").trim();
    const floor = body?.floor === undefined ? null : Number(body.floor);
    const view = body?.view ? String(body.view).trim() : null;
    const status = toRoomDbStatus(String(body?.status || "available").toLowerCase());

    if (!roomNo || !roomTypeId) {
      return NextResponse.json({ error: { code: "BAD_REQUEST", message: "roomNo and roomTypeId are required." } }, { status: 400 });
    }

    const roomType = await prisma.roomType.findUnique({ where: { id: roomTypeId } });
    if (!roomType) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Room type not found." } }, { status: 404 });
    }

    const created = await prisma.room.create({
      data: {
        roomNo,
        roomTypeId,
        floor,
        view,
        roomStatus: status,
      },
      include: { roomType: { select: { name: true } } },
    });

    return NextResponse.json({ data: toRoomDto(created) }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/rooms failed", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to create room." } }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import type { Room, RoomType } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const now = new Date();

    const [roomTypes, activeAllocationsByRoomType] = await Promise.all([
      prisma.roomType.findMany({
        include: {
          rooms: true,
        },
        orderBy: { name: "asc" },
      }),
      prisma.booking.groupBy({
        by: ["roomId"],
        where: {
          deletedAt: null,
          bookingType: "STAY",
          status: "CONFIRMED",
          roomId: { not: null },
          checkIn: { lte: now },
          checkOut: { gt: now },
        },
      }),
    ]);

    const allocatedRows = activeAllocationsByRoomType as Array<{ roomId: string | null }>;
    const allocatedRoomIds = new Set(
      allocatedRows.map((row: { roomId: string | null }) => row.roomId).filter((value: string | null): value is string => Boolean(value))
    );

    const data = roomTypes.map((roomType: RoomType & { rooms: Room[] }) => {
      let availableRoom = 0;
      let allocatedRoom = 0;
      let maintenance = 0;

      for (const room of roomType.rooms) {
        if (room.roomStatus === "MAINTENANCE") {
          maintenance += 1;
          continue;
        }

        if (allocatedRoomIds.has(room.id)) {
          allocatedRoom += 1;
          continue;
        }

        if (room.roomStatus === "AVAILABLE") {
          availableRoom += 1;
        }
      }

      return {
        roomType: roomType.name,
        basePrice: Number(roomType.basePrice),
        availableRoom,
        allocatedRoom,
        maintenance,
      };
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/admin/dashboard/room-status failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to load room status." } },
      { status: 500 }
    );
  }
}

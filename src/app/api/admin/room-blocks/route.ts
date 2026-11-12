import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";
import { indiaDateKey } from "@/lib/india-date";
import {
  isRoomBlockGroupId,
  parseBlockDates,
  parseBlockNote,
  parseBlockReason,
  parseBlockRoomIds,
  toRoomBlockGroups,
} from "@/lib/room-blocks";

function isPrismaError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

export async function GET(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const rows = await prisma.roomBlock.findMany({
      include: {
        room: {
          select: {
            roomNo: true,
            roomType: { select: { name: true } },
          },
        },
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({
      data: toRoomBlockGroups(
        rows.map((row) => ({
          groupId: row.groupId,
          roomId: row.roomId,
          roomNo: row.room.roomNo,
          roomTypeName: row.room.roomType.name,
          date: row.date,
          reason: row.reason,
          note: row.note,
          createdAt: row.createdAt,
        })),
      ),
    });
  } catch (error) {
    console.error("GET /api/admin/room-blocks failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to load room blocks." } },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const roomIdsResult = parseBlockRoomIds(body?.roomIds);
    if ("error" in roomIdsResult) {
      return NextResponse.json({ error: { code: "BAD_REQUEST", message: roomIdsResult.error } }, { status: 400 });
    }
    const datesResult = parseBlockDates(body?.dates);
    if ("error" in datesResult) {
      return NextResponse.json({ error: { code: "BAD_REQUEST", message: datesResult.error } }, { status: 400 });
    }
    const reason = parseBlockReason(body?.reason);
    if (!reason) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Choose a reason: retreat, group booking, or maintenance." } },
        { status: 400 },
      );
    }
    const noteResult = parseBlockNote(body?.note);
    if ("error" in noteResult) {
      return NextResponse.json({ error: { code: "BAD_REQUEST", message: noteResult.error } }, { status: 400 });
    }

    const rooms = await prisma.room.findMany({
      where: { id: { in: roomIdsResult.roomIds } },
      select: { id: true },
    });
    if (rooms.length !== roomIdsResult.roomIds.length) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "One or more rooms were not found." } },
        { status: 400 },
      );
    }

    const { dates } = datesResult;
    const { note } = noteResult;
    let created = 0;
    let updated = 0;
    const groupIds: string[] = [];

    await prisma.$transaction(async (tx) => {
      for (const roomId of roomIdsResult.roomIds) {
        const groupId = randomUUID();
        if (!isRoomBlockGroupId(groupId)) {
          throw new Error("Could not create a block id.");
        }
        groupIds.push(groupId);

        const existing = await tx.roomBlock.findMany({
          where: { roomId, date: { in: dates } },
          select: { date: true },
        });
        const existingKeys = new Set(existing.map((row) => indiaDateKey(row.date)));
        const existingDates = dates.filter((date) => existingKeys.has(indiaDateKey(date)));
        const newDates = dates.filter((date) => !existingKeys.has(indiaDateKey(date)));

        if (existingDates.length > 0) {
          await tx.roomBlock.updateMany({
            where: { roomId, date: { in: existingDates } },
            data: { reason, note, groupId },
          });
          updated += existingDates.length;
        }

        if (newDates.length > 0) {
          await tx.roomBlock.createMany({
            data: newDates.map((date) => ({
              roomId,
              date,
              reason,
              note,
              groupId,
            })),
          });
          created += newDates.length;
        }
      }
    });

    return NextResponse.json({ data: { created, updated, groupIds } }, { status: 201 });
  } catch (error) {
    if (isPrismaError(error) && error.code === "P2002") {
      return NextResponse.json(
        { error: { code: "CONFLICT", message: "Those nights were just updated. Refresh and try again." } },
        { status: 409 },
      );
    }
    if (isPrismaError(error) && error.code === "P2003") {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "One or more rooms were not found." } },
        { status: 400 },
      );
    }
    console.error("POST /api/admin/room-blocks failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to block those rooms." } },
      { status: 500 },
    );
  }
}

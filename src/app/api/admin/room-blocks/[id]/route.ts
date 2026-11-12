import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdmin } from "@/lib/admin-auth";
import { isRoomBlockGroupId } from "@/lib/room-blocks";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(request: Request, { params }: Params) {
  const unauthorized = ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    if (!isRoomBlockGroupId(id)) {
      return NextResponse.json({ error: { code: "BAD_REQUEST", message: "Unknown room block." } }, { status: 400 });
    }

    const removed = await prisma.roomBlock.deleteMany({ where: { groupId: id } });
    if (removed.count === 0) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Room block not found." } }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/admin/room-blocks/[id] failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to remove that room block." } },
      { status: 500 },
    );
  }
}

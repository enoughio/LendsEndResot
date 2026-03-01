import { Role } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createRoomSchema } from '@/lib/validators';

export async function GET() {
  const rooms = await prisma.room.findMany({ orderBy: { price: 'asc' } });
  return NextResponse.json(rooms);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== Role.ADMIN) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const json = await req.json();
  const parsed = createRoomSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const room = await prisma.room.create({ data: parsed.data });
  return NextResponse.json(room, { status: 201 });
}

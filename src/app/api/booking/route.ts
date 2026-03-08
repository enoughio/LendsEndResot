import { NextResponse } from "next/server";
import type { Activity, RoomType, VisitPackage } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [roomTypes, visitPackages, activities] = await Promise.all([
      prisma.roomType.findMany({
        include: {
          _count: {
            select: { rooms: true },
          },
        },
        orderBy: { name: "asc" },
      }),
      prisma.visitPackage.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.activity.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      data: {
        rooms: roomTypes.map((roomType: RoomType & { _count: { rooms: number } }) => ({
          id: roomType.id,
          name: roomType.name,
          description: roomType.description,
          basePrice: Number(roomType.basePrice),
          capacity: roomType.capacity,
          maxOccupancy: roomType.capacity,
          bedType: roomType.bedType,
          sizeSqft: roomType.size_sqft,
          amenities: roomType.amenities,
          totalRooms: roomType._count.rooms,
        })),
        visitPackages: visitPackages.map((visitPackage: VisitPackage) => ({
          id: visitPackage.id,
          name: visitPackage.name,
          description: visitPackage.description,
          duration: visitPackage.duration,
          basePrice: Number(visitPackage.basePrice),
          packageType: visitPackage.packageType,
          maxActivity: visitPackage.maxActivity,
          maxGroupSize: visitPackage.maxGroupSize,
          status: visitPackage.status,
          timing: visitPackage.timing,
          includes: visitPackage.includes,
          image: visitPackage.image,
        })),
        activities: activities.map((activity: Activity) => ({
          id: activity.id,
          name: activity.name,
          duration: activity.duration,
          price: Number(activity.price),
          status: activity.status,
        })),
      },
    });
  } catch (error) {
    console.error("GET /api/booking failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to load booking data." } },
      { status: 500 }
    );
  }
}

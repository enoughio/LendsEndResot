import { NextResponse } from "next/server";
import type { RoomType, VisitPackage } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [roomTypes, visitPackages, mealPlans] = await Promise.all([
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
      prisma.mealPlan.findMany({
        where: { isActive: true },
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
          baseOccupancy: roomType.baseOccupancy,
          extraPersonPrice: Number(roomType.extraPersonPrice),
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
        mealPlans: mealPlans.map((plan) => ({
          id: plan.id,
          name: plan.name,
          description: plan.description,
          pricePerPerson: Number(plan.pricePerPerson),
          isActive: plan.isActive,
        })),
      },
    });
  } catch (error) {
    console.error("GET /api/bookings failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to load booking data." } },
      { status: 500 }
    );
  }
}

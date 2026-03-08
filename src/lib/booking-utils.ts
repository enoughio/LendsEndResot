import type { Activity, BookingStatus } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export type StayAvailabilityInput = {
  roomTypeId: string;
  checkIn: Date;
  checkOut: Date;
};

export function parseDate(value: unknown): Date | null {
  if (typeof value !== "string") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffMs = checkOut.getTime() - checkIn.getTime();
  const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, nights);
}

export function sumActivityPrice(activities: Activity[]): number {
  return activities.reduce((sum, activity) => sum + Number(activity.price || 0), 0);
}

export function buildPriceBreakdown(baseAmount: number, activitiesAmount: number) {
  const subTotal = baseAmount + activitiesAmount;
  const taxAmount = Math.round(subTotal * 0.18);
  const totalAmount = subTotal + taxAmount;

  return {
    roomBaseAmount: baseAmount,
    activitiesAmount,
    taxAmount,
    totalAmount,
    currency: "INR",
  };
}

export function isValidStatus(status: string): status is BookingStatus {
  return ["PENDING", "CONFIRMED", "CANCELLED", "REFUNDED", "FAILED"].includes(status);
}

export async function getAvailableRoomCount({ roomTypeId, checkIn, checkOut }: StayAvailabilityInput) {
  const totalRooms = await prisma.room.count({
    where: {
      roomTypeId,
      roomStatus: "AVAILABLE",
    },
  });

  const overlappingBookedRooms = await prisma.booking.count({
    where: {
      deletedAt: null,
      bookingType: "STAY",
      status: "CONFIRMED",
      roomId: { not: null },
      room: {
        roomTypeId,
      },
      NOT: {
        OR: [
          { checkOut: { lte: checkIn } },
          { checkIn: { gte: checkOut } },
        ],
      },
    },
  });

  return Math.max(0, totalRooms - overlappingBookedRooms);
}

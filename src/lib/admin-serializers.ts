import type { Activity, Booking, BookingActivity, Room, RoomStatus, RoomType, VisitPackage } from "@/generated/prisma/client";
import { signatureImageSrc } from "@/lib/signature-data";

export const adminBookingInclude = {
  room: { include: { roomType: true } },
  visitPackage: { select: { id: true, name: true, packageType: true } },
  mealPlan: { select: { name: true } },
  bookingActivities: { include: { activity: true } },
  consent: {
    select: {
      signerName: true,
      signatureData: true,
      acceptedRuleIds: true,
      exitPolicyAccepted: true,
      purpose: true,
      createdAt: true,
    },
  },
};

export function toRoomUiStatus(status: RoomStatus): "available" | "occupied" | "maintenance" {
  if (status === "AVAILABLE") return "available";
  if (status === "MAINTENANCE") return "maintenance";
  return "occupied";
}

export function toRoomDbStatus(status: string): RoomStatus {
  if (status === "available") return "AVAILABLE";
  if (status === "maintenance") return "MAINTENANCE";
  return "INACTIVE";
}

export function toRoomTypeDto(roomType: RoomType, roomsCount?: number) {
  return {
    id: roomType.id,
    name: roomType.name,
    description: roomType.description,
    basePrice: Number(roomType.basePrice),
    maxOccupancy: roomType.capacity,
    baseOccupancy: roomType.baseOccupancy,
    extraPersonPrice: Number(roomType.extraPersonPrice),
    breakfastOnlyPrice: Number(roomType.breakfastOnlyPrice || 0),
    breakfastPlusMealPrice: Number(roomType.breakfastPlusMealPrice || 0),
    allMealsPrice: Number(roomType.allMealsPrice || 0),
    amenities: roomType.amenities,
    totalRooms: typeof roomsCount === "number" ? roomsCount : roomType.totalRooms,
    isSingleOccupancy: roomType.isSingleOccupancy,
    isDormRoom: roomType.isDormRoom,
  };
}

export function toRoomDto(room: Room & { roomType?: { name: string } | null }) {
  return {
    id: room.id,
    roomNo: room.roomNo,
    roomNumber: room.roomNo,
    roomTypeId: room.roomTypeId,
    type: room.roomType?.name ?? null,
    floor: room.floor ?? 0,
    view: room.view ?? "",
    status: toRoomUiStatus(room.roomStatus),
  };
}

export function toVisitPackageDto(pkg: VisitPackage) {
  return {
    id: pkg.id,
    name: pkg.name,
    packageType: pkg.packageType,
    description: pkg.description,
    duration: pkg.duration,
    maxActivity: pkg.maxActivity,
    basePrice: Number(pkg.basePrice),
    maxGroupSize: pkg.maxGroupSize,
    minGroupSize: pkg.minGroupSize,
    status: pkg.status,
    timing: pkg.timing,
    includes: pkg.includes,
    image: pkg.image,
  };
}

export function toActivityDto(activity: Activity) {
  return {
    id: activity.id,
    name: activity.name,
    duration: Number(activity.duration),
    price: Number(activity.price),
    status: activity.status,
  };
}

function toGuestList(value: unknown): Array<{ name: string; phone: string }> {
  if (!Array.isArray(value)) return [];
  const guests: Array<{ name: string; phone: string }> = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as { name?: unknown; phone?: unknown };
    const name = typeof record.name === "string" ? record.name.trim() : "";
    const phone = typeof record.phone === "string" ? record.phone.trim() : "";
    if (!name && !phone) continue;
    guests.push({ name, phone });
  }
  return guests;
}

export function toBookingDto(
  booking: Booking & {
    room?: (Room & { roomType?: RoomType | null }) | null;
    visitPackage?: { id: string; name: string; packageType: string } | null;
    mealPlan?: { name: string } | null;
    bookingActivities?: Array<BookingActivity & { activity: { id: string; name: string; price: number } }>;
    consent?: {
      signerName: string;
      signatureData: string;
      acceptedRuleIds: string[];
      exitPolicyAccepted: boolean;
      purpose: string;
      createdAt: Date;
    } | null;
  },
  options?: { includeSignature?: boolean }
) {
  const includeSignature = options?.includeSignature !== false;
  const signatureSrc = signatureImageSrc(booking.consent?.signatureData);

  return {
    bookingId: booking.id,
    type: booking.bookingType,
    status: booking.status,
    paymentStatus: booking.paymentStatus,
    name: booking.guestName,
    email: booking.guestEmail,
    phone: booking.guestPhone,
    roomId: booking.roomId,
    roomTypeId: booking.room?.roomTypeId ?? null,
    roomType: booking.room?.roomType?.name ?? null,
    roomNo: booking.room?.roomNo ?? null,
    roomsBooked: booking.roomsBooked,
    visitPackageId: booking.visitPackageId,
    visitPackageName: booking.visitPackage?.name ?? null,
    visitPackageType: booking.visitPackage?.packageType ?? null,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    visitDate: booking.visitDate,
    guests: booking.guests,
    extraGuestCount: booking.extraGuestCount,
    extraGuestPrice: Number(booking.extraGuestPrice || 0),
    mealPlanName: booking.mealPlanName || booking.mealPlan?.name || null,
    mealPlanPrice: Number(booking.mealPlanPrice || 0),
    guestList: toGuestList(booking.guestList),
    totalAmount: Number(booking.totalAmount),
    currency: booking.currency,
    paymentReference: booking.razorPayPaymentId,
    specialRequest: booking.specialRequest,
    activities:
      booking.bookingActivities?.map((item: BookingActivity & { activity: { id: string; name: string; price: number } }) => ({
        id: item.activity.id,
        name: item.activity.name,
        price: Number(item.activity.price),
      })) ?? [],
    consent: booking.consent
      ? {
          signerName: booking.consent.signerName,
          signatureData: includeSignature && signatureSrc ? signatureSrc : "",
          hasSignature: Boolean(signatureSrc),
          acceptedRuleIds: booking.consent.acceptedRuleIds,
          exitPolicyAccepted: booking.consent.exitPolicyAccepted,
          purpose: booking.consent.purpose,
          createdAt: booking.consent.createdAt,
        }
      : null,
    createdAt: booking.createdAt,
  };
}

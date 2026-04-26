import type { Activity, Booking, BookingActivity, Room, RoomStatus, RoomType, VisitPackage } from "@/generated/prisma/client";

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
    amenities: roomType.amenities,
    totalRooms: typeof roomsCount === "number" ? roomsCount : roomType.totalRooms,
    isSingleOccupancy: roomType.isSingleOccupancy,
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

export function toBookingDto(
  booking: Booking & {
    room?: (Room & { roomType?: RoomType | null }) | null;
    bookingActivities?: Array<BookingActivity & { activity: { id: string; name: string; price: number } }>;
  }
) {
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
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    visitDate: booking.visitDate,
    guests: booking.guests,
    totalAmount: Number(booking.totalAmount),
    specialRequest: booking.specialRequest,
    activities:
      booking.bookingActivities?.map((item: BookingActivity & { activity: { id: string; name: string; price: number } }) => ({
        id: item.activity.id,
        name: item.activity.name,
        price: Number(item.activity.price),
      })) ?? [],
    createdAt: booking.createdAt,
  };
}

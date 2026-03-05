export type RoomType = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  maxOccupancy: number;
  amenities: string[];
  totalRooms: number;
};

export type Room = {
  id: string;
  roomTypeId: string;
  roomNumber: string;
  floor: number;
  status: 'available' | 'occupied' | 'maintenance';
  view: string;
};

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out';
export type PaymentStatus = 'paid' | 'partial' | 'unpaid' | 'refunded';

export type Booking = {
  id: string;
  bookingType: 'stay' | 'day-visit';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guests: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  paidAmount: number;
  createdAt: string;
  roomId?: string;
  roomTypeId?: string;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  visitDate?: string;
  visitType?: 'full-day' | 'half-day';
  activities: string[];
  specialRequests?: string;
  paymentMethod?: string;
};

export type VisitPackageCategory = 'half-day' | 'full-day' | 'short-visit';

export type VisitPackage = {
  id: string;
  name: string;
  type: VisitPackageCategory;
  description: string;
  duration: string;
  pricePerPerson: number;
  includedActivities: number;
  activities: string[];
  includes: string[];
  maxGroupSize: number;
  isActive: boolean;
  timing: string;
};

export type Section = 'overview' | 'room-types' | 'rooms' | 'visit-packages' | 'bookings';

export type RoomType = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  maxOccupancy: number;
  baseOccupancy: number;
  extraPersonPrice: number;
  breakfastOnlyPrice?: number;
  breakfastPlusMealPrice?: number;
  allMealsPrice?: number;
  amenities: string[];
  totalRooms: number;
  isSingleOccupancy: boolean;
  isDormRoom: boolean;
};

export type Room = {
  id: string;
  roomTypeId: string;
  roomNumber: string;
  floor: number;
  status: 'available' | 'occupied' | 'maintenance';
  view: string;
};

export type BookingStatus = 'confirmed' | 'pending' | 'checked-in' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'partial' | 'unpaid' | 'refunded';

export type BookingGuest = {
  name: string;
  phone: string;
};

export type BookingConsent = {
  signerName: string;
  signatureData: string;
  hasSignature: boolean;
  acceptedRuleIds: string[];
  exitPolicyAccepted: boolean;
  purpose: string;
  createdAt?: string;
};

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
  roomTypeName?: string;
  roomNumber?: string;
  roomsBooked?: number;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  visitDate?: string;
  visitPackageId?: string;
  visitPackageName?: string;
  visitType?: 'full-day' | 'half-day' | 'short-visit';
  mealPlanName?: string;
  mealPlanPrice?: number;
  extraGuestCount?: number;
  extraGuestPrice?: number;
  currency?: string;
  guestList?: BookingGuest[];
  activities: string[];
  specialRequests?: string;
  paymentMethod?: string;
  paymentReference?: string;
  consent?: BookingConsent | null;
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

export type ActivityStatus = 'ACTIVE' | 'INACTIVE';

export type Activity = {
  id: string;
  name: string;
  duration: number;
  price: number;
  status: ActivityStatus;
};

export type MealPlan = {
  id: string;
  name: string;
  description?: string;
  pricePerPerson: number;
  isActive: boolean;
};

export type Section = 'overview' | 'room-types' | 'rooms' | 'room-blocks' | 'visit-packages' | 'meal-plans' | 'activities' | 'bookings' | 'enquiries';

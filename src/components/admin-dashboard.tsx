import { useState } from 'react';
import {
  LayoutDashboard,
  BedDouble,
  Building2,
  CalendarCheck,
  Menu,
  X,
  Plus,
  Pencil,
  Trash2,
  Eye,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  IndianRupee,
  Users,
  TrendingUp,
  Leaf,
  Sunrise,
  Sun,
  Footprints,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type RoomType = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  maxOccupancy: number;
  amenities: string[];
  totalRooms: number;
};

type Room = {
  id: string;
  roomTypeId: string;
  roomNumber: string;
  floor: number;
  status: 'available' | 'occupied' | 'maintenance';
  view: string;
};

type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out';
type PaymentStatus = 'paid' | 'partial' | 'unpaid' | 'refunded';

type Booking = {
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
  // Stay specific
  roomId?: string;
  roomTypeId?: string;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  // Day visit specific
  visitDate?: string;
  visitType?: 'full-day' | 'half-day';
  // Common
  activities: string[];
  specialRequests?: string;
  paymentMethod?: string;
};

// ─── Visit Package Type ───────────────────────────────────────────────────────

type VisitPackageCategory = 'half-day' | 'full-day' | 'short-visit';

type VisitPackage = {
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

// ─── Mock Data ────────────────────────────────────────────────────────────────

const initialVisitPackages: VisitPackage[] = [
  {
    id: 'vp1',
    name: 'Morning Half-Day',
    type: 'half-day',
    description: "A refreshing half-day experience through Sumiran's lush forest trails with a guided walk, one activity of choice, and light refreshments.",
    duration: '4 hours',
    pricePerPerson: 1499,
    includedActivities: 1,
    activities: ['Bird Watching', 'Nature Walk', 'Butterfly Garden', 'Forest Photography'],
    includes: ['Forest Guide', 'Refreshments', 'Welcome Drink', 'Activity Kit'],
    maxGroupSize: 20,
    isActive: true,
    timing: '6:00 AM – 10:00 AM',
  },
  {
    id: 'vp2',
    name: 'Afternoon Half-Day',
    type: 'half-day',
    description: "An immersive afternoon session exploring the resort's hidden trails, ending with a forest sunset experience.",
    duration: '4 hours',
    pricePerPerson: 1499,
    includedActivities: 1,
    activities: ['Jungle Safari', 'Zip-Lining', 'Kayaking', 'Sunset Trek'],
    includes: ['Forest Guide', 'Refreshments', 'Safety Gear', 'Activity Kit'],
    maxGroupSize: 15,
    isActive: true,
    timing: '2:00 PM – 6:00 PM',
  },
  {
    id: 'vp3',
    name: 'Full Day Forest Escape',
    type: 'full-day',
    description: 'A complete day immersed in nature — from sunrise jungle safari to an evening bonfire, with all meals and two activities included.',
    duration: '10 hours',
    pricePerPerson: 2999,
    includedActivities: 2,
    activities: ['Jungle Safari', 'Bird Watching', 'Zip-Lining', 'Nature Walk', 'Kayaking', 'Rock Climbing'],
    includes: ['Forest Guide', 'Breakfast', 'Lunch', 'Evening Snacks', 'Safari Vehicle', 'Activity Kit'],
    maxGroupSize: 25,
    isActive: true,
    timing: '6:00 AM – 5:00 PM',
  },
  {
    id: 'vp4',
    name: 'Premium Full Day',
    type: 'full-day',
    description: 'An exclusive full-day premium package with personalised itinerary, gourmet meals, and unlimited access to all resort activities.',
    duration: '10 hours',
    pricePerPerson: 4999,
    includedActivities: 3,
    activities: ['Jungle Safari', 'Bird Watching', 'Zip-Lining', 'Kayaking', 'Ayurvedic Spa', 'Rock Climbing', 'Night Trek'],
    includes: ['Personal Guide', 'Gourmet Breakfast', 'Gourmet Lunch', 'Spa Session', 'All Activities', 'Bonfire Evening'],
    maxGroupSize: 10,
    isActive: false,
    timing: '6:00 AM – 5:00 PM',
  },
  {
    id: 'vp5',
    name: 'Quick Forest Dip',
    type: 'short-visit',
    description: 'A short but memorable forest experience — perfect for those passing through. Includes a guided trail walk and scenic photo stops.',
    duration: '2 hours',
    pricePerPerson: 699,
    includedActivities: 0,
    activities: ['Forest Photography', 'Butterfly Garden', 'Scenic Trail Walk'],
    includes: ['Forest Guide', 'Welcome Drink', 'Photography Spots'],
    maxGroupSize: 30,
    isActive: true,
    timing: 'Flexible (9 AM / 11 AM / 3 PM slots)',
  },
];

const initialRoomTypes: RoomType[] = [
  {
    id: 'rt1',
    name: 'Deluxe Room',
    description: 'Comfortable rooms with forest-facing balcony and modern amenities perfect for couples or solo travelers.',
    basePrice: 6999,
    maxOccupancy: 2,
    amenities: ['AC', 'Wi-Fi', 'Forest View', 'Balcony', 'Mini Bar', 'Room Service'],
    totalRooms: 8,
  },
  {
    id: 'rt2',
    name: 'Premium Suite',
    description: 'Spacious suites with a separate living area, premium furnishings, and a panoramic jungle view.',
    basePrice: 11999,
    maxOccupancy: 3,
    amenities: ['AC', 'Wi-Fi', 'Panoramic View', 'Living Area', 'Jacuzzi', 'Butler Service', 'Mini Bar'],
    totalRooms: 5,
  },
  {
    id: 'rt3',
    name: 'Forest Villa',
    description: 'Private standalone villas nestled in the forest, offering ultimate seclusion and nature immersion.',
    basePrice: 18999,
    maxOccupancy: 4,
    amenities: ['AC', 'Wi-Fi', 'Private Pool', 'Outdoor Shower', 'Bonfire Area', 'Butler Service', 'Kitchenette'],
    totalRooms: 4,
  },
  {
    id: 'rt4',
    name: 'Royal Cottage',
    description: 'Heritage-inspired cottages with traditional decor, premium comfort, and curated royal experiences.',
    basePrice: 24999,
    maxOccupancy: 6,
    amenities: ['AC', 'Wi-Fi', 'Private Garden', 'Plunge Pool', 'Dining Pavilion', 'Personal Chef', 'Concierge'],
    totalRooms: 2,
  },
];

const initialRooms: Room[] = [
  { id: 'r1', roomTypeId: 'rt1', roomNumber: '101', floor: 1, status: 'available', view: 'Forest East' },
  { id: 'r2', roomTypeId: 'rt1', roomNumber: '102', floor: 1, status: 'occupied', view: 'Forest West' },
  { id: 'r3', roomTypeId: 'rt1', roomNumber: '201', floor: 2, status: 'available', view: 'Forest East' },
  { id: 'r4', roomTypeId: 'rt1', roomNumber: '202', floor: 2, status: 'maintenance', view: 'Garden' },
  { id: 'r5', roomTypeId: 'rt2', roomNumber: '301', floor: 3, status: 'occupied', view: 'Panoramic North' },
  { id: 'r6', roomTypeId: 'rt2', roomNumber: '302', floor: 3, status: 'available', view: 'Panoramic South' },
  { id: 'r7', roomTypeId: 'rt3', roomNumber: 'V01', floor: 0, status: 'available', view: 'Private Forest' },
  { id: 'r8', roomTypeId: 'rt3', roomNumber: 'V02', floor: 0, status: 'occupied', view: 'Lakeside Forest' },
  { id: 'r9', roomTypeId: 'rt4', roomNumber: 'RC01', floor: 0, status: 'available', view: 'Royal Garden' },
  { id: 'r10', roomTypeId: 'rt4', roomNumber: 'RC02', floor: 0, status: 'occupied', view: 'Heritage Garden' },
];

const initialBookings: Booking[] = [
  {
    id: 'BK001',
    bookingType: 'stay',
    guestName: 'Arjun Mehta',
    guestEmail: 'arjun.mehta@email.com',
    guestPhone: '+91 98765 43210',
    guests: 2,
    status: 'confirmed',
    paymentStatus: 'paid',
    totalAmount: 23997,
    paidAmount: 23997,
    createdAt: '2026-02-20',
    roomId: 'r1',
    roomTypeId: 'rt1',
    checkIn: '2026-03-05',
    checkOut: '2026-03-08',
    nights: 3,
    activities: ['Jungle Safari', 'Bird Watching'],
    specialRequests: 'Late check-in around 10 PM. Need a quiet room.',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'BK002',
    bookingType: 'day-visit',
    guestName: 'Priya Sharma',
    guestEmail: 'priya.s@email.com',
    guestPhone: '+91 87654 32109',
    guests: 4,
    status: 'confirmed',
    paymentStatus: 'paid',
    totalAmount: 11996,
    paidAmount: 11996,
    createdAt: '2026-02-22',
    visitDate: '2026-03-06',
    visitType: 'full-day',
    activities: ['Jungle Safari', 'Zip-Lining'],
    paymentMethod: 'UPI',
  },
  {
    id: 'BK003',
    bookingType: 'stay',
    guestName: 'Rahul Verma',
    guestEmail: 'rahul.v@email.com',
    guestPhone: '+91 76543 21098',
    guests: 2,
    status: 'checked-in',
    paymentStatus: 'paid',
    totalAmount: 35997,
    paidAmount: 35997,
    createdAt: '2026-02-18',
    roomId: 'r5',
    roomTypeId: 'rt2',
    checkIn: '2026-03-03',
    checkOut: '2026-03-06',
    nights: 3,
    activities: ['Jungle Safari', 'Night Trek'],
    paymentMethod: 'Net Banking',
  },
  {
    id: 'BK004',
    bookingType: 'stay',
    guestName: 'Sneha Kapoor',
    guestEmail: 'sneha.k@email.com',
    guestPhone: '+91 65432 10987',
    guests: 2,
    status: 'pending',
    paymentStatus: 'partial',
    totalAmount: 56997,
    paidAmount: 20000,
    createdAt: '2026-02-25',
    roomId: 'r7',
    roomTypeId: 'rt3',
    checkIn: '2026-03-15',
    checkOut: '2026-03-18',
    nights: 3,
    activities: ['Jungle Safari', 'Bird Watching', 'Zip-Lining'],
    specialRequests: 'Honeymoon package, please arrange flowers and candles.',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'BK005',
    bookingType: 'day-visit',
    guestName: 'Kiran Patel',
    guestEmail: 'kiran.p@email.com',
    guestPhone: '+91 54321 09876',
    guests: 2,
    status: 'confirmed',
    paymentStatus: 'paid',
    totalAmount: 2998,
    paidAmount: 2998,
    createdAt: '2026-02-26',
    visitDate: '2026-03-04',
    visitType: 'half-day',
    activities: ['Bird Watching'],
    paymentMethod: 'UPI',
  },
  {
    id: 'BK006',
    bookingType: 'stay',
    guestName: 'Vikram Singh',
    guestEmail: 'vikram.s@email.com',
    guestPhone: '+91 43210 98765',
    guests: 4,
    status: 'cancelled',
    paymentStatus: 'refunded',
    totalAmount: 74997,
    paidAmount: 0,
    createdAt: '2026-02-10',
    roomId: 'r9',
    roomTypeId: 'rt4',
    checkIn: '2026-02-28',
    checkOut: '2026-03-01',
    nights: 1,
    activities: ['Jungle Safari', 'Nature Walk'],
    paymentMethod: 'Credit Card',
  },
  {
    id: 'BK007',
    bookingType: 'stay',
    guestName: 'Ananya Roy',
    guestEmail: 'ananya.r@email.com',
    guestPhone: '+91 32109 87654',
    guests: 2,
    status: 'checked-out',
    paymentStatus: 'paid',
    totalAmount: 47998,
    paidAmount: 47998,
    createdAt: '2026-02-05',
    roomId: 'r8',
    roomTypeId: 'rt3',
    checkIn: '2026-02-20',
    checkOut: '2026-02-22',
    nights: 2,
    activities: ['Jungle Safari', 'Ayurvedic Spa'],
    paymentMethod: 'Debit Card',
  },
  {
    id: 'BK008',
    bookingType: 'day-visit',
    guestName: 'Manish Gupta',
    guestEmail: 'manish.g@email.com',
    guestPhone: '+91 21098 76543',
    guests: 6,
    status: 'pending',
    paymentStatus: 'unpaid',
    totalAmount: 17994,
    paidAmount: 0,
    createdAt: '2026-03-01',
    visitDate: '2026-03-10',
    visitType: 'full-day',
    activities: ['Jungle Safari', 'Zip-Lining'],
    specialRequests: 'Corporate group outing. Need team-building activities.',
    paymentMethod: undefined,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig: Record<BookingStatus, { label: string; color: string; icon: React.ReactNode }> = {
  confirmed: { label: 'Confirmed', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: <CheckCircle2 size={12} /> },
  pending: { label: 'Pending', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', icon: <Clock size={12} /> },
  cancelled: { label: 'Cancelled', color: 'text-red-400 bg-red-400/10 border-red-400/20', icon: <XCircle size={12} /> },
  'checked-in': { label: 'Checked In', color: 'text-sky-400 bg-sky-400/10 border-sky-400/20', icon: <CheckCircle2 size={12} /> },
  'checked-out': { label: 'Checked Out', color: 'text-stone-400 bg-stone-400/10 border-stone-400/20', icon: <CheckCircle2 size={12} /> },
};

const paymentConfig: Record<PaymentStatus, { label: string; color: string }> = {
  paid: { label: 'Paid', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  partial: { label: 'Partial', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  unpaid: { label: 'Unpaid', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
  refunded: { label: 'Refunded', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
};

const roomStatusConfig: Record<Room['status'], { label: string; color: string }> = {
  available: { label: 'Available', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  occupied: { label: 'Occupied', color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
  maintenance: { label: 'Maintenance', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
};

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${cfg.color}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
}

function PaymentBadge({ status }: { status: PaymentStatus }) {
  const cfg = paymentConfig[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

function RoomStatusBadge({ status }: { status: Room['status'] }) {
  const cfg = roomStatusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

// ─── Booking Detail Modal ─────────────────────────────────────────────────────

function BookingDetailModal({
  booking,
  roomTypes,
  rooms,
  onClose,
  onStatusChange,
}: {
  booking: Booking;
  roomTypes: RoomType[];
  rooms: Room[];
  onClose: () => void;
  onStatusChange: (id: string, status: BookingStatus) => void;
}) {
  const room = booking.roomId ? rooms.find(r => r.id === booking.roomId) : undefined;
  const roomType = booking.roomTypeId ? roomTypes.find(rt => rt.id === booking.roomTypeId) : undefined;

  const statusOptions: BookingStatus[] = ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#1a1f1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-white">Booking #{booking.id}</h2>
              <StatusBadge status={booking.status} />
            </div>
            <p className="text-stone-400 text-sm mt-1">
              {booking.bookingType === 'stay' ? 'Stay Booking' : `Day Visit — ${booking.visitType === 'full-day' ? 'Full Day' : 'Half Day'}`}
            </p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Guest Info */}
          <div>
            <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Guest Information</h3>
            <div className="bg-white/5 rounded-xl p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-stone-500 text-xs mb-1">Name</p>
                <p className="text-white">{booking.guestName}</p>
              </div>
              <div>
                <p className="text-stone-500 text-xs mb-1">Guests</p>
                <p className="text-white">{booking.guests} person{booking.guests > 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-stone-500 text-xs mb-1">Email</p>
                <p className="text-white">{booking.guestEmail}</p>
              </div>
              <div>
                <p className="text-stone-500 text-xs mb-1">Phone</p>
                <p className="text-white">{booking.guestPhone}</p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          {booking.bookingType === 'stay' ? (
            <div>
              <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Stay Details</h3>
              <div className="bg-white/5 rounded-xl p-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-stone-500 text-xs mb-1">Room Type</p>
                  <p className="text-white">{roomType?.name ?? '—'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Room Number</p>
                  <p className="text-white">{room ? `#${room.roomNumber}` : '—'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Check-In</p>
                  <p className="text-white">{booking.checkIn}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Check-Out</p>
                  <p className="text-white">{booking.checkOut}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Duration</p>
                  <p className="text-white">{booking.nights} night{(booking.nights ?? 0) > 1 ? 's' : ''}</p>
                </div>
                {room && (
                  <div>
                    <p className="text-stone-500 text-xs mb-1">View</p>
                    <p className="text-white">{room.view}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Visit Details</h3>
              <div className="bg-white/5 rounded-xl p-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-stone-500 text-xs mb-1">Visit Date</p>
                  <p className="text-white">{booking.visitDate}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Package</p>
                  <p className="text-white">{booking.visitType === 'full-day' ? 'Full Day (₹2,999/person)' : 'Half Day (₹1,499/person)'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Activities */}
          <div>
            <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Activities</h3>
            <div className="flex flex-wrap gap-2">
              {booking.activities.map(a => (
                <span key={a} className="bg-[#2d5a27]/30 border border-[#4a8f3f]/30 text-[#7bc67a] text-xs px-3 py-1 rounded-full">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div>
              <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Special Requests</h3>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                <p className="text-stone-300 text-sm">{booking.specialRequests}</p>
              </div>
            </div>
          )}

          {/* Payment Info */}
          <div>
            <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Payment Information</h3>
            <div className="bg-white/5 rounded-xl p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-stone-500 text-xs mb-1">Total Amount</p>
                <p className="text-white">₹{booking.totalAmount.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-stone-500 text-xs mb-1">Paid Amount</p>
                <p className="text-white">₹{booking.paidAmount.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-stone-500 text-xs mb-1">Balance Due</p>
                <p className={`${booking.totalAmount - booking.paidAmount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  ₹{(booking.totalAmount - booking.paidAmount).toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <p className="text-stone-500 text-xs mb-1">Payment Status</p>
                <PaymentBadge status={booking.paymentStatus} />
              </div>
              {booking.paymentMethod && (
                <div>
                  <p className="text-stone-500 text-xs mb-1">Payment Method</p>
                  <p className="text-white">{booking.paymentMethod}</p>
                </div>
              )}
              <div>
                <p className="text-stone-500 text-xs mb-1">Booked On</p>
                <p className="text-white">{booking.createdAt}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Change Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(s => (
                <button
                  key={s}
                  onClick={() => { onStatusChange(booking.id, s); onClose(); }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all
                    ${booking.status === s
                      ? 'bg-[#4a8f3f] border-[#4a8f3f] text-white'
                      : 'border-white/10 text-stone-400 hover:border-white/30 hover:text-white'
                    }`}
                >
                  {statusConfig[s].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Room Type Modal ──────────────────────────────────────────────────────────

function RoomTypeModal({
  roomType,
  onClose,
  onSave,
}: {
  roomType: RoomType | null;
  onClose: () => void;
  onSave: (rt: RoomType) => void;
}) {
  const [form, setForm] = useState<RoomType>(
    roomType ?? {
      id: `rt${Date.now()}`,
      name: '',
      description: '',
      basePrice: 0,
      maxOccupancy: 2,
      amenities: [],
      totalRooms: 0,
    }
  );
  const [amenityInput, setAmenityInput] = useState('');

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setForm(f => ({ ...f, amenities: [...f.amenities, amenityInput.trim()] }));
      setAmenityInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#1a1f1a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-white">{roomType ? 'Edit Room Type' : 'Add Room Type'}</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Name</label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Deluxe Room"
            />
          </div>
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Description</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f] resize-none"
              rows={3}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Describe this room type..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Base Price (₹/night)</label>
              <input
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.basePrice}
                onChange={e => setForm(f => ({ ...f, basePrice: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Max Occupancy</label>
              <input
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.maxOccupancy}
                onChange={e => setForm(f => ({ ...f, maxOccupancy: Number(e.target.value) }))}
              />
            </div>
          </div>
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Amenities</label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={amenityInput}
                onChange={e => setAmenityInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addAmenity()}
                placeholder="Add amenity and press Enter"
              />
              <button
                onClick={addAmenity}
                className="bg-[#4a8f3f] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#3d7a34] transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.amenities.map((a, i) => (
                <span key={i} className="flex items-center gap-1 bg-white/5 border border-white/10 text-stone-300 text-xs px-2 py-1 rounded-full">
                  {a}
                  <button onClick={() => setForm(f => ({ ...f, amenities: f.amenities.filter((_, j) => j !== i) }))} className="hover:text-red-400">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 border border-white/10 text-stone-400 py-2 rounded-lg text-sm hover:border-white/30 hover:text-white transition-all">
              Cancel
            </button>
            <button
              onClick={() => { onSave(form); onClose(); }}
              className="flex-1 bg-[#4a8f3f] text-white py-2 rounded-lg text-sm hover:bg-[#3d7a34] transition-colors"
            >
              {roomType ? 'Save Changes' : 'Create Room Type'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Room Modal ───────────────────────────────────────────────────────────────

function RoomModal({
  room,
  roomTypes,
  onClose,
  onSave,
}: {
  room: Room | null;
  roomTypes: RoomType[];
  onClose: () => void;
  onSave: (r: Room) => void;
}) {
  const [form, setForm] = useState<Room>(
    room ?? {
      id: `r${Date.now()}`,
      roomTypeId: roomTypes[0]?.id ?? '',
      roomNumber: '',
      floor: 1,
      status: 'available',
      view: '',
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#1a1f1a] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-white">{room ? 'Edit Room' : 'Add Room'}</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Room Type</label>
            <select
              className="w-full bg-[#111511] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
              value={form.roomTypeId}
              onChange={e => setForm(f => ({ ...f, roomTypeId: e.target.value }))}
            >
              {roomTypes.map(rt => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Room Number</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.roomNumber}
                onChange={e => setForm(f => ({ ...f, roomNumber: e.target.value }))}
                placeholder="e.g. 101"
              />
            </div>
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Floor</label>
              <input
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.floor}
                onChange={e => setForm(f => ({ ...f, floor: Number(e.target.value) }))}
              />
            </div>
          </div>
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">View</label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
              value={form.view}
              onChange={e => setForm(f => ({ ...f, view: e.target.value }))}
              placeholder="e.g. Forest East"
            />
          </div>
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Status</label>
            <select
              className="w-full bg-[#111511] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value as Room['status'] }))}
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 border border-white/10 text-stone-400 py-2 rounded-lg text-sm hover:border-white/30 hover:text-white transition-all">
              Cancel
            </button>
            <button
              onClick={() => { onSave(form); onClose(); }}
              className="flex-1 bg-[#4a8f3f] text-white py-2 rounded-lg text-sm hover:bg-[#3d7a34] transition-colors"
            >
              {room ? 'Save Changes' : 'Add Room'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Visit Package Modal ──────────────────────────────────────────────────────

const visitPackageCategoryConfig: Record<VisitPackageCategory, { label: string; icon: React.ReactNode; color: string }> = {
  'short-visit': { label: 'Short Visit', icon: <Footprints size={14} />, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  'half-day': { label: 'Half Day', icon: <Sunrise size={14} />, color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
  'full-day': { label: 'Full Day', icon: <Sun size={14} />, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
};

function VisitPackageModal({
  pkg,
  onClose,
  onSave,
}: {
  pkg: VisitPackage | null;
  onClose: () => void;
  onSave: (p: VisitPackage) => void;
}) {
  const [form, setForm] = useState<VisitPackage>(
    pkg ?? {
      id: `vp${Date.now()}`,
      name: '',
      type: 'full-day',
      description: '',
      duration: '',
      pricePerPerson: 0,
      includedActivities: 1,
      activities: [],
      includes: [],
      maxGroupSize: 20,
      isActive: true,
      timing: '',
    }
  );
  const [activityInput, setActivityInput] = useState('');
  const [includeInput, setIncludeInput] = useState('');

  const addTag = (field: 'activities' | 'includes', value: string, setter: (v: string) => void) => {
    if (value.trim()) {
      setForm(f => ({ ...f, [field]: [...f[field], value.trim()] }));
      setter('');
    }
  };
  const removeTag = (field: 'activities' | 'includes', idx: number) =>
    setForm(f => ({ ...f, [field]: f[field].filter((_, i) => i !== idx) }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#1a1f1a] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-white">{pkg ? 'Edit Visit Package' : 'New Visit Package'}</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Package Type */}
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Package Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['short-visit', 'half-day', 'full-day'] as VisitPackageCategory[]).map(t => {
                const cfg = visitPackageCategoryConfig[t];
                return (
                  <button
                    key={t}
                    onClick={() => setForm(f => ({ ...f, type: t }))}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm transition-all
                      ${form.type === t
                        ? 'bg-[#4a8f3f]/20 border-[#4a8f3f] text-[#7bc67a]'
                        : 'border-white/10 text-stone-400 hover:border-white/20 hover:text-white'
                      }`}
                  >
                    {cfg.icon} {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Package Name</label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Morning Half-Day Escape"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Description</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f] resize-none"
              rows={3}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Describe the package experience..."
            />
          </div>

          {/* Price / Duration / Timing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Price / Person (₹)</label>
              <input
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.pricePerPerson}
                onChange={e => setForm(f => ({ ...f, pricePerPerson: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Duration</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.duration}
                onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                placeholder="e.g. 4 hours"
              />
            </div>
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Timing / Slots</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.timing}
                onChange={e => setForm(f => ({ ...f, timing: e.target.value }))}
                placeholder="e.g. 6:00 AM – 10:00 AM"
              />
            </div>
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Max Group Size</label>
              <input
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.maxGroupSize}
                onChange={e => setForm(f => ({ ...f, maxGroupSize: Number(e.target.value) }))}
              />
            </div>
          </div>

          {/* Included Activities count */}
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Included Activities (guest chooses)</label>
            <input
              type="number"
              min={0}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
              value={form.includedActivities}
              onChange={e => setForm(f => ({ ...f, includedActivities: Number(e.target.value) }))}
            />
          </div>

          {/* Activity Options */}
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Activity Options</label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={activityInput}
                onChange={e => setActivityInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTag('activities', activityInput, setActivityInput)}
                placeholder="e.g. Jungle Safari"
              />
              <button
                onClick={() => addTag('activities', activityInput, setActivityInput)}
                className="bg-[#4a8f3f] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#3d7a34] transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.activities.map((a, i) => (
                <span key={i} className="flex items-center gap-1 bg-[#2d5a27]/30 border border-[#4a8f3f]/30 text-[#7bc67a] text-xs px-2 py-1 rounded-full">
                  {a}
                  <button onClick={() => removeTag('activities', i)} className="hover:text-red-400"><X size={10} /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Includes (meals, guide etc.) */}
          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">What's Included</label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={includeInput}
                onChange={e => setIncludeInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTag('includes', includeInput, setIncludeInput)}
                placeholder="e.g. Forest Guide, Breakfast"
              />
              <button
                onClick={() => addTag('includes', includeInput, setIncludeInput)}
                className="bg-[#4a8f3f] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#3d7a34] transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.includes.map((inc, i) => (
                <span key={i} className="flex items-center gap-1 bg-white/5 border border-white/10 text-stone-300 text-xs px-2 py-1 rounded-full">
                  {inc}
                  <button onClick={() => removeTag('includes', i)} className="hover:text-red-400"><X size={10} /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <div>
              <p className="text-white text-sm">Active / Visible</p>
              <p className="text-stone-500 text-xs">Show this package to guests on the booking page</p>
            </div>
            <button
              onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
              className={`transition-colors ${form.isActive ? 'text-[#7bc67a]' : 'text-stone-600'}`}
            >
              {form.isActive
                ? <div className="w-10 h-5 bg-[#4a8f3f] rounded-full flex items-center justify-end px-0.5"><div className="w-4 h-4 bg-white rounded-full" /></div>
                : <div className="w-10 h-5 bg-white/10 rounded-full flex items-center px-0.5"><div className="w-4 h-4 bg-stone-500 rounded-full" /></div>
              }
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 border border-white/10 text-stone-400 py-2 rounded-lg text-sm hover:border-white/30 hover:text-white transition-all">
              Cancel
            </button>
            <button
              onClick={() => { onSave(form); onClose(); }}
              className="flex-1 bg-[#4a8f3f] text-white py-2 rounded-lg text-sm hover:bg-[#3d7a34] transition-colors"
            >
              {pkg ? 'Save Changes' : 'Create Package'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────

function DeleteConfirm({ label, onConfirm, onCancel }: { label: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#1a1f1a] border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={20} className="text-red-400" />
        </div>
        <h3 className="text-white mb-2">Delete {label}?</h3>
        <p className="text-stone-400 text-sm mb-6">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border border-white/10 text-stone-400 py-2 rounded-lg text-sm hover:border-white/30 hover:text-white transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

type Section = 'overview' | 'room-types' | 'rooms' | 'visit-packages' | 'bookings';

// ─── Main Component ───────────────────────────────────────────────────────────

export function AdminDashboard({ onExit }: { onExit: () => void }) {
  const [section, setSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [roomTypes, setRoomTypes] = useState<RoomType[]>(initialRoomTypes);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [visitPackages, setVisitPackages] = useState<VisitPackage[]>(initialVisitPackages);

  // Modals
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null | undefined>(undefined); // undefined = closed
  const [editingRoom, setEditingRoom] = useState<Room | null | undefined>(undefined);
  const [editingVisitPkg, setEditingVisitPkg] = useState<VisitPackage | null | undefined>(undefined);
  const [deletingRoomTypeId, setDeletingRoomTypeId] = useState<string | null>(null);
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);
  const [deletingVisitPkgId, setDeletingVisitPkgId] = useState<string | null>(null);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);

  // Filters
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingTypeFilter, setBookingTypeFilter] = useState<'all' | 'stay' | 'day-visit'>('all');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>('all');

  // ── Stats
  const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.paidAmount, 0);
  const activeStays = bookings.filter(b => b.bookingType === 'stay' && b.status === 'checked-in').length;
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed').length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;

  // ── Handlers
  const saveRoomType = (rt: RoomType) => {
    setRoomTypes(prev => prev.some(r => r.id === rt.id) ? prev.map(r => r.id === rt.id ? rt : r) : [...prev, rt]);
  };
  const deleteRoomType = (id: string) => {
    setRoomTypes(prev => prev.filter(r => r.id !== id));
    setRooms(prev => prev.filter(r => r.roomTypeId !== id));
  };

  const saveRoom = (room: Room) => {
    setRooms(prev => prev.some(r => r.id === room.id) ? prev.map(r => r.id === room.id ? room : r) : [...prev, room]);
  };
  const deleteRoom = (id: string) => setRooms(prev => prev.filter(r => r.id !== id));

  const saveVisitPackage = (pkg: VisitPackage) => {
    setVisitPackages(prev => prev.some(p => p.id === pkg.id) ? prev.map(p => p.id === pkg.id ? pkg : p) : [...prev, pkg]);
  };
  const deleteVisitPackage = (id: string) => setVisitPackages(prev => prev.filter(p => p.id !== id));
  const toggleVisitPackageActive = (id: string) =>
    setVisitPackages(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));

  const changeBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  // ── Filtered bookings
  const filteredBookings = bookings.filter(b => {
    const matchSearch = b.guestName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.guestEmail.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchType = bookingTypeFilter === 'all' || b.bookingType === bookingTypeFilter;
    const matchStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const filteredRooms = rooms.filter(r => roomTypeFilter === 'all' || r.roomTypeId === roomTypeFilter);

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'room-types', label: 'Room Types', icon: <Building2 size={18} /> },
    { id: 'rooms', label: 'Rooms', icon: <BedDouble size={18} /> },
    { id: 'visit-packages', label: 'Visit Packages', icon: <Sun size={18} /> },
    { id: 'bookings', label: 'Bookings', icon: <CalendarCheck size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0d110d] text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#111511] border-r border-white/5 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#4a8f3f] rounded-lg flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Sumiran Resort</p>
              <p className="text-stone-500 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all
                ${section === item.id
                  ? 'bg-[#4a8f3f]/20 text-[#7bc67a] border border-[#4a8f3f]/30'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {item.icon}
              {item.label}
              {item.id === 'bookings' && (
                <span className="ml-auto bg-[#4a8f3f] text-white text-xs px-1.5 py-0.5 rounded-full">{bookings.length}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Exit */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={onExit}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronRight size={18} className="rotate-180" />
            Back to Site
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-[#111511] border-b border-white/5 px-4 sm:px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-stone-400 hover:text-white">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-white text-base">
                {navItems.find(n => n.id === section)?.label}
              </h1>
              <p className="text-stone-500 text-xs hidden sm:block">Sumiran Resort Management System</p>
            </div>
          </div>
          <div className="text-stone-500 text-xs hidden sm:block">March 3, 2026</div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">

          {/* ── Overview ──────────────────────────────────────────────── */}
          {section === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(2)}L`, icon: <IndianRupee size={18} />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                  { label: 'Active Stays', value: activeStays, icon: <BedDouble size={18} />, color: 'text-sky-400', bg: 'bg-sky-400/10' },
                  { label: 'Upcoming', value: upcomingBookings, icon: <CalendarCheck size={18} />, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                  { label: 'Available Rooms', value: availableRooms, icon: <Building2 size={18} />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                ].map(stat => (
                  <div key={stat.label} className="bg-[#151a15] border border-white/5 rounded-2xl p-4">
                    <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <p className="text-2xl text-white mb-0.5">{stat.value}</p>
                    <p className="text-stone-500 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Quick sections */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <div className="bg-[#151a15] border border-white/5 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-sm">Recent Bookings</h3>
                    <button onClick={() => setSection('bookings')} className="text-[#7bc67a] text-xs hover:text-[#4a8f3f] transition-colors">View all →</button>
                  </div>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map(b => (
                      <div key={b.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div>
                          <p className="text-white text-sm">{b.guestName}</p>
                          <p className="text-stone-500 text-xs">{b.id} · {b.bookingType === 'stay' ? 'Stay' : 'Day Visit'}</p>
                        </div>
                        <StatusBadge status={b.status} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Room Status Summary */}
                <div className="bg-[#151a15] border border-white/5 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-sm">Room Status Summary</h3>
                    <button onClick={() => setSection('rooms')} className="text-[#7bc67a] text-xs hover:text-[#4a8f3f] transition-colors">Manage →</button>
                  </div>
                  <div className="space-y-3">
                    {roomTypes.map(rt => {
                      const rtRooms = rooms.filter(r => r.roomTypeId === rt.id);
                      const avail = rtRooms.filter(r => r.status === 'available').length;
                      const occup = rtRooms.filter(r => r.status === 'occupied').length;
                      const maint = rtRooms.filter(r => r.status === 'maintenance').length;
                      return (
                        <div key={rt.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <div>
                            <p className="text-white text-sm">{rt.name}</p>
                            <p className="text-stone-500 text-xs">₹{rt.basePrice.toLocaleString('en-IN')}/night</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xs text-emerald-400">{avail} avail</span>
                            <span className="text-xs text-sky-400">{occup} occ</span>
                            {maint > 0 && <span className="text-xs text-amber-400">{maint} maint</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Visit Package quick summary */}
              <div className="bg-[#151a15] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-sm">Visit Packages</h3>
                  <button onClick={() => setSection('visit-packages')} className="text-[#7bc67a] text-xs hover:text-[#4a8f3f] transition-colors">Manage →</button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(['short-visit', 'half-day', 'full-day'] as VisitPackageCategory[]).map(cat => {
                    const cfg = visitPackageCategoryConfig[cat];
                    const total = visitPackages.filter(p => p.type === cat).length;
                    const active = visitPackages.filter(p => p.type === cat && p.isActive).length;
                    return (
                      <div key={cat} className="bg-white/5 rounded-xl p-3 text-center">
                        <div className={`inline-flex items-center justify-center mb-2 ${cfg.color.split(' ')[0]}`}>{cfg.icon}</div>
                        <p className="text-white text-lg">{active}<span className="text-stone-600 text-xs">/{total}</span></p>
                        <p className="text-stone-500 text-xs">{cfg.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Booking stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {(['confirmed', 'pending', 'checked-in', 'checked-out', 'cancelled'] as BookingStatus[]).map(s => {
                  const count = bookings.filter(b => b.status === s).length;
                  const cfg = statusConfig[s];
                  return (
                    <div key={s} className="bg-[#151a15] border border-white/5 rounded-xl p-4 text-center">
                      <p className={`text-2xl mb-1 ${cfg.color.split(' ')[0]}`}>{count}</p>
                      <p className="text-stone-500 text-xs">{cfg.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Room Types ─────────────────────────────────────────────── */}
          {section === 'room-types' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-stone-400 text-sm">{roomTypes.length} room types configured</p>
                <button
                  onClick={() => setEditingRoomType(null)}
                  className="flex items-center gap-2 bg-[#4a8f3f] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#3d7a34] transition-colors"
                >
                  <Plus size={16} /> Add Room Type
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {roomTypes.map(rt => {
                  const rtRooms = rooms.filter(r => r.roomTypeId === rt.id);
                  return (
                    <div key={rt.id} className="bg-[#151a15] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white">{rt.name}</h3>
                          <p className="text-[#7bc67a] text-sm">₹{rt.basePrice.toLocaleString('en-IN')}<span className="text-stone-500">/night</span></p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingRoomType(rt)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => setDeletingRoomTypeId(rt.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-stone-400 text-xs mb-4 leading-relaxed">{rt.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {rt.amenities.map(a => (
                          <span key={a} className="bg-white/5 border border-white/5 text-stone-400 text-xs px-2 py-0.5 rounded-full">{a}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs border-t border-white/5 pt-3">
                        <span className="text-stone-500">Max {rt.maxOccupancy} guests</span>
                        <span className="text-stone-500">{rtRooms.length} rooms assigned</span>
                        <span className="text-emerald-400">{rtRooms.filter(r => r.status === 'available').length} available</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Rooms ──────────────────────────────────────────────────── */}
          {section === 'rooms' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <div className="flex gap-2">
                  <select
                    className="bg-[#151a15] border border-white/10 rounded-xl px-3 py-2 text-stone-300 text-sm focus:outline-none focus:border-[#4a8f3f]"
                    value={roomTypeFilter}
                    onChange={e => setRoomTypeFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    {roomTypes.map(rt => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
                  </select>
                </div>
                <button
                  onClick={() => setEditingRoom(null)}
                  className="flex items-center gap-2 bg-[#4a8f3f] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#3d7a34] transition-colors"
                >
                  <Plus size={16} /> Add Room
                </button>
              </div>

              <div className="bg-[#151a15] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Room</th>
                        <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Type</th>
                        <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Floor</th>
                        <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">View</th>
                        <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Status</th>
                        <th className="text-right text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRooms.map(room => {
                        const rt = roomTypes.find(r => r.id === room.roomTypeId);
                        return (
                          <tr key={room.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                            <td className="px-4 py-3 text-white font-medium">#{room.roomNumber}</td>
                            <td className="px-4 py-3 text-stone-300">{rt?.name ?? '—'}</td>
                            <td className="px-4 py-3 text-stone-400">{room.floor === 0 ? 'Ground' : `Floor ${room.floor}`}</td>
                            <td className="px-4 py-3 text-stone-400">{room.view}</td>
                            <td className="px-4 py-3"><RoomStatusBadge status={room.status} /></td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => setEditingRoom(room)}
                                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-all"
                                >
                                  <Pencil size={14} />
                                </button>
                                <button
                                  onClick={() => setDeletingRoomId(room.id)}
                                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {filteredRooms.length === 0 && (
                    <div className="text-center py-12 text-stone-500">No rooms found.</div>
                  )}
                </div>
              </div>

              {/* Room summary */}
              <div className="grid grid-cols-3 gap-3">
                {(['available', 'occupied', 'maintenance'] as Room['status'][]).map(s => {
                  const count = rooms.filter(r => r.status === s).length;
                  const cfg = roomStatusConfig[s];
                  return (
                    <div key={s} className="bg-[#151a15] border border-white/5 rounded-xl p-3 text-center">
                      <p className={`text-xl mb-0.5 ${cfg.color.split(' ')[0]}`}>{count}</p>
                      <p className="text-stone-500 text-xs">{cfg.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Visit Packages ─────────────────────────────────────────── */}
          {section === 'visit-packages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-stone-400 text-sm">{visitPackages.length} packages configured · {visitPackages.filter(p => p.isActive).length} active</p>
                <button
                  onClick={() => setEditingVisitPkg(null)}
                  className="flex items-center gap-2 bg-[#4a8f3f] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#3d7a34] transition-colors"
                >
                  <Plus size={16} /> New Package
                </button>
              </div>

              {/* Category groups */}
              {(['short-visit', 'half-day', 'full-day'] as VisitPackageCategory[]).map(cat => {
                const pkgsInCat = visitPackages.filter(p => p.type === cat);
                if (pkgsInCat.length === 0) return null;
                const cfg = visitPackageCategoryConfig[cat];
                return (
                  <div key={cat}>
                    <div className={`flex items-center gap-2 mb-3`}>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${cfg.color}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                      <span className="text-stone-600 text-xs">{pkgsInCat.length} package{pkgsInCat.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {pkgsInCat.map(pkg => (
                        <div key={pkg.id} className={`bg-[#151a15] border rounded-2xl p-5 transition-colors ${pkg.isActive ? 'border-white/5 hover:border-white/10' : 'border-white/5 opacity-60'}`}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0 pr-3">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-white">{pkg.name}</h3>
                                {!pkg.isActive && (
                                  <span className="text-xs px-2 py-0.5 rounded-full border border-stone-700 text-stone-500">Inactive</span>
                                )}
                              </div>
                              <p className="text-[#7bc67a] text-sm mt-0.5">₹{pkg.pricePerPerson.toLocaleString('en-IN')}<span className="text-stone-500">/person</span></p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {/* Active toggle */}
                              <button
                                onClick={() => toggleVisitPackageActive(pkg.id)}
                                title={pkg.isActive ? 'Deactivate' : 'Activate'}
                                className={`p-1.5 rounded-lg transition-all ${pkg.isActive ? 'text-[#7bc67a] hover:bg-[#4a8f3f]/10' : 'text-stone-600 hover:text-stone-400 hover:bg-white/5'}`}
                              >
                                <div className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${pkg.isActive ? 'bg-[#4a8f3f] justify-end' : 'bg-white/10 justify-start'}`}>
                                  <div className={`w-3 h-3 rounded-full ${pkg.isActive ? 'bg-white' : 'bg-stone-500'}`} />
                                </div>
                              </button>
                              <button
                                onClick={() => setEditingVisitPkg(pkg)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-all"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => setDeletingVisitPkgId(pkg.id)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          <p className="text-stone-400 text-xs mb-4 leading-relaxed line-clamp-2">{pkg.description}</p>

                          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                            <div className="bg-white/5 rounded-lg px-2 py-2">
                              <p className="text-white text-sm">{pkg.duration}</p>
                              <p className="text-stone-500 text-xs">Duration</p>
                            </div>
                            <div className="bg-white/5 rounded-lg px-2 py-2">
                              <p className="text-white text-sm">{pkg.includedActivities}</p>
                              <p className="text-stone-500 text-xs">Activities</p>
                            </div>
                            <div className="bg-white/5 rounded-lg px-2 py-2">
                              <p className="text-white text-sm">{pkg.maxGroupSize}</p>
                              <p className="text-stone-500 text-xs">Max Group</p>
                            </div>
                          </div>

                          <p className="text-stone-500 text-xs mb-2">⏰ {pkg.timing}</p>

                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {pkg.includes.map(inc => (
                              <span key={inc} className="bg-white/5 border border-white/5 text-stone-400 text-xs px-2 py-0.5 rounded-full">{inc}</span>
                            ))}
                          </div>

                          {pkg.activities.length > 0 && (
                            <div>
                              <p className="text-stone-600 text-xs mb-1.5">Activity options:</p>
                              <div className="flex flex-wrap gap-1">
                                {pkg.activities.map(a => (
                                  <span key={a} className="bg-[#2d5a27]/20 border border-[#4a8f3f]/20 text-[#7bc67a] text-xs px-2 py-0.5 rounded-full">{a}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {visitPackages.length === 0 && (
                <div className="bg-[#151a15] border border-white/5 rounded-2xl p-12 text-center">
                  <Sun size={32} className="text-stone-600 mx-auto mb-3" />
                  <p className="text-stone-400">No visit packages yet. Create your first one.</p>
                </div>
              )}
            </div>
          )}

          {/* ── Bookings ───────────────────────────────────────────────── */}
          {section === 'bookings' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    className="w-full bg-[#151a15] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-stone-300 text-sm focus:outline-none focus:border-[#4a8f3f] placeholder:text-stone-600"
                    placeholder="Search by name, ID, or email..."
                    value={bookingSearch}
                    onChange={e => setBookingSearch(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    className="bg-[#151a15] border border-white/10 rounded-xl px-3 py-2 text-stone-300 text-sm focus:outline-none focus:border-[#4a8f3f]"
                    value={bookingTypeFilter}
                    onChange={e => setBookingTypeFilter(e.target.value as typeof bookingTypeFilter)}
                  >
                    <option value="all">All Types</option>
                    <option value="stay">Stay</option>
                    <option value="day-visit">Day Visit</option>
                  </select>
                  <select
                    className="bg-[#151a15] border border-white/10 rounded-xl px-3 py-2 text-stone-300 text-sm focus:outline-none focus:border-[#4a8f3f]"
                    value={bookingStatusFilter}
                    onChange={e => setBookingStatusFilter(e.target.value as typeof bookingStatusFilter)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="checked-in">Checked In</option>
                    <option value="checked-out">Checked Out</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <p className="text-stone-500 text-xs">{filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found</p>

              {/* Booking List */}
              <div className="space-y-3">
                {filteredBookings.map(booking => {
                  const roomType = booking.roomTypeId ? roomTypes.find(rt => rt.id === booking.roomTypeId) : undefined;
                  const room = booking.roomId ? rooms.find(r => r.id === booking.roomId) : undefined;
                  return (
                    <div
                      key={booking.id}
                      className="bg-[#151a15] border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Left */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-stone-500 text-xs font-mono">#{booking.id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${booking.bookingType === 'stay' ? 'text-sky-400 bg-sky-400/10 border-sky-400/20' : 'text-violet-400 bg-violet-400/10 border-violet-400/20'}`}>
                              {booking.bookingType === 'stay' ? 'Stay' : booking.visitType === 'full-day' ? 'Full Day Visit' : 'Half Day Visit'}
                            </span>
                            <StatusBadge status={booking.status} />
                            <PaymentBadge status={booking.paymentStatus} />
                          </div>
                          <p className="text-white">{booking.guestName}</p>
                          <p className="text-stone-400 text-xs mt-0.5 truncate">{booking.guestEmail} · {booking.guestPhone}</p>
                          <p className="text-stone-500 text-xs mt-1">
                            {booking.bookingType === 'stay'
                              ? `${roomType?.name ?? '—'} · Room #${room?.roomNumber ?? '—'} · ${booking.checkIn} → ${booking.checkOut} (${booking.nights}N)`
                              : `Visit: ${booking.visitDate}`
                            }
                          </p>
                        </div>

                        {/* Right */}
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
                          <div className="text-right">
                            <p className="text-white">₹{booking.totalAmount.toLocaleString('en-IN')}</p>
                            <p className="text-stone-500 text-xs">{booking.guests} guest{booking.guests > 1 ? 's' : ''} · Booked {booking.createdAt}</p>
                          </div>
                          <button
                            onClick={() => setViewingBooking(booking)}
                            className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-stone-300 hover:text-white hover:border-white/20 px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap"
                          >
                            <Eye size={13} /> View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredBookings.length === 0 && (
                  <div className="bg-[#151a15] border border-white/5 rounded-2xl p-12 text-center">
                    <AlertCircle size={32} className="text-stone-600 mx-auto mb-3" />
                    <p className="text-stone-400">No bookings match your filters.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      {editingRoomType !== undefined && (
        <RoomTypeModal
          roomType={editingRoomType}
          onClose={() => setEditingRoomType(undefined)}
          onSave={saveRoomType}
        />
      )}

      {editingRoom !== undefined && (
        <RoomModal
          room={editingRoom}
          roomTypes={roomTypes}
          onClose={() => setEditingRoom(undefined)}
          onSave={saveRoom}
        />
      )}

      {deletingRoomTypeId && (
        <DeleteConfirm
          label={roomTypes.find(r => r.id === deletingRoomTypeId)?.name ?? 'Room Type'}
          onConfirm={() => { deleteRoomType(deletingRoomTypeId); setDeletingRoomTypeId(null); }}
          onCancel={() => setDeletingRoomTypeId(null)}
        />
      )}

      {deletingRoomId && (
        <DeleteConfirm
          label={`Room #${rooms.find(r => r.id === deletingRoomId)?.roomNumber}`}
          onConfirm={() => { deleteRoom(deletingRoomId); setDeletingRoomId(null); }}
          onCancel={() => setDeletingRoomId(null)}
        />
      )}

      {editingVisitPkg !== undefined && (
        <VisitPackageModal
          pkg={editingVisitPkg}
          onClose={() => setEditingVisitPkg(undefined)}
          onSave={saveVisitPackage}
        />
      )}

      {deletingVisitPkgId && (
        <DeleteConfirm
          label={visitPackages.find(p => p.id === deletingVisitPkgId)?.name ?? 'Visit Package'}
          onConfirm={() => { deleteVisitPackage(deletingVisitPkgId); setDeletingVisitPkgId(null); }}
          onCancel={() => setDeletingVisitPkgId(null)}
        />
      )}

      {viewingBooking && (
        <BookingDetailModal
          booking={viewingBooking}
          roomTypes={roomTypes}
          rooms={rooms}
          onClose={() => setViewingBooking(null)}
          onStatusChange={changeBookingStatus}
        />
      )}
    </div>
  );
}

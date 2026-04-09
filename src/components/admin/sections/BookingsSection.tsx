import { AlertCircle, Eye, Search } from 'lucide-react';
import { PaymentBadge, StatusBadge } from '../badges';
import { type Booking, type BookingStatus, type Room, type RoomType } from '../types';

export function BookingsSection({
  bookings,
  roomTypes,
  rooms,
  bookingSearch,
  bookingTypeFilter,
  bookingStatusFilter,
  onBookingSearchChange,
  onBookingTypeFilterChange,
  onBookingStatusFilterChange,
  onViewBooking,
}: {
  bookings: Booking[];
  roomTypes: RoomType[];
  rooms: Room[];
  bookingSearch: string;
  bookingTypeFilter: 'all' | 'stay' | 'day-visit';
  bookingStatusFilter: BookingStatus | 'all';
  onBookingSearchChange: (value: string) => void;
  onBookingTypeFilterChange: (value: 'all' | 'stay' | 'day-visit') => void;
  onBookingStatusFilterChange: (value: BookingStatus | 'all') => void;
  onViewBooking: (booking: Booking) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            className="w-full bg-[#151a15] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-stone-300 text-sm focus:outline-none focus:border-[#4a8f3f] placeholder:text-stone-600"
            placeholder="Search by name, ID, or email..."
            value={bookingSearch}
            onChange={e => onBookingSearchChange(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="bg-[#151a15] border border-white/10 rounded-xl px-3 py-2 text-stone-300 text-sm focus:outline-none focus:border-[#4a8f3f]"
            value={bookingTypeFilter}
            onChange={e => onBookingTypeFilterChange(e.target.value as typeof bookingTypeFilter)}
          >
            <option value="all">All Types</option>
            <option value="stay">Stay</option>
            <option value="day-visit">Day Visit</option>
          </select>
          <select
            className="bg-[#151a15] border border-white/10 rounded-xl px-3 py-2 text-stone-300 text-sm focus:outline-none focus:border-[#4a8f3f]"
            value={bookingStatusFilter}
            onChange={e => onBookingStatusFilterChange(e.target.value as typeof bookingStatusFilter)}
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="checked-in">Checked In</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <p className="text-stone-500 text-xs">{bookings.length} booking{bookings.length !== 1 ? 's' : ''} found</p>

      <div className="space-y-3">
        {bookings.map(booking => {
          const roomType = booking.roomTypeId ? roomTypes.find(rt => rt.id === booking.roomTypeId) : undefined;
          const room = booking.roomId ? rooms.find(r => r.id === booking.roomId) : undefined;
          return (
            <div
              key={booking.id}
              className="bg-[#151a15] border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-white/10 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
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

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
                  <div className="text-right">
                    <p className="text-white">₹{booking.totalAmount.toLocaleString('en-IN')}</p>
                    <p className="text-stone-500 text-xs">{booking.guests} guest{booking.guests > 1 ? 's' : ''} · Booked {booking.createdAt}</p>
                  </div>
                  <button
                    onClick={() => onViewBooking(booking)}
                    className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-stone-300 hover:text-white hover:border-white/20 px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap"
                  >
                    <Eye size={13} /> View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {bookings.length === 0 && (
          <div className="bg-[#151a15] border border-white/5 rounded-2xl p-12 text-center">
            <AlertCircle size={32} className="text-stone-600 mx-auto mb-3" />
            <p className="text-stone-400">No bookings match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { X } from 'lucide-react';
import { PaymentBadge, StatusBadge } from '../badges';
import { statusConfig } from '../config';
import { type Booking, type BookingStatus, type Room, type RoomType } from '../types';

export function BookingDetailModal({
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

  const statusOptions: BookingStatus[] = ['pending', 'confirmed', 'checked-in', 'completed', 'cancelled'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#1a1f1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
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

          {booking.specialRequests && (
            <div>
              <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Special Requests</h3>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                <p className="text-stone-300 text-sm">{booking.specialRequests}</p>
              </div>
            </div>
          )}

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

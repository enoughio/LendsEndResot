import { X } from 'lucide-react';
import { EXIT_POLICY_TEXT, ruleText } from '@/lib/house-rules';
import { signatureImageSrc } from '@/lib/signature-data';
import { PaymentBadge, StatusBadge } from '../badges';
import { statusConfig } from '../config';
import { type Booking, type BookingStatus, type Room, type RoomType } from '../types';

function money(value: number) {
  return `₹${value.toLocaleString('en-IN')}`;
}

function visitLabel(booking: Booking) {
  if (booking.visitPackageName) return booking.visitPackageName;
  if (booking.visitType === 'full-day') return 'Full day';
  if (booking.visitType === 'half-day') return 'Half day';
  if (booking.visitType === 'short-visit') return 'Short visit';
  return '—';
}

function purposeLabel(purpose: string) {
  if (purpose === 'STAY') return 'Stay';
  if (purpose === 'VISIT') return 'Day visit';
  if (purpose === 'RETREAT') return 'Retreat';
  if (purpose === 'GROUP') return 'Group';
  return purpose;
}

function formatConsentDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

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
  const roomTypeName = booking.roomTypeName || roomType?.name || '—';
  const roomNumber = booking.roomNumber || room?.roomNumber;
  const roomsBooked = booking.roomsBooked ?? 1;
  const signatureSrc = signatureImageSrc(booking.consent?.signatureData);
  const consentWhen = formatConsentDate(booking.consent?.createdAt);
  const guestList = (booking.guestList || []).filter((guest) => guest.name || guest.phone);

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
              {booking.bookingType === 'stay' ? 'Stay Booking' : `Day Visit — ${visitLabel(booking)}`}
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
                <p className="text-white break-all">{booking.guestEmail}</p>
              </div>
              <div>
                <p className="text-stone-500 text-xs mb-1">Phone</p>
                <p className="text-white">{booking.guestPhone}</p>
              </div>
            </div>
          </div>

          {guestList.length > 0 && (
            <div>
              <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Guest list</h3>
              <ul className="bg-white/5 rounded-xl p-4 space-y-2">
                {guestList.map((guest, index) => (
                  <li key={`${guest.name}-${guest.phone}-${index}`} className="text-white text-sm">
                    {guest.name || 'Guest'}{guest.phone ? ` · ${guest.phone}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {booking.bookingType === 'stay' ? (
            <div>
              <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Stay Details</h3>
              <div className="bg-white/5 rounded-xl p-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-stone-500 text-xs mb-1">Room Type</p>
                  <p className="text-white">{roomTypeName}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Room Number</p>
                  <p className="text-white">{roomNumber ? `#${roomNumber}` : '—'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Rooms booked</p>
                  <p className="text-white">{roomsBooked}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Meal plan</p>
                  <p className="text-white">
                    {booking.mealPlanName || '—'}
                    {(booking.mealPlanPrice ?? 0) > 0 ? ` · ${money(booking.mealPlanPrice ?? 0)}` : ''}
                  </p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Check-In</p>
                  <p className="text-white">{booking.checkIn || '—'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Check-Out</p>
                  <p className="text-white">{booking.checkOut || '—'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Duration</p>
                  <p className="text-white">{booking.nights == null ? '—' : `${booking.nights} night${booking.nights === 1 ? '' : 's'}`}</p>
                </div>
                {(booking.extraGuestCount ?? 0) > 0 && (
                  <div>
                    <p className="text-stone-500 text-xs mb-1">Extra guests</p>
                    <p className="text-white">{booking.extraGuestCount} · {money(booking.extraGuestPrice ?? 0)}</p>
                  </div>
                )}
                {room?.view && (
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
                  <p className="text-white">{booking.visitDate || '—'}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs mb-1">Package</p>
                  <p className="text-white">{visitLabel(booking)}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Activities</h3>
            {booking.activities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {booking.activities.map(a => (
                  <span key={a} className="bg-[#2d5a27]/30 border border-[#4a8f3f]/30 text-[#7bc67a] text-xs px-3 py-1 rounded-full">
                    {a}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-stone-500 text-sm">None added</p>
            )}
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
            <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">House rules consent</h3>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-stone-300">
              {booking.consent ? (
                <>
                  <p className="text-stone-400">
                    Accepted by {booking.consent.signerName || '—'}
                    {booking.consent.purpose ? ` · ${purposeLabel(booking.consent.purpose)}` : ''}
                  </p>
                  {consentWhen && <p className="mt-1 text-xs text-stone-500">{consentWhen}</p>}
                  {(booking.consent.acceptedRuleIds || []).length > 0 ? (
                    <ul className="mt-3 space-y-1">
                      {booking.consent.acceptedRuleIds.map((id) => (
                        <li key={id}>· {ruleText(id)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-stone-500">No rules were recorded.</p>
                  )}
                  {booking.consent.exitPolicyAccepted && <p className="mt-3 text-emerald-200">{EXIT_POLICY_TEXT}</p>}
                  {signatureSrc ? (
                    <img src={signatureSrc} alt={`Signature of ${booking.consent.signerName || 'guest'}`} className="mt-4 max-h-40 rounded-lg bg-white p-2" />
                  ) : booking.consent.hasSignature ? (
                    <p className="mt-3 text-xs text-stone-500">A drawn signature is on file.</p>
                  ) : null}
                </>
              ) : (
                <p className="text-stone-500">No house rules consent is linked to this booking.</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-3">Payment Information</h3>
            <div className="bg-white/5 rounded-xl p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-stone-500 text-xs mb-1">Total Amount</p>
                <p className="text-white">{money(booking.totalAmount)}</p>
              </div>
              <div>
                <p className="text-stone-500 text-xs mb-1">Paid Amount</p>
                <p className="text-white">{money(booking.paidAmount)}</p>
              </div>
              <div>
                <p className="text-stone-500 text-xs mb-1">Balance Due</p>
                <p className={`${booking.totalAmount - booking.paidAmount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {money(booking.totalAmount - booking.paidAmount)}
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
              {booking.paymentReference && (
                <div className="col-span-2">
                  <p className="text-stone-500 text-xs mb-1">Payment reference</p>
                  <p className="text-white break-all">{booking.paymentReference}</p>
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

'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export type RoomCard = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  capacity: number;
  amenities: string[];
};

interface RoomBookingCardProps {
  room: RoomCard;
}

const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function RoomBookingCard({ room }: RoomBookingCardProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [gatewayReady, setGatewayReady] = useState(false);

  useEffect(() => {
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      setGatewayReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setGatewayReady(true);
    document.body.appendChild(script);
  }, []);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 1;
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return Math.max(diff, 1);
  }, [checkIn, checkOut]);

  const totalAmount = room.price * nights;

  const handleBook = async () => {
    if (!session) {
      await signIn(undefined, { callbackUrl: '/booking' });
      return;
    }

    if (!gatewayReady) {
      setMessage('Payment gateway is still loading. Please retry in a moment.');
      return;
    }

    if (!checkIn || !checkOut) {
      setMessage('Please pick check-in and check-out dates.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount, currency: room.currency, receipt: `room-${room.id}-${Date.now()}` }),
      });

      if (!orderRes.ok) {
        throw new Error('Unable to create payment order');
      }

      const order = await orderRes.json();

      const bookingRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room.id,
          checkIn,
          checkOut,
          guests,
          activities: [],
          totalAmount,
          currency: room.currency,
          razorpayOrderId: order.id,
        }),
      });

      if (!bookingRes.ok) {
        const err = await bookingRes.json().catch(() => ({}));
        throw new Error(err.message || 'Booking failed');
      }

      const booking = await bookingRes.json();

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Land's End Resort",
        description: `${room.name} booking`,
        order_id: order.id,
        prefill: {
          name: session.user?.name || '',
          email: session.user?.email || '',
        },
        notes: {
          roomId: room.id,
          bookingId: booking.id,
        },
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, bookingId: booking.id }),
          });
          setMessage('Payment successful! Your booking is confirmed.');
          router.push('/booking/booked');
        },
      });

      rzp.on('payment.failed', () => {
        setMessage('Payment failed. Please try again.');
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      setMessage('We could not complete the booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-gray-900">{room.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{room.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {room.amenities.slice(0, 6).map((amenity) => (
              <span key={amenity} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl text-gray-900">{formatter.format(room.price)}</div>
          <p className="text-gray-600 text-sm">per night • up to {room.capacity} guests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="border rounded-lg p-3">
          <label className="text-sm text-gray-600">Check-in</label>
          <input type="date" value={checkIn} min={new Date().toISOString().split('T')[0]} onChange={(e) => setCheckIn(e.target.value)} className="w-full focus:outline-none text-gray-900" />
        </div>
        <div className="border rounded-lg p-3">
          <label className="text-sm text-gray-600">Check-out</label>
          <input type="date" value={checkOut} min={checkIn || new Date().toISOString().split('T')[0]} onChange={(e) => setCheckOut(e.target.value)} className="w-full focus:outline-none text-gray-900" />
        </div>
        <div className="border rounded-lg p-3">
          <label className="text-sm text-gray-600">Guests</label>
          <input type="number" value={guests} min={1} max={room.capacity} onChange={(e) => setGuests(Math.max(1, Math.min(room.capacity, Number(e.target.value) || 1)))} className="w-full focus:outline-none text-gray-900" />
        </div>
        <div className="border rounded-lg p-3 bg-green-50 text-green-800">
          <p className="text-sm">Total ({nights} night{nights > 1 ? 's' : ''})</p>
          <p className="text-lg font-semibold">{formatter.format(totalAmount)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600">Includes taxes and fees. Secure payment via Razorpay.</p>
        <button onClick={handleBook} disabled={loading} className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-60">
          {loading ? 'Processing...' : 'Book now'}
        </button>
      </div>

      {message && <p className="text-sm text-red-600 mt-3">{message}</p>}
    </div>
  );
}

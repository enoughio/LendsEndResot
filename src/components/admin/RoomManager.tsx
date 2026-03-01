'use client';

import { Room } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

interface RoomManagerProps {
  initialRooms: Room[];
  occupancy?: number;
}

export function RoomManager({ initialRooms, occupancy }: RoomManagerProps) {
  const router = useRouter();
  const [rooms, setRooms] = useState(initialRooms);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState(5000);
  const [capacity, setCapacity] = useState(2);
  const [status, setStatus] = useState<'AVAILABLE' | 'UNAVAILABLE'>('AVAILABLE');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitRoom = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        slug,
        type: 'Custom',
        description: 'Managed via dashboard',
        price,
        currency: 'INR',
        capacity,
        status,
        amenities: [],
        images: [],
        totalInventory: 1,
      }),
    });

    if (!res.ok) {
      setMessage('Could not create room. Check inputs and try again.');
      setLoading(false);
      return;
    }

    const room = await res.json();
    setRooms([room, ...rooms]);
    setName('');
    setSlug('');
    setPrice(5000);
    setCapacity(2);
    setStatus('AVAILABLE');
    setMessage('Room added');
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Room management</h2>
          {typeof occupancy === 'number' && (
            <p className="text-xs text-gray-600">Current occupancy {occupancy}%</p>
          )}
        </div>
        {message && <span className="text-sm text-green-700">{message}</span>}
      </div>

      <form onSubmit={submitRoom} className="grid grid-cols-2 gap-3 text-sm">
        <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        <input className="border border-gray-300 rounded-lg px-3 py-2" type="number" min={1} placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        <input className="border border-gray-300 rounded-lg px-3 py-2" type="number" min={1} placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} required />
        <select className="border border-gray-300 rounded-lg px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value as 'AVAILABLE' | 'UNAVAILABLE')}>
          <option value="AVAILABLE">Available</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </select>
        <button type="submit" disabled={loading} className="bg-green-600 text-white rounded-lg px-3 py-2 hover:bg-green-700 transition disabled:opacity-60">
          {loading ? 'Saving...' : 'Add room'}
        </button>
      </form>

      <div className="space-y-2 text-sm">
        {rooms.map((room) => (
          <div key={room.id} className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
            <div>
              <p className="text-gray-900">{room.name}</p>
              <p className="text-gray-600 text-xs">₹{room.price} • {room.capacity} guests</p>
            </div>
            <span className={`px-2 py-1 rounded-full ${room.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
              {room.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

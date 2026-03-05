import { useState } from 'react';
import { X } from 'lucide-react';
import { type Room, type RoomType } from '../types';

export function RoomModal({
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

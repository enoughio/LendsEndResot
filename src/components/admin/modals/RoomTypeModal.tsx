import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { type RoomType } from '../types';

export function RoomTypeModal({
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

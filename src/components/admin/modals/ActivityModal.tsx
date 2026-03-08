import { useState } from 'react';
import { X } from 'lucide-react';
import { type Activity } from '../types';

export function ActivityModal({
  activity,
  onClose,
  onSave,
}: {
  activity: Activity | null;
  onClose: () => void;
  onSave: (activity: Activity) => void;
}) {
  const [form, setForm] = useState<Activity>(
    activity ?? {
      id: `act${Date.now()}`,
      name: '',
      duration: 1,
      price: 0,
      status: 'ACTIVE',
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#1a1f1a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-white">{activity ? 'Edit Activity' : 'Add Activity'}</h2>
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
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Kayaking"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Duration (hours)</label>
              <input
                type="number"
                min={0.5}
                step={0.5}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Price (INR)</label>
              <input
                type="number"
                min={0}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
              />
            </div>
          </div>

          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Status</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Activity['status'] }))}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 border border-white/10 text-stone-400 py-2 rounded-lg text-sm hover:border-white/30 hover:text-white transition-all">
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(form);
                onClose();
              }}
              className="flex-1 bg-[#4a8f3f] text-white py-2 rounded-lg text-sm hover:bg-[#3d7a34] transition-colors"
            >
              {activity ? 'Save Changes' : 'Create Activity'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { X } from 'lucide-react';
import { type MealPlan } from '../types';

export function MealPlanModal({
  mealPlan,
  onClose,
  onSave,
}: {
  mealPlan: MealPlan | null;
  onClose: () => void;
  onSave: (plan: MealPlan) => void;
}) {
  const [form, setForm] = useState<MealPlan>(
    mealPlan ?? {
      id: `mp${Date.now()}`,
      name: '',
      description: '',
      pricePerPerson: 0,
      isActive: true,
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
          <h2 className="text-white">{mealPlan ? 'Edit Meal Plan' : 'Add Meal Plan'}</h2>
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
              placeholder="e.g. Organic Veg Meal Plan"
            />
          </div>

          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Description</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f] resize-none"
              rows={3}
              value={form.description || ''}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Describe what is included in this meal plan..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Price (INR / person)</label>
              <input
                type="number"
                min={0}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.pricePerPerson}
                onChange={(e) => setForm((f) => ({ ...f, pricePerPerson: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Status</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
                value={form.isActive ? 'ACTIVE' : 'INACTIVE'}
                onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.value === 'ACTIVE' }))}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
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
              {mealPlan ? 'Save Changes' : 'Create Meal Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

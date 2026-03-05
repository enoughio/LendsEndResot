import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { visitPackageCategoryConfig } from '../config';
import { type VisitPackage, type VisitPackageCategory } from '../types';

export function VisitPackageModal({
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

          <div>
            <label className="text-stone-400 text-xs uppercase tracking-widest block mb-2">Package Name</label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4a8f3f]"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Morning Half-Day Escape"
            />
          </div>

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

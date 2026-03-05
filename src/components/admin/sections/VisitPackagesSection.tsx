import { Pencil, Plus, Sun, Trash2 } from 'lucide-react';
import { visitPackageCategoryConfig } from '../config';
import { type VisitPackage, type VisitPackageCategory } from '../types';

export function VisitPackagesSection({
  visitPackages,
  onAddPackage,
  onEditPackage,
  onDeletePackage,
  onToggleActive,
}: {
  visitPackages: VisitPackage[];
  onAddPackage: () => void;
  onEditPackage: (pkg: VisitPackage) => void;
  onDeletePackage: (id: string) => void;
  onToggleActive: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-stone-400 text-sm">{visitPackages.length} packages configured · {visitPackages.filter(p => p.isActive).length} active</p>
        <button
          onClick={onAddPackage}
          className="flex items-center gap-2 bg-[#4a8f3f] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#3d7a34] transition-colors"
        >
          <Plus size={16} /> New Package
        </button>
      </div>

      {(['short-visit', 'half-day', 'full-day'] as VisitPackageCategory[]).map(cat => {
        const pkgsInCat = visitPackages.filter(p => p.type === cat);
        if (pkgsInCat.length === 0) return null;
        const cfg = visitPackageCategoryConfig[cat];
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${cfg.color}`}>
                {cfg.icon} {cfg.label}
              </span>
              <span className="text-stone-600 text-xs">{pkgsInCat.length} package{pkgsInCat.length > 1 ? 's' : ''}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {pkgsInCat.map(pkg => (
                <div key={pkg.id} className={`bg-[#151a15] border rounded-2xl p-5 transition-colors ${pkg.isActive ? 'border-white/5 hover:border-white/10' : 'border-white/5 opacity-60'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-white">{pkg.name}</h3>
                        {!pkg.isActive && (
                          <span className="text-xs px-2 py-0.5 rounded-full border border-stone-700 text-stone-500">Inactive</span>
                        )}
                      </div>
                      <p className="text-[#7bc67a] text-sm mt-0.5">₹{pkg.pricePerPerson.toLocaleString('en-IN')}<span className="text-stone-500">/person</span></p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => onToggleActive(pkg.id)}
                        title={pkg.isActive ? 'Deactivate' : 'Activate'}
                        className={`p-1.5 rounded-lg transition-all ${pkg.isActive ? 'text-[#7bc67a] hover:bg-[#4a8f3f]/10' : 'text-stone-600 hover:text-stone-400 hover:bg-white/5'}`}
                      >
                        <div className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${pkg.isActive ? 'bg-[#4a8f3f] justify-end' : 'bg-white/10 justify-start'}`}>
                          <div className={`w-3 h-3 rounded-full ${pkg.isActive ? 'bg-white' : 'bg-stone-500'}`} />
                        </div>
                      </button>
                      <button
                        onClick={() => onEditPackage(pkg)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDeletePackage(pkg.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <p className="text-stone-400 text-xs mb-4 leading-relaxed line-clamp-2">{pkg.description}</p>

                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-white/5 rounded-lg px-2 py-2">
                      <p className="text-white text-sm">{pkg.duration}</p>
                      <p className="text-stone-500 text-xs">Duration</p>
                    </div>
                    <div className="bg-white/5 rounded-lg px-2 py-2">
                      <p className="text-white text-sm">{pkg.includedActivities}</p>
                      <p className="text-stone-500 text-xs">Activities</p>
                    </div>
                    <div className="bg-white/5 rounded-lg px-2 py-2">
                      <p className="text-white text-sm">{pkg.maxGroupSize}</p>
                      <p className="text-stone-500 text-xs">Max Group</p>
                    </div>
                  </div>

                  <p className="text-stone-500 text-xs mb-2">⏰ {pkg.timing}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {pkg.includes.map(inc => (
                      <span key={inc} className="bg-white/5 border border-white/5 text-stone-400 text-xs px-2 py-0.5 rounded-full">{inc}</span>
                    ))}
                  </div>

                  {pkg.activities.length > 0 && (
                    <div>
                      <p className="text-stone-600 text-xs mb-1.5">Activity options:</p>
                      <div className="flex flex-wrap gap-1">
                        {pkg.activities.map(a => (
                          <span key={a} className="bg-[#2d5a27]/20 border border-[#4a8f3f]/20 text-[#7bc67a] text-xs px-2 py-0.5 rounded-full">{a}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {visitPackages.length === 0 && (
        <div className="bg-[#151a15] border border-white/5 rounded-2xl p-12 text-center">
          <Sun size={32} className="text-stone-600 mx-auto mb-3" />
          <p className="text-stone-400">No visit packages yet. Create your first one.</p>
        </div>
      )}
    </div>
  );
}

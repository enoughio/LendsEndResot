import { Pencil, Plus, Trash2 } from 'lucide-react';
import { type MealPlan } from '../types';

export function MealPlansSection({
  mealPlans,
  onAddMealPlan,
  onEditMealPlan,
  onDeleteMealPlan,
}: {
  mealPlans: MealPlan[];
  onAddMealPlan: () => void;
  onEditMealPlan: (plan: MealPlan) => void;
  onDeleteMealPlan: (id: string) => void;
}) {
  const activeCount = mealPlans.filter((plan) => plan.isActive).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-stone-400 text-sm">{mealPlans.length} meal plans configured · {activeCount} active</p>
        <button
          onClick={onAddMealPlan}
          className="flex items-center gap-2 bg-[#4a8f3f] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#3d7a34] transition-colors"
        >
          <Plus size={16} /> New Meal Plan
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {mealPlans.map((plan) => (
          <div key={plan.id} className="bg-[#151a15] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-white">{plan.name}</h3>
                <p className="text-[#7bc67a] text-sm">₹{plan.pricePerPerson.toLocaleString('en-IN')}<span className="text-stone-500">/person</span></p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEditMealPlan(plan)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => onDeleteMealPlan(plan.id)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            {plan.description && (
              <p className="text-stone-400 text-xs mb-3 leading-relaxed">{plan.description}</p>
            )}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${
              plan.isActive
                ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
                : 'text-stone-400 bg-stone-400/10 border-stone-400/20'
            }`}>
              {plan.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
      </div>
      {mealPlans.length === 0 && (
        <div className="text-center py-12 text-stone-500">No meal plans found.</div>
      )}
    </div>
  );
}

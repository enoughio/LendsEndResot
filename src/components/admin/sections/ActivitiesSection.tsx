import { Pencil, Plus, Trash2 } from 'lucide-react';
import { type Activity } from '../types';

export function ActivitiesSection({
  activities,
  onAddActivity,
  onEditActivity,
  onDeleteActivity,
}: {
  activities: Activity[];
  onAddActivity: () => void;
  onEditActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
}) {
  const activeCount = activities.filter((activity) => activity.status === 'ACTIVE').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-stone-400 text-sm">{activities.length} activities configured · {activeCount} active</p>
        <button
          onClick={onAddActivity}
          className="flex items-center gap-2 bg-[#4a8f3f] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#3d7a34] transition-colors"
        >
          <Plus size={16} /> New Activity
        </button>
      </div>

      <div className="bg-[#151a15] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Activity</th>
                <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Duration</th>
                <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Price</th>
                <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => {
                const isActive = activity.status === 'ACTIVE';
                return (
                  <tr key={activity.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{activity.name}</td>
                    <td className="px-4 py-3 text-stone-400">{activity.duration}h</td>
                    <td className="px-4 py-3 text-stone-300">INR {activity.price.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${
                        isActive
                          ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
                          : 'text-stone-400 bg-stone-400/10 border-stone-400/20'
                      }`}>
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEditActivity(activity)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => onDeleteActivity(activity.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {activities.length === 0 && (
            <div className="text-center py-12 text-stone-500">No activities found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

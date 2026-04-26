import { Pencil, Plus, Trash2 } from 'lucide-react';
import { type Room, type RoomType } from '../types';

export function RoomTypesSection({
  roomTypes,
  rooms,
  onAddRoomType,
  onEditRoomType,
  onDeleteRoomType,
}: {
  roomTypes: RoomType[];
  rooms: Room[];
  onAddRoomType: () => void;
  onEditRoomType: (rt: RoomType) => void;
  onDeleteRoomType: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-stone-400 text-sm">{roomTypes.length} room types configured</p>
        <button
          onClick={onAddRoomType}
          className="flex items-center gap-2 bg-[#4a8f3f] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#3d7a34] transition-colors"
        >
          <Plus size={16} /> Add Room Type
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {roomTypes.map(rt => {
          const rtRooms = rooms.filter(r => r.roomTypeId === rt.id);
          return (
            <div key={rt.id} className="bg-[#151a15] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white">{rt.name}</h3>
                  <p className="text-[#7bc67a] text-sm">₹{rt.basePrice.toLocaleString('en-IN')}<span className="text-stone-500">/night</span></p>
                  {rt.isSingleOccupancy && (
                    <span className="mt-2 inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                      Single occupancy
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditRoomType(rt)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDeleteRoomType(rt.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-stone-400 text-xs mb-4 leading-relaxed">{rt.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {rt.amenities.map(a => (
                  <span key={a} className="bg-white/5 border border-white/5 text-stone-400 text-xs px-2 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs border-t border-white/5 pt-3">
                <span className="text-stone-500">Base {rt.baseOccupancy} / Max {rt.maxOccupancy}</span>
                <span className="text-stone-500">Extra ₹{rt.extraPersonPrice.toLocaleString('en-IN')}/night</span>
                <span className="text-stone-500">{rtRooms.length} rooms assigned</span>
                <span className="text-emerald-400">{rtRooms.filter(r => r.status === 'available').length} available</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

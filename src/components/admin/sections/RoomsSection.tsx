import { Pencil, Plus, Trash2 } from 'lucide-react';
import { RoomStatusBadge } from '../badges';
import { roomStatusConfig } from '../config';
import { type Room, type RoomType } from '../types';

export function RoomsSection({
  roomTypes,
  rooms,
  filteredRooms,
  roomTypeFilter,
  onRoomTypeFilterChange,
  onAddRoom,
  onEditRoom,
  onDeleteRoom,
}: {
  roomTypes: RoomType[];
  rooms: Room[];
  filteredRooms: Room[];
  roomTypeFilter: string;
  onRoomTypeFilterChange: (value: string) => void;
  onAddRoom: () => void;
  onEditRoom: (room: Room) => void;
  onDeleteRoom: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex gap-2">
          <select
            className="bg-[#151a15] border border-white/10 rounded-xl px-3 py-2 text-stone-300 text-sm focus:outline-none focus:border-[#4a8f3f]"
            value={roomTypeFilter}
            onChange={e => onRoomTypeFilterChange(e.target.value)}
          >
            <option value="all">All Types</option>
            {roomTypes.map(rt => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
          </select>
        </div>
        <button
          onClick={onAddRoom}
          className="flex items-center gap-2 bg-[#4a8f3f] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#3d7a34] transition-colors"
        >
          <Plus size={16} /> Add Room
        </button>
      </div>

      <div className="bg-[#151a15] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Room</th>
                <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Type</th>
                <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Floor</th>
                <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">View</th>
                <th className="text-left text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-stone-500 text-xs uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map(room => {
                const rt = roomTypes.find(r => r.id === room.roomTypeId);
                return (
                  <tr key={room.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">#{room.roomNumber}</td>
                    <td className="px-4 py-3 text-stone-300">{rt?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-stone-400">{room.floor === 0 ? 'Ground' : `Floor ${room.floor}`}</td>
                    <td className="px-4 py-3 text-stone-400">{room.view}</td>
                    <td className="px-4 py-3"><RoomStatusBadge status={room.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEditRoom(room)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => onDeleteRoom(room.id)}
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
          {filteredRooms.length === 0 && (
            <div className="text-center py-12 text-stone-500">No rooms found.</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {(['available', 'occupied', 'maintenance'] as Room['status'][]).map(s => {
          const count = rooms.filter(r => r.status === s).length;
          const cfg = roomStatusConfig[s];
          return (
            <div key={s} className="bg-[#151a15] border border-white/5 rounded-xl p-3 text-center">
              <p className={`text-xl mb-0.5 ${cfg.color.split(' ')[0]}`}>{count}</p>
              <p className="text-stone-500 text-xs">{cfg.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

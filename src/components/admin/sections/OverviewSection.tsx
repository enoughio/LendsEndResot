import { BedDouble, Building2, CalendarCheck, IndianRupee } from 'lucide-react';
import { StatusBadge } from '../badges';
import { statusConfig, visitPackageCategoryConfig } from '../config';
import { type Booking, type BookingStatus, type Room, type RoomType, type Section, type VisitPackage, type VisitPackageCategory } from '../types';

export function OverviewSection({
  totalRevenue,
  activeStays,
  upcomingBookings,
  availableRooms,
  bookings,
  roomTypes,
  rooms,
  visitPackages,
  onNavigate,
}: {
  totalRevenue: number;
  activeStays: number;
  upcomingBookings: number;
  availableRooms: number;
  bookings: Booking[];
  roomTypes: RoomType[];
  rooms: Room[];
  visitPackages: VisitPackage[];
  onNavigate: (section: Section) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(2)}L`, icon: <IndianRupee size={18} />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Active Stays', value: activeStays, icon: <BedDouble size={18} />, color: 'text-sky-400', bg: 'bg-sky-400/10' },
          { label: 'Upcoming', value: upcomingBookings, icon: <CalendarCheck size={18} />, color: 'text-amber-400', bg: 'bg-amber-400/10' },
          { label: 'Available Rooms', value: availableRooms, icon: <Building2 size={18} />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#151a15] border border-white/5 rounded-2xl p-4">
            <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-2xl text-white mb-0.5">{stat.value}</p>
            <p className="text-stone-500 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#151a15] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-sm">Recent Bookings</h3>
            <button onClick={() => onNavigate('bookings')} className="text-[#7bc67a] text-xs hover:text-[#4a8f3f] transition-colors">View all →</button>
          </div>
          <div className="space-y-3">
            {bookings.slice(0, 5).map(b => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-white text-sm">{b.guestName}</p>
                  <p className="text-stone-500 text-xs">{b.id} · {b.bookingType === 'stay' ? 'Stay' : 'Day Visit'}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#151a15] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-sm">Room Status Summary</h3>
            <button onClick={() => onNavigate('rooms')} className="text-[#7bc67a] text-xs hover:text-[#4a8f3f] transition-colors">Manage →</button>
          </div>
          <div className="space-y-3">
            {roomTypes.map(rt => {
              const rtRooms = rooms.filter(r => r.roomTypeId === rt.id);
              const avail = rtRooms.filter(r => r.status === 'available').length;
              const occup = rtRooms.filter(r => r.status === 'occupied').length;
              const maint = rtRooms.filter(r => r.status === 'maintenance').length;
              return (
                <div key={rt.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-white text-sm">{rt.name}</p>
                    <p className="text-stone-500 text-xs">₹{rt.basePrice.toLocaleString('en-IN')}/night</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-emerald-400">{avail} avail</span>
                    <span className="text-xs text-sky-400">{occup} occ</span>
                    {maint > 0 && <span className="text-xs text-amber-400">{maint} maint</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#151a15] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-sm">Visit Packages</h3>
          <button onClick={() => onNavigate('visit-packages')} className="text-[#7bc67a] text-xs hover:text-[#4a8f3f] transition-colors">Manage →</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(['short-visit', 'half-day', 'full-day'] as VisitPackageCategory[]).map(cat => {
            const cfg = visitPackageCategoryConfig[cat];
            const total = visitPackages.filter(p => p.type === cat).length;
            const active = visitPackages.filter(p => p.type === cat && p.isActive).length;
            return (
              <div key={cat} className="bg-white/5 rounded-xl p-3 text-center">
                <div className={`inline-flex items-center justify-center mb-2 ${cfg.color.split(' ')[0]}`}>{cfg.icon}</div>
                <p className="text-white text-lg">{active}<span className="text-stone-600 text-xs">/{total}</span></p>
                <p className="text-stone-500 text-xs">{cfg.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {(['confirmed', 'pending', 'checked-in', 'checked-out', 'cancelled'] as BookingStatus[]).map(s => {
          const count = bookings.filter(b => b.status === s).length;
          const cfg = statusConfig[s];
          return (
            <div key={s} className="bg-[#151a15] border border-white/5 rounded-xl p-4 text-center">
              <p className={`text-2xl mb-1 ${cfg.color.split(' ')[0]}`}>{count}</p>
              <p className="text-stone-500 text-xs">{cfg.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

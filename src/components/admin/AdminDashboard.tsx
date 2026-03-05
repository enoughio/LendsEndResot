'use client';

import { useState, type ReactNode } from 'react';
import { BedDouble, Building2, CalendarCheck, ChevronRight, LayoutDashboard, Leaf, Menu, Sun } from 'lucide-react';
import { initialBookings, initialRooms, initialRoomTypes, initialVisitPackages } from './data';
import { BookingDetailModal } from './modals/BookingDetailModal';
import { DeleteConfirm } from './modals/DeleteConfirm';
import { RoomModal } from './modals/RoomModal';
import { RoomTypeModal } from './modals/RoomTypeModal';
import { VisitPackageModal } from './modals/VisitPackageModal';
import { BookingsSection } from './sections/BookingsSection';
import { OverviewSection } from './sections/OverviewSection';
import { RoomTypesSection } from './sections/RoomTypesSection';
import { RoomsSection } from './sections/RoomsSection';
import { VisitPackagesSection } from './sections/VisitPackagesSection';
import { type Booking, type BookingStatus, type Room, type RoomType, type Section, type VisitPackage } from './types';

export function AdminDashboard({ onExit }: { onExit: () => void }) {
  const [section, setSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [roomTypes, setRoomTypes] = useState<RoomType[]>(initialRoomTypes);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [visitPackages, setVisitPackages] = useState<VisitPackage[]>(initialVisitPackages);

  const [editingRoomType, setEditingRoomType] = useState<RoomType | null | undefined>(undefined);
  const [editingRoom, setEditingRoom] = useState<Room | null | undefined>(undefined);
  const [editingVisitPkg, setEditingVisitPkg] = useState<VisitPackage | null | undefined>(undefined);
  const [deletingRoomTypeId, setDeletingRoomTypeId] = useState<string | null>(null);
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);
  const [deletingVisitPkgId, setDeletingVisitPkgId] = useState<string | null>(null);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);

  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingTypeFilter, setBookingTypeFilter] = useState<'all' | 'stay' | 'day-visit'>('all');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>('all');

  const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.paidAmount, 0);
  const activeStays = bookings.filter(b => b.bookingType === 'stay' && b.status === 'checked-in').length;
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed').length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;

  const saveRoomType = (rt: RoomType) => {
    setRoomTypes(prev => prev.some(r => r.id === rt.id) ? prev.map(r => r.id === rt.id ? rt : r) : [...prev, rt]);
  };

  const deleteRoomType = (id: string) => {
    setRoomTypes(prev => prev.filter(r => r.id !== id));
    setRooms(prev => prev.filter(r => r.roomTypeId !== id));
  };

  const saveRoom = (room: Room) => {
    setRooms(prev => prev.some(r => r.id === room.id) ? prev.map(r => r.id === room.id ? room : r) : [...prev, room]);
  };

  const deleteRoom = (id: string) => setRooms(prev => prev.filter(r => r.id !== id));

  const saveVisitPackage = (pkg: VisitPackage) => {
    setVisitPackages(prev => prev.some(p => p.id === pkg.id) ? prev.map(p => p.id === pkg.id ? pkg : p) : [...prev, pkg]);
  };

  const deleteVisitPackage = (id: string) => setVisitPackages(prev => prev.filter(p => p.id !== id));

  const toggleVisitPackageActive = (id: string) =>
    setVisitPackages(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));

  const changeBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const filteredBookings = bookings.filter(b => {
    const matchSearch = b.guestName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.guestEmail.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchType = bookingTypeFilter === 'all' || b.bookingType === bookingTypeFilter;
    const matchStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const filteredRooms = rooms.filter(r => roomTypeFilter === 'all' || r.roomTypeId === roomTypeFilter);

  const navItems: { id: Section; label: string; icon: ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'room-types', label: 'Room Types', icon: <Building2 size={18} /> },
    { id: 'rooms', label: 'Rooms', icon: <BedDouble size={18} /> },
    { id: 'visit-packages', label: 'Visit Packages', icon: <Sun size={18} /> },
    { id: 'bookings', label: 'Bookings', icon: <CalendarCheck size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0d110d] text-white flex">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#111511] border-r border-white/5 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}
      >
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#4a8f3f] rounded-lg flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Sumiran Resort</p>
              <p className="text-stone-500 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all
                ${section === item.id
                  ? 'bg-[#4a8f3f]/20 text-[#7bc67a] border border-[#4a8f3f]/30'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {item.icon}
              {item.label}
              {item.id === 'bookings' && (
                <span className="ml-auto bg-[#4a8f3f] text-white text-xs px-1.5 py-0.5 rounded-full">{bookings.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={onExit}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronRight size={18} className="rotate-180" />
            Back to Site
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-[#111511] border-b border-white/5 px-4 sm:px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-stone-400 hover:text-white">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-white text-base">
                {navItems.find(n => n.id === section)?.label}
              </h1>
              <p className="text-stone-500 text-xs hidden sm:block">Sumiran Resort Management System</p>
            </div>
          </div>
          <div className="text-stone-500 text-xs hidden sm:block">March 3, 2026</div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {section === 'overview' && (
            <OverviewSection
              totalRevenue={totalRevenue}
              activeStays={activeStays}
              upcomingBookings={upcomingBookings}
              availableRooms={availableRooms}
              bookings={bookings}
              roomTypes={roomTypes}
              rooms={rooms}
              visitPackages={visitPackages}
              onNavigate={setSection}
            />
          )}

          {section === 'room-types' && (
            <RoomTypesSection
              roomTypes={roomTypes}
              rooms={rooms}
              onAddRoomType={() => setEditingRoomType(null)}
              onEditRoomType={setEditingRoomType}
              onDeleteRoomType={setDeletingRoomTypeId}
            />
          )}

          {section === 'rooms' && (
            <RoomsSection
              roomTypes={roomTypes}
              rooms={rooms}
              filteredRooms={filteredRooms}
              roomTypeFilter={roomTypeFilter}
              onRoomTypeFilterChange={setRoomTypeFilter}
              onAddRoom={() => setEditingRoom(null)}
              onEditRoom={setEditingRoom}
              onDeleteRoom={setDeletingRoomId}
            />
          )}

          {section === 'visit-packages' && (
            <VisitPackagesSection
              visitPackages={visitPackages}
              onAddPackage={() => setEditingVisitPkg(null)}
              onEditPackage={setEditingVisitPkg}
              onDeletePackage={setDeletingVisitPkgId}
              onToggleActive={toggleVisitPackageActive}
            />
          )}

          {section === 'bookings' && (
            <BookingsSection
              bookings={filteredBookings}
              roomTypes={roomTypes}
              rooms={rooms}
              bookingSearch={bookingSearch}
              bookingTypeFilter={bookingTypeFilter}
              bookingStatusFilter={bookingStatusFilter}
              onBookingSearchChange={setBookingSearch}
              onBookingTypeFilterChange={setBookingTypeFilter}
              onBookingStatusFilterChange={setBookingStatusFilter}
              onViewBooking={setViewingBooking}
            />
          )}
        </main>
      </div>

      {editingRoomType !== undefined && (
        <RoomTypeModal
          roomType={editingRoomType}
          onClose={() => setEditingRoomType(undefined)}
          onSave={saveRoomType}
        />
      )}

      {editingRoom !== undefined && (
        <RoomModal
          room={editingRoom}
          roomTypes={roomTypes}
          onClose={() => setEditingRoom(undefined)}
          onSave={saveRoom}
        />
      )}

      {deletingRoomTypeId && (
        <DeleteConfirm
          label={roomTypes.find(r => r.id === deletingRoomTypeId)?.name ?? 'Room Type'}
          onConfirm={() => { deleteRoomType(deletingRoomTypeId); setDeletingRoomTypeId(null); }}
          onCancel={() => setDeletingRoomTypeId(null)}
        />
      )}

      {deletingRoomId && (
        <DeleteConfirm
          label={`Room #${rooms.find(r => r.id === deletingRoomId)?.roomNumber}`}
          onConfirm={() => { deleteRoom(deletingRoomId); setDeletingRoomId(null); }}
          onCancel={() => setDeletingRoomId(null)}
        />
      )}

      {editingVisitPkg !== undefined && (
        <VisitPackageModal
          pkg={editingVisitPkg}
          onClose={() => setEditingVisitPkg(undefined)}
          onSave={saveVisitPackage}
        />
      )}

      {deletingVisitPkgId && (
        <DeleteConfirm
          label={visitPackages.find(p => p.id === deletingVisitPkgId)?.name ?? 'Visit Package'}
          onConfirm={() => { deleteVisitPackage(deletingVisitPkgId); setDeletingVisitPkgId(null); }}
          onCancel={() => setDeletingVisitPkgId(null)}
        />
      )}

      {viewingBooking && (
        <BookingDetailModal
          booking={viewingBooking}
          roomTypes={roomTypes}
          rooms={rooms}
          onClose={() => setViewingBooking(null)}
          onStatusChange={changeBookingStatus}
        />
      )}
    </div>
  );
}

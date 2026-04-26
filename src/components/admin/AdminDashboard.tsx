'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { BedDouble, Building2, CalendarCheck, ChevronRight, LayoutDashboard, Leaf, Menu, Sun } from 'lucide-react';
import { BookingDetailModal } from './modals/BookingDetailModal';
import { DeleteConfirm } from './modals/DeleteConfirm';
import { ActivityModal } from './modals/ActivityModal';
import { MealPlanModal } from './modals/MealPlanModal';
import { RoomModal } from './modals/RoomModal';
import { RoomTypeModal } from './modals/RoomTypeModal';
import { VisitPackageModal } from './modals/VisitPackageModal';
import { ActivitiesSection } from './sections/ActivitiesSection';
import { MealPlansSection } from './sections/MealPlansSection';
import { BookingsSection } from './sections/BookingsSection';
import { OverviewSection } from './sections/OverviewSection';
import { RoomTypesSection } from './sections/RoomTypesSection';
import { RoomsSection } from './sections/RoomsSection';
import { VisitPackagesSection } from './sections/VisitPackagesSection';
import { type Activity, type Booking, type BookingStatus, type MealPlan, type Room, type RoomType, type Section, type VisitPackage } from './types';
import { notifyError, notifySuccess } from '@/lib/client-notify';

type ApiResponse<T> = { data: T; meta?: { total: number; page: number; pageSize: number } };

type RoomTypeApi = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  maxOccupancy: number;
  baseOccupancy: number;
  extraPersonPrice: number;
  amenities: string[];
  totalRooms: number;
  isSingleOccupancy?: boolean;
};

type RoomApi = {
  id: string;
  roomTypeId: string;
  roomNo?: string;
  roomNumber?: string;
  floor: number;
  status: 'available' | 'occupied' | 'maintenance';
  view: string;
};

type VisitPackageApi = {
  id: string;
  name: string;
  packageType?: string;
  description: string;
  duration: number;
  maxActivity: number;
  basePrice: number;
  maxGroupSize: number;
  status: 'ACTIVE' | 'INACTIVE';
  timing?: string | null;
  includes?: string[];
};

type BookingApi = {
  bookingId: string;
  type: 'STAY' | 'VISIT';
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'REFUNDED' | 'FAILED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  roomId?: string | null;
  roomTypeId?: string | null;
  checkIn?: string | null;
  checkOut?: string | null;
  visitDate?: string | null;
  guests?: number;
  totalAmount: number;
  specialRequest?: string | null;
  activities?: Array<{ id: string; name: string }>;
  createdAt: string;
};

type ActivityApi = {
  id: string;
  name: string;
  duration: number;
  price: number;
  status: 'ACTIVE' | 'INACTIVE';
};

type MealPlanApi = {
  id: string;
  name: string;
  description?: string | null;
  pricePerPerson: number;
  isActive: boolean;
};

function mapPackageType(type?: string): 'half-day' | 'full-day' | 'short-visit' {
  if (type === 'FULL_DAY') return 'full-day';
  if (type === 'HALF_DAY') return 'half-day';
  return 'short-visit';
}

function mapBookingStatus(status: BookingApi['status']): BookingStatus {
  if (status === 'CONFIRMED') return 'confirmed';
  if (status === 'PENDING') return 'pending';
  if (status === 'COMPLETED') return 'completed';
  return 'cancelled';
}

function toApiBookingStatus(status: BookingStatus): BookingApi['status'] {
  if (status === 'confirmed' || status === 'checked-in') return 'CONFIRMED';
  if (status === 'completed') return 'COMPLETED';
  if (status === 'pending') return 'PENDING';
  return 'CANCELLED';
}

function mapPaymentStatus(status: BookingApi['paymentStatus']): Booking['paymentStatus'] {
  if (status === 'PAID') return 'paid';
  if (status === 'REFUNDED') return 'refunded';
  return 'unpaid';
}

export function AdminDashboard({ onExit }: { onExit: () => void }) {
  const [section, setSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [visitPackages, setVisitPackages] = useState<VisitPackage[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingRoomType, setEditingRoomType] = useState<RoomType | null | undefined>(undefined);
  const [editingRoom, setEditingRoom] = useState<Room | null | undefined>(undefined);
  const [editingVisitPkg, setEditingVisitPkg] = useState<VisitPackage | null | undefined>(undefined);
  const [editingActivity, setEditingActivity] = useState<Activity | null | undefined>(undefined);
  const [editingMealPlan, setEditingMealPlan] = useState<MealPlan | null | undefined>(undefined);
  const [deletingRoomTypeId, setDeletingRoomTypeId] = useState<string | null>(null);
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);
  const [deletingVisitPkgId, setDeletingVisitPkgId] = useState<string | null>(null);
  const [deletingActivityId, setDeletingActivityId] = useState<string | null>(null);
  const [deletingMealPlanId, setDeletingMealPlanId] = useState<string | null>(null);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);

  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingTypeFilter, setBookingTypeFilter] = useState<'all' | 'stay' | 'day-visit'>('all');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>('all');

  const adminHeaders = useCallback(() => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const adminKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY;
    if (adminKey) headers['x-admin-key'] = adminKey;
    return headers;
  }, []);

  const fetchJson = useCallback(async <T,>(url: string, init?: RequestInit): Promise<T> => {
    const res = await fetch(url, {
      ...init,
      headers: {
        ...adminHeaders(),
        ...(init?.headers ?? {}),
      },
    });

    if (!res.ok) {
      let message = `Request failed (${res.status})`;
      try {
        const err = await res.json();
        message = err?.error?.message || message;
      } catch {
        // ignore json parse failure
      }
      throw new Error(message);
    }

    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  }, [adminHeaders]);

  const loadAdminData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [roomTypesRes, roomsRes, packagesRes, bookingsRes, activitiesRes, mealPlansRes] = await Promise.all([
        fetchJson<ApiResponse<RoomTypeApi[]>>('/api/admin/room-types'),
        fetchJson<ApiResponse<RoomApi[]>>('/api/admin/rooms'),
        fetchJson<ApiResponse<VisitPackageApi[]>>('/api/admin/packages'),
        fetchJson<ApiResponse<BookingApi[]>>('/api/admin/bookings?page=1&pageSize=200'),
        fetchJson<ApiResponse<ActivityApi[]>>('/api/admin/activities'),
        fetchJson<ApiResponse<MealPlanApi[]>>('/api/admin/meal-plans'),
      ]);

      setRoomTypes(
        roomTypesRes.data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          basePrice: Number(item.basePrice),
          maxOccupancy: Number(item.maxOccupancy),
          baseOccupancy: Number(item.baseOccupancy || item.maxOccupancy || 1),
          extraPersonPrice: Number(item.extraPersonPrice || 0),
          amenities: item.amenities || [],
          totalRooms: Number(item.totalRooms || 0),
          isSingleOccupancy: Boolean(item.isSingleOccupancy),
        }))
      );

      setRooms(
        roomsRes.data.map((item) => ({
          id: item.id,
          roomTypeId: item.roomTypeId,
          roomNumber: String(item.roomNumber || item.roomNo || ''),
          floor: Number(item.floor || 0),
          status: item.status,
          view: item.view || '',
        }))
      );

      setVisitPackages(
        packagesRes.data.map((item) => ({
          id: item.id,
          name: item.name,
          type: mapPackageType(item.packageType),
          description: item.description || '',
          duration: `${item.duration} hours`,
          pricePerPerson: Number(item.basePrice),
          includedActivities: Number(item.maxActivity || 0),
          activities: [],
          includes: item.includes || [],
          maxGroupSize: Number(item.maxGroupSize || 1),
          isActive: item.status === 'ACTIVE',
          timing: item.timing || '',
        }))
      );

      setBookings(
        bookingsRes.data.map((item) => {
          const checkIn = item.checkIn ? new Date(item.checkIn) : null;
          const checkOut = item.checkOut ? new Date(item.checkOut) : null;
          const nights = checkIn && checkOut
            ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
            : undefined;

          return {
            id: item.bookingId,
            bookingType: item.type === 'STAY' ? 'stay' : 'day-visit',
            guestName: item.name || 'Guest',
            guestEmail: item.email || '-',
            guestPhone: item.phone || '-',
            guests: Number(item.guests || 1),
            status: mapBookingStatus(item.status),
            paymentStatus: mapPaymentStatus(item.paymentStatus),
            totalAmount: Number(item.totalAmount || 0),
            paidAmount: item.paymentStatus === 'PAID' ? Number(item.totalAmount || 0) : 0,
            createdAt: new Date(item.createdAt).toISOString().slice(0, 10),
            roomId: item.roomId || undefined,
            roomTypeId: item.roomTypeId || undefined,
            checkIn: item.checkIn ? new Date(item.checkIn).toISOString().slice(0, 10) : undefined,
            checkOut: item.checkOut ? new Date(item.checkOut).toISOString().slice(0, 10) : undefined,
            nights,
            visitDate: item.visitDate ? new Date(item.visitDate).toISOString().slice(0, 10) : undefined,
            visitType: 'half-day',
            activities: (item.activities || []).map((activity) => activity.name),
            specialRequests: item.specialRequest || undefined,
            paymentMethod: undefined,
          } as Booking;
        })
      );

      setActivities(
        activitiesRes.data.map((item) => ({
          id: item.id,
          name: item.name,
          duration: Number(item.duration),
          price: Number(item.price),
          status: item.status,
        }))
      );

      setMealPlans(
        mealPlansRes.data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || undefined,
          pricePerPerson: Number(item.pricePerPerson),
          isActive: item.isActive,
        }))
      );
    } catch (err) {
      const message = notifyError(err, 'Failed to load admin data');
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [fetchJson]);

  useEffect(() => {
    void loadAdminData();
  }, [loadAdminData]);

  const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.paidAmount, 0);
  const activeStays = bookings.filter(b => b.bookingType === 'stay' && b.status === 'checked-in').length;
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed').length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;

  const saveRoomType = async (rt: RoomType) => {
    const exists = roomTypes.some((item) => item.id === rt.id);
    const url = exists ? `/api/admin/room-types/${rt.id}` : '/api/admin/room-types';
    const method = exists ? 'PATCH' : 'POST';

    try {
      await fetchJson(url, {
        method,
        body: JSON.stringify({
          name: rt.name,
          description: rt.description,
          basePrice: rt.basePrice,
          maxCapacity: rt.maxOccupancy,
          baseOccupancy: rt.baseOccupancy,
          extraPersonPrice: rt.extraPersonPrice,
          amenities: rt.amenities,
          totalRooms: rt.totalRooms,
          isSingleOccupancy: rt.isSingleOccupancy,
        }),
      });

      await loadAdminData();
      notifySuccess(exists ? 'Room type updated' : 'Room type created');
    } catch (err) {
      const message = notifyError(err, 'Failed to save room type');
      setError(message);
    }
  };

  const deleteRoomType = async (id: string) => {
    try {
      await fetchJson(`/api/admin/room-types/${id}`, { method: 'DELETE' });
      await loadAdminData();
      notifySuccess('Room type deleted');
    } catch (err) {
      const message = notifyError(err, 'Failed to delete room type');
      setError(message);
    }
  };

  const saveRoom = async (room: Room) => {
    const exists = rooms.some((item) => item.id === room.id);
    const url = exists ? `/api/admin/rooms/${room.id}` : '/api/admin/rooms';
    const method = exists ? 'PATCH' : 'POST';

    try {
      await fetchJson(url, {
        method,
        body: JSON.stringify({
          roomNo: room.roomNumber,
          roomTypeId: room.roomTypeId,
          floor: room.floor,
          view: room.view,
          status: room.status,
        }),
      });

      await loadAdminData();
      notifySuccess(exists ? 'Room updated' : 'Room created');
    } catch (err) {
      const message = notifyError(err, 'Failed to save room');
      setError(message);
    }
  };

  const deleteRoom = async (id: string) => {
    try {
      await fetchJson(`/api/admin/rooms/${id}`, { method: 'DELETE' });
      await loadAdminData();
      notifySuccess('Room deleted');
    } catch (err) {
      const message = notifyError(err, 'Failed to delete room');
      setError(message);
    }
  };

  const saveVisitPackage = async (pkg: VisitPackage) => {
    const exists = visitPackages.some((item) => item.id === pkg.id);
    const url = exists ? `/api/admin/packages/${pkg.id}` : '/api/admin/packages';
    const method = exists ? 'PATCH' : 'POST';

    try {
      await fetchJson(url, {
        method,
        body: JSON.stringify({
          name: pkg.name,
          packageType: pkg.type,
          description: pkg.description,
          duration: Number(pkg.duration.replace(/[^\d.]/g, '') || 0),
          maxActivity: pkg.includedActivities,
          basePrice: pkg.pricePerPerson,
          maxGroupSize: pkg.maxGroupSize,
          status: pkg.isActive ? 'ACTIVE' : 'INACTIVE',
          timing: pkg.timing,
          includes: pkg.includes,
        }),
      });

      await loadAdminData();
      notifySuccess(exists ? 'Visit package updated' : 'Visit package created');
    } catch (err) {
      const message = notifyError(err, 'Failed to save visit package');
      setError(message);
    }
  };

  const deleteVisitPackage = async (id: string) => {
    try {
      await fetchJson(`/api/admin/packages/${id}`, { method: 'DELETE' });
      await loadAdminData();
      notifySuccess('Visit package deleted');
    } catch (err) {
      const message = notifyError(err, 'Failed to delete visit package');
      setError(message);
    }
  };

  const saveActivity = async (activity: Activity) => {
    const exists = activities.some((item) => item.id === activity.id);
    const url = exists ? `/api/admin/activities/${activity.id}` : '/api/admin/activities';
    const method = exists ? 'PATCH' : 'POST';

    try {
      await fetchJson(url, {
        method,
        body: JSON.stringify({
          name: activity.name,
          duration: activity.duration,
          price: activity.price,
          status: activity.status,
        }),
      });

      await loadAdminData();
      notifySuccess(exists ? 'Activity updated' : 'Activity created');
    } catch (err) {
      const message = notifyError(err, 'Failed to save activity');
      setError(message);
    }
  };

  const deleteActivity = async (id: string) => {
    try {
      await fetchJson(`/api/admin/activities/${id}`, { method: 'DELETE' });
      await loadAdminData();
      notifySuccess('Activity deleted');
    } catch (err) {
      const message = notifyError(err, 'Failed to delete activity');
      setError(message);
    }
  };

  const saveMealPlan = async (plan: MealPlan) => {
    const exists = mealPlans.some((item) => item.id === plan.id);
    const url = exists ? `/api/admin/meal-plans/${plan.id}` : '/api/admin/meal-plans';
    const method = exists ? 'PATCH' : 'POST';

    try {
      await fetchJson(url, {
        method,
        body: JSON.stringify({
          name: plan.name,
          description: plan.description,
          pricePerPerson: plan.pricePerPerson,
          isActive: plan.isActive,
        }),
      });

      await loadAdminData();
      notifySuccess(exists ? 'Meal plan updated' : 'Meal plan created');
    } catch (err) {
      const message = notifyError(err, 'Failed to save meal plan');
      setError(message);
    }
  };

  const deleteMealPlan = async (id: string) => {
    try {
      await fetchJson(`/api/admin/meal-plans/${id}`, { method: 'DELETE' });
      await loadAdminData();
      notifySuccess('Meal plan deleted');
    } catch (err) {
      const message = notifyError(err, 'Failed to delete meal plan');
      setError(message);
    }
  };

  const toggleVisitPackageActive = async (id: string) => {
    const pkg = visitPackages.find((item) => item.id === id);
    if (!pkg) return;
    try {
      await fetchJson(`/api/admin/packages/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: pkg.isActive ? 'INACTIVE' : 'ACTIVE',
        }),
      });
      await loadAdminData();
      notifySuccess(pkg.isActive ? 'Package disabled' : 'Package enabled');
    } catch (err) {
      const message = notifyError(err, 'Failed to update package status');
      setError(message);
    }
  };

  const changeBookingStatus = async (id: string, status: BookingStatus) => {
    try {
      await fetchJson(`/api/admin/bookings/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: toApiBookingStatus(status) }),
      });
      await loadAdminData();
      notifySuccess('Booking status updated');
    } catch (err) {
      const message = notifyError(err, 'Failed to update booking status');
      setError(message);
    }
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
    { id: 'meal-plans', label: 'Meal Plans', icon: <Sun size={18} /> },
    { id: 'activities', label: 'Activities', icon: <Leaf size={18} /> },
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
              <p className="text-white text-sm font-medium">Lend&apos;s End Resort</p>
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
              <p className="text-stone-500 text-xs hidden sm:block">Land&apos;s End Resort Management System</p>
            </div>
          </div>
          <div className="text-stone-500 text-xs hidden sm:block">March 3, 2026</div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {loading && (
            <div className="mb-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-300">
              Loading admin data...
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

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

          {section === 'meal-plans' && (
            <MealPlansSection
              mealPlans={mealPlans}
              onAddMealPlan={() => setEditingMealPlan(null)}
              onEditMealPlan={setEditingMealPlan}
              onDeleteMealPlan={setDeletingMealPlanId}
            />
          )}

          {section === 'activities' && (
            <ActivitiesSection
              activities={activities}
              onAddActivity={() => setEditingActivity(null)}
              onEditActivity={setEditingActivity}
              onDeleteActivity={setDeletingActivityId}
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
          onSave={(rt) => { void saveRoomType(rt); }}
        />
      )}

      {editingRoom !== undefined && (
        <RoomModal
          room={editingRoom}
          roomTypes={roomTypes}
          onClose={() => setEditingRoom(undefined)}
          onSave={(room) => { void saveRoom(room); }}
        />
      )}

      {deletingRoomTypeId && (
        <DeleteConfirm
          label={roomTypes.find(r => r.id === deletingRoomTypeId)?.name ?? 'Room Type'}
          onConfirm={() => { void deleteRoomType(deletingRoomTypeId); setDeletingRoomTypeId(null); }}
          onCancel={() => setDeletingRoomTypeId(null)}
        />
      )}

      {deletingRoomId && (
        <DeleteConfirm
          label={`Room #${rooms.find(r => r.id === deletingRoomId)?.roomNumber}`}
          onConfirm={() => { void deleteRoom(deletingRoomId); setDeletingRoomId(null); }}
          onCancel={() => setDeletingRoomId(null)}
        />
      )}

      {editingVisitPkg !== undefined && (
        <VisitPackageModal
          pkg={editingVisitPkg}
          onClose={() => setEditingVisitPkg(undefined)}
          onSave={(pkg) => { void saveVisitPackage(pkg); }}
        />
      )}

      {deletingVisitPkgId && (
        <DeleteConfirm
          label={visitPackages.find(p => p.id === deletingVisitPkgId)?.name ?? 'Visit Package'}
          onConfirm={() => { void deleteVisitPackage(deletingVisitPkgId); setDeletingVisitPkgId(null); }}
          onCancel={() => setDeletingVisitPkgId(null)}
        />
      )}

      {editingActivity !== undefined && (
        <ActivityModal
          activity={editingActivity}
          onClose={() => setEditingActivity(undefined)}
          onSave={(activity) => { void saveActivity(activity); }}
        />
      )}

      {editingMealPlan !== undefined && (
        <MealPlanModal
          mealPlan={editingMealPlan}
          onClose={() => setEditingMealPlan(undefined)}
          onSave={(plan) => { void saveMealPlan(plan); }}
        />
      )}

      {deletingActivityId && (
        <DeleteConfirm
          label={activities.find((activity) => activity.id === deletingActivityId)?.name ?? 'Activity'}
          onConfirm={() => { void deleteActivity(deletingActivityId); setDeletingActivityId(null); }}
          onCancel={() => setDeletingActivityId(null)}
        />
      )}

      {deletingMealPlanId && (
        <DeleteConfirm
          label={mealPlans.find((plan) => plan.id === deletingMealPlanId)?.name ?? 'Meal Plan'}
          onConfirm={() => { void deleteMealPlan(deletingMealPlanId); setDeletingMealPlanId(null); }}
          onCancel={() => setDeletingMealPlanId(null)}
        />
      )}

      {viewingBooking && (
        <BookingDetailModal
          booking={viewingBooking}
          roomTypes={roomTypes}
          rooms={rooms}
          onClose={() => setViewingBooking(null)}
          onStatusChange={(id, status) => { void changeBookingStatus(id, status); }}
        />
      )}
    </div>
  );
}

import { BookingStatus, PaymentStatus, Role } from '@prisma/client';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { RoomManager } from '@/components/admin/RoomManager';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== Role.ADMIN) {
    redirect('/auth/login');
  }

  const [bookings, rooms, revenueAgg, totalBookings, pendingCount, confirmedCount] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { room: true, user: true },
    }),
    prisma.room.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.booking.aggregate({ _sum: { totalAmount: true }, where: { paymentStatus: PaymentStatus.PAID } }),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: BookingStatus.PENDING } }),
    prisma.booking.count({ where: { status: BookingStatus.CONFIRMED } }),
  ]);

  const summary = {
    totalBookings,
    pending: pendingCount,
    confirmed: confirmedCount,
    revenue: revenueAgg._sum.totalAmount || 0,
    availableRooms: rooms.filter((r) => r.status === 'AVAILABLE').length,
  };

  const totalInventory = rooms.reduce((sum, room) => sum + room.totalInventory, 0) || 1;
  const occupiedCount = await prisma.booking.count({
    where: {
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] },
      checkIn: { lte: new Date() },
      checkOut: { gte: new Date() },
    },
  });
  const occupancy = Math.min(100, Math.round((occupiedCount / totalInventory) * 100));

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-700 uppercase tracking-wide">Operations</p>
            <h1 className="text-gray-900">Admin dashboard</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-600">Total bookings</p>
            <p className="text-2xl text-gray-900">{summary.totalBookings}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-600">Confirmed</p>
            <p className="text-2xl text-gray-900">{summary.confirmed}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl text-gray-900">{summary.pending}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-600">Collected</p>
            <p className="text-2xl text-gray-900">{currency.format(summary.revenue)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Recent bookings</h2>
              <span className="text-sm text-gray-500">Latest 20</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-gray-600">
                  <tr>
                    <th className="py-2">Guest</th>
                    <th className="py-2">Room</th>
                    <th className="py-2">Dates</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-gray-100">
                      <td className="py-2">{booking.user?.name || booking.user?.email}</td>
                      <td className="py-2">{booking.room?.name}</td>
                      <td className="py-2">
                        {new Date(booking.checkIn).toLocaleDateString('en-IN')} —{' '}
                        {new Date(booking.checkOut).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-2">{currency.format(booking.totalAmount)}</td>
                      <td className="py-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <RoomManager initialRooms={rooms} occupancy={occupancy} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

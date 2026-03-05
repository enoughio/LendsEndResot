'use client';

import { useRouter } from 'next/navigation';
import AdminDashboard from '../../components/admin-dashboard';

export default function AdminPage() {
  const router = useRouter();

  return <AdminDashboard onExit={() => router.push('/')} />;
}

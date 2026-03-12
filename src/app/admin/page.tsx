'use client';

import { useRouter } from 'next/navigation';
import AdminDashboard from '../../components/admin-dashboard';

export default function AdminPage() {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/');
  };

  return <AdminDashboard onExit={() => { void logout(); }} />;
}

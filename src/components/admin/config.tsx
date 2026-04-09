import { type ReactNode } from 'react';
import { CheckCircle2, Clock, Footprints, Sunrise, Sun, XCircle } from 'lucide-react';
import { type BookingStatus, type PaymentStatus, type Room, type VisitPackageCategory } from './types';

export const statusConfig: Record<BookingStatus, { label: string; color: string; icon: ReactNode }> = {
  confirmed: { label: 'Confirmed', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: <CheckCircle2 size={12} /> },
  pending: { label: 'Pending', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', icon: <Clock size={12} /> },
  'checked-in': { label: 'Checked In', color: 'text-sky-400 bg-sky-400/10 border-sky-400/20', icon: <CheckCircle2 size={12} /> },
  completed: { label: 'Completed', color: 'text-stone-400 bg-stone-400/10 border-stone-400/20', icon: <CheckCircle2 size={12} /> },
  cancelled: { label: 'Cancelled', color: 'text-red-400 bg-red-400/10 border-red-400/20', icon: <XCircle size={12} /> },
};

export const paymentConfig: Record<PaymentStatus, { label: string; color: string }> = {
  paid: { label: 'Paid', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  partial: { label: 'Partial', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  unpaid: { label: 'Unpaid', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
  refunded: { label: 'Refunded', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
};

export const roomStatusConfig: Record<Room['status'], { label: string; color: string }> = {
  available: { label: 'Available', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  occupied: { label: 'Occupied', color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
  maintenance: { label: 'Maintenance', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
};

export const visitPackageCategoryConfig: Record<VisitPackageCategory, { label: string; icon: ReactNode; color: string }> = {
  'short-visit': { label: 'Short Visit', icon: <Footprints size={14} />, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  'half-day': { label: 'Half Day', icon: <Sunrise size={14} />, color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
  'full-day': { label: 'Full Day', icon: <Sun size={14} />, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
};


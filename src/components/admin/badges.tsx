import { paymentConfig, roomStatusConfig, statusConfig } from './config';
import { type BookingStatus, type PaymentStatus, type Room } from './types';

export function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${cfg.color}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
}

export function PaymentBadge({ status }: { status: PaymentStatus }) {
  const cfg = paymentConfig[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

export function RoomStatusBadge({ status }: { status: Room['status'] }) {
  const cfg = roomStatusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

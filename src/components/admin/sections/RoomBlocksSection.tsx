'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarOff, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { DeleteConfirm } from '../modals/DeleteConfirm';
import { type Room, type RoomType } from '../types';
import { formatIndiaDate, todayIndiaInput } from '@/lib/india-date';
import { notifyError, notifySuccess } from '@/lib/client-notify';

type BlockReason = 'RETREAT' | 'GROUP_BOOKING' | 'MAINTENANCE';

type RoomBlockGroup = {
  id: string;
  roomId: string;
  roomNo: string;
  roomTypeName: string;
  dates: string[];
  reason: BlockReason;
  note: string | null;
  createdAt: string;
};

const REASONS: { value: BlockReason; label: string; color: string }[] = [
  { value: 'RETREAT', label: 'Retreat', color: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20' },
  { value: 'GROUP_BOOKING', label: 'Group booking', color: 'text-sky-300 bg-sky-400/10 border-sky-400/20' },
  { value: 'MAINTENANCE', label: 'Maintenance', color: 'text-amber-300 bg-amber-400/10 border-amber-400/20' },
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MAX_DATES = 92;

function adminHeaders() {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const adminKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY;
  if (adminKey) headers['x-admin-key'] = adminKey;
  return headers;
}

function dateKeyFromUtc(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function shiftDateKey(value: string, days: number) {
  const [year, month, day] = value.split('-').map(Number);
  return dateKeyFromUtc(new Date(Date.UTC(year, month - 1, day + days)));
}

function datesBetween(start: string, end: string) {
  const [from, to] = start <= end ? [start, end] : [end, start];
  const keys: string[] = [];
  let cursor = from;
  while (cursor <= to && keys.length <= MAX_DATES + 1) {
    keys.push(cursor);
    cursor = shiftDateKey(cursor, 1);
  }
  return keys;
}

function buildMonthCells(year: number, month: number) {
  const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: { key: string; inMonth: boolean }[] = [];
  for (let index = 0; index < firstWeekday; index += 1) {
    cells.push({
      key: dateKeyFromUtc(new Date(Date.UTC(year, month, 1 - (firstWeekday - index)))),
      inMonth: false,
    });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ key: dateKeyFromUtc(new Date(Date.UTC(year, month, day))), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ key: shiftDateKey(cells[cells.length - 1].key, 1), inMonth: false });
  }
  return cells;
}

function formatDay(value: string) {
  return formatIndiaDate(value, { day: 'numeric', month: 'short' });
}

function formatBlockDates(dates: string[]) {
  const sorted = [...dates].sort();
  const ranges: { start: string; end: string }[] = [];
  for (const date of sorted) {
    const last = ranges[ranges.length - 1];
    if (last && shiftDateKey(last.end, 1) === date) last.end = date;
    else ranges.push({ start: date, end: date });
  }
  return ranges
    .map((range) => (
      range.start === range.end
        ? formatIndiaDate(range.start, { day: 'numeric', month: 'short', year: 'numeric' })
        : `${formatDay(range.start)} – ${formatIndiaDate(range.end, { day: 'numeric', month: 'short', year: 'numeric' })}`
    ))
    .join(', ');
}

function reasonLabel(reason: BlockReason) {
  return REASONS.find((item) => item.value === reason)?.label ?? reason;
}

export function RoomBlocksSection({ rooms, roomTypes }: { rooms: Room[]; roomTypes: RoomType[] }) {
  const today = todayIndiaInput();
  const [cursor, setCursor] = useState(() => {
    const [year, month] = today.split('-').map(Number);
    return { year, month: month - 1 };
  });
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [anchorDate, setAnchorDate] = useState<string | null>(null);
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([]);
  const [roomQuery, setRoomQuery] = useState('');
  const [reason, setReason] = useState<BlockReason>('RETREAT');
  const [note, setNote] = useState('');
  const [blocks, setBlocks] = useState<RoomBlockGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPast, setShowPast] = useState(false);
  const [reasonFilter, setReasonFilter] = useState<BlockReason | 'all'>('all');
  const [deleting, setDeleting] = useState<RoomBlockGroup | null>(null);

  const loadBlocks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/room-blocks', { headers: adminHeaders() });
      const json = await response.json().catch(() => null);
      if (!response.ok) throw new Error(json?.error?.message || 'Unable to load room blocks.');
      setBlocks(Array.isArray(json?.data) ? json.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load room blocks.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBlocks();
  }, [loadBlocks]);

  const roomTypeName = useCallback(
    (roomTypeId: string) => roomTypes.find((roomType) => roomType.id === roomTypeId)?.name ?? 'Room',
    [roomTypes],
  );

  const sortedRooms = useMemo(
    () => [...rooms].sort((a, b) => a.roomNumber.localeCompare(b.roomNumber, undefined, { numeric: true })),
    [rooms],
  );

  const filteredRooms = useMemo(() => {
    const query = roomQuery.trim().toLowerCase();
    if (!query) return sortedRooms;
    return sortedRooms.filter((room) => {
      const label = `${room.roomNumber} ${roomTypeName(room.roomTypeId)} ${room.view}`.toLowerCase();
      return label.includes(query);
    });
  }, [roomQuery, roomTypeName, sortedRooms]);

  const selectedDateSet = useMemo(() => new Set(selectedDates), [selectedDates]);
  const blockedDateSet = useMemo(() => {
    const relevant = selectedRoomIds.length
      ? blocks.filter((block) => selectedRoomIds.includes(block.roomId))
      : blocks;
    return new Set(relevant.flatMap((block) => block.dates));
  }, [blocks, selectedRoomIds]);

  const monthCells = useMemo(
    () => buildMonthCells(cursor.year, cursor.month),
    [cursor.month, cursor.year],
  );

  const monthLabel = new Date(Date.UTC(cursor.year, cursor.month, 1)).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const visibleBlocks = blocks.filter((block) => {
    const matchesReason = reasonFilter === 'all' || block.reason === reasonFilter;
    const current = block.dates.some((date) => date >= today);
    return matchesReason && (showPast || current);
  });

  const selectedRoomLabels = sortedRooms
    .filter((room) => selectedRoomIds.includes(room.id))
    .map((room) => `#${room.roomNumber} ${roomTypeName(room.roomTypeId)}`);

  const mergeDates = (current: string[], keys: string[]) => {
    const next = new Set(current);
    let overflow = false;
    for (const key of keys) {
      if (next.has(key)) continue;
      if (next.size >= MAX_DATES) {
        overflow = true;
        break;
      }
      next.add(key);
    }
    return { dates: [...next].sort(), overflow };
  };

  const onDateClick = (key: string, shiftKey: boolean) => {
    if (shiftKey && anchorDate) {
      const merged = mergeDates(selectedDates, datesBetween(anchorDate, key));
      setSelectedDates(merged.dates);
      setAnchorDate(key);
      setError(merged.overflow ? `Select at most ${MAX_DATES} dates at a time.` : null);
      return;
    }
    setAnchorDate(key);
    if (selectedDateSet.has(key)) {
      setSelectedDates(selectedDates.filter((date) => date !== key));
      return;
    }
    if (selectedDates.length >= MAX_DATES) {
      setError(`Select at most ${MAX_DATES} dates at a time.`);
      return;
    }
    setError(null);
    setSelectedDates([...selectedDates, key].sort());
  };

  const toggleRoom = (roomId: string) => {
    setSelectedRoomIds((current) => (
      current.includes(roomId) ? current.filter((id) => id !== roomId) : [...current, roomId]
    ));
  };

  const selectShownRooms = () => {
    setSelectedRoomIds((current) => [...new Set([...current, ...filteredRooms.map((room) => room.id)])]);
  };

  const saveBlock = async () => {
    const knownIds = new Set(rooms.map((room) => room.id));
    const roomIds = selectedRoomIds.filter((id) => knownIds.has(id));
    if (selectedDates.length === 0 || roomIds.length === 0) {
      setError('Select at least one date and one room.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/room-blocks', {
        method: 'POST',
        headers: adminHeaders(),
        body: JSON.stringify({
          roomIds,
          dates: selectedDates,
          reason,
          note,
        }),
      });
      const json = await response.json().catch(() => null);
      if (!response.ok) throw new Error(json?.error?.message || 'Unable to block those rooms.');
      const created = Number(json?.data?.created || 0);
      const updated = Number(json?.data?.updated || 0);
      const summary = [
        created ? `${created} new night${created === 1 ? '' : 's'} blocked` : '',
        updated ? `${updated} existing night${updated === 1 ? '' : 's'} updated` : '',
      ].filter(Boolean).join('. ');
      notifySuccess(summary || 'Rooms blocked');
      setSelectedDates([]);
      setAnchorDate(null);
      setNote('');
      await loadBlocks();
    } catch (err) {
      const message = notifyError(err, 'Unable to block those rooms.');
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const removeBlock = async (block: RoomBlockGroup) => {
    setError(null);
    try {
      const response = await fetch(`/api/admin/room-blocks/${block.id}`, {
        method: 'DELETE',
        headers: adminHeaders(),
      });
      if (!response.ok && response.status !== 204) {
        const json = await response.json().catch(() => null);
        throw new Error(json?.error?.message || 'Unable to remove that block.');
      }
      setBlocks((current) => current.filter((item) => item.id !== block.id));
      setDeleting(null);
      notifySuccess(`Room #${block.roomNo} is open on those nights again`);
    } catch (err) {
      setDeleting(null);
      const message = notifyError(err, 'Unable to remove that block.');
      setError(message);
    }
  };

  const buttonLabel = saving
    ? 'Blocking rooms...'
    : selectedDates.length > 0 && selectedRoomIds.length > 0
      ? `Block ${selectedRoomIds.length} room${selectedRoomIds.length === 1 ? '' : 's'} · ${selectedDates.length} night${selectedDates.length === 1 ? '' : 's'}`
      : 'Block rooms';

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)]">
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 xl:col-span-2">{error}</p>
      )}
      <form
        className="space-y-5 rounded-2xl border border-white/5 bg-[#151a15] p-4 sm:p-5"
        onSubmit={(event) => {
          event.preventDefault();
          void saveBlock();
        }}
      >
        <div>
          <h2 className="text-white">Block rooms</h2>
          <p className="mt-1 text-sm leading-6 text-stone-400">
            Choose the nights and rooms to hold back for a retreat, a group booking, or maintenance. Guests cannot book a room when any night of the stay is blocked.
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-wider text-stone-500">Dates</p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setCursor((current) => (
                  current.month === 0 ? { year: current.year - 1, month: 11 } : { year: current.year, month: current.month - 1 }
                ))}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-white/5 hover:text-white"
              >
                <ChevronLeft size={16} />
              </button>
              <p className="min-w-32 text-center text-sm text-white">{monthLabel}</p>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setCursor((current) => (
                  current.month === 11 ? { year: current.year + 1, month: 0 } : { year: current.year, month: current.month + 1 }
                ))}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-white/5 hover:text-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-1 text-center text-[11px] uppercase tracking-wide text-stone-500">{day}</div>
            ))}
            {monthCells.map((cell) => {
              const selected = selectedDateSet.has(cell.key);
              const blocked = blockedDateSet.has(cell.key);
              const isToday = cell.key === today;
              return (
                <button
                  key={cell.key}
                  type="button"
                  aria-pressed={selected}
                  aria-label={`${formatIndiaDate(cell.key, { day: 'numeric', month: 'long', year: 'numeric' })}${selected ? ', selected' : ''}${blocked ? ', already blocked' : ''}`}
                  onClick={(event) => onDateClick(cell.key, event.shiftKey)}
                  className={`relative aspect-square rounded-lg text-sm transition-colors
                    ${selected ? 'bg-[#4a8f3f] text-white' : cell.inMonth ? 'text-stone-200 hover:bg-white/10' : 'text-stone-600 hover:bg-white/5'}
                    ${isToday && !selected ? 'ring-1 ring-[#7bc67a]/70' : ''}`}
                >
                  {Number(cell.key.slice(-2))}
                  {blocked && (
                    <span className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${selected ? 'bg-white' : 'bg-amber-400'}`} />
                  )}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-stone-500">Click to select individual nights. Shift-click to select a range. An amber dot means a room is already blocked.</p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-wider text-stone-500">Selected dates</p>
            {selectedDates.length > 0 && (
              <button
                type="button"
                onClick={() => { setSelectedDates([]); setAnchorDate(null); }}
                className="text-xs text-stone-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
          {selectedDates.length === 0 ? (
            <p className="rounded-xl border border-dashed border-white/10 px-3 py-3 text-sm text-stone-500">No dates selected yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedDates.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDates((current) => current.filter((item) => item !== date))}
                  className="rounded-full border border-[#4a8f3f]/40 bg-[#4a8f3f]/15 px-2.5 py-1 text-xs text-[#b7e0b4] hover:bg-[#4a8f3f]/25"
                >
                  {formatIndiaDate(date, { day: 'numeric', month: 'short', year: 'numeric' })} ×
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-wider text-stone-500">Rooms</p>
            <div className="flex gap-3 text-xs">
              <button type="button" onClick={selectShownRooms} className="text-[#7bc67a] hover:text-white">Select shown</button>
              <button type="button" onClick={() => setSelectedRoomIds([])} className="text-stone-400 hover:text-white">Clear</button>
            </div>
          </div>
          <input
            value={roomQuery}
            onChange={(event) => setRoomQuery(event.target.value)}
            placeholder="Search by room number or type"
            className="mb-2 w-full rounded-xl border border-white/10 bg-[#0d110d] px-3 py-2 text-sm text-stone-200 placeholder:text-stone-600 focus:border-[#4a8f3f] focus:outline-none"
          />
          <div className="max-h-56 space-y-1 overflow-y-auto rounded-xl border border-white/10 p-2">
            {filteredRooms.map((room) => {
              const checked = selectedRoomIds.includes(room.id);
              return (
                <label key={room.id} className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-white/5">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleRoom(room.id)}
                    className="mt-0.5 accent-[#4a8f3f]"
                  />
                  <span>
                    <span className="block text-sm text-white">#{room.roomNumber} · {roomTypeName(room.roomTypeId)}</span>
                    <span className="block text-xs text-stone-500">
                      {room.floor === 0 ? 'Ground floor' : `Floor ${room.floor}`}
                      {room.view ? ` · ${room.view}` : ''}
                    </span>
                  </span>
                </label>
              );
            })}
            {filteredRooms.length === 0 && <p className="px-2 py-4 text-center text-sm text-stone-500">No rooms match.</p>}
          </div>
          <p className="mt-2 text-xs text-stone-400">
            {selectedRoomLabels.length === 0
              ? 'No rooms selected.'
              : selectedRoomLabels.length <= 4
                ? selectedRoomLabels.join(', ')
                : `${selectedRoomLabels.slice(0, 4).join(', ')} and ${selectedRoomLabels.length - 4} more`}
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-wider text-stone-500">Reason</p>
          <div className="grid grid-cols-3 gap-2">
            {REASONS.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={reason === item.value}
                onClick={() => setReason(item.value)}
                className={`rounded-xl border px-2 py-2 text-sm transition-colors ${reason === item.value ? 'border-[#4a8f3f] bg-[#4a8f3f]/20 text-[#7bc67a]' : 'border-white/10 text-stone-400 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="room-block-note" className="mb-2 block text-xs uppercase tracking-wider text-stone-500">Note</label>
          <textarea
            id="room-block-note"
            value={note}
            maxLength={200}
            rows={2}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Optional. For example, which retreat or what is being repaired."
            className="w-full resize-none rounded-xl border border-white/10 bg-[#0d110d] px-3 py-2 text-sm text-stone-200 placeholder:text-stone-600 focus:border-[#4a8f3f] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving || selectedDates.length === 0 || selectedRoomIds.length === 0}
          className="w-full rounded-xl bg-[#4a8f3f] py-2.5 text-sm text-white transition-colors hover:bg-[#3d7a34] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {buttonLabel}
        </button>
        <p className="text-xs leading-5 text-stone-500">
          One save blocks every selected room on every selected night. A night that is already blocked is updated, not duplicated.
        </p>
      </form>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-white">Existing blocks</h2>
            <p className="mt-1 text-sm text-stone-400">
              {loading ? 'Loading blocks...' : `${visibleBlocks.length} block${visibleBlocks.length === 1 ? '' : 's'}`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={reasonFilter}
              onChange={(event) => setReasonFilter(event.target.value as BlockReason | 'all')}
              className="rounded-xl border border-white/10 bg-[#151a15] px-3 py-2 text-sm text-stone-300 focus:border-[#4a8f3f] focus:outline-none"
            >
              <option value="all">All reasons</option>
              {REASONS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
            <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#151a15] px-3 py-2 text-sm text-stone-300">
              <input type="checkbox" checked={showPast} onChange={(event) => setShowPast(event.target.checked)} className="accent-[#4a8f3f]" />
              Show past
            </label>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#151a15]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-stone-500">Room</th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-stone-500">Dates</th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-stone-500">Reason</th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-stone-500">Note</th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-stone-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleBlocks.map((block) => {
                  const style = REASONS.find((item) => item.value === block.reason);
                  return (
                    <tr key={block.id} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">#{block.roomNo}</p>
                        <p className="text-xs text-stone-500">{block.roomTypeName}</p>
                      </td>
                      <td className="max-w-xs px-4 py-3 text-stone-300">{formatBlockDates(block.dates)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${style?.color ?? ''}`}>
                          {reasonLabel(block.reason)}
                        </span>
                      </td>
                      <td className="max-w-[14rem] px-4 py-3 text-stone-400">
                        <span className="line-clamp-2">{block.note || '—'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setDeleting(block)}
                            className="rounded-lg p-1.5 text-stone-400 transition-all hover:bg-red-500/5 hover:text-red-400"
                            aria-label={`Remove block for room ${block.roomNo}`}
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
            {!loading && visibleBlocks.length === 0 && (
              <div className="px-4 py-12 text-center text-stone-500">
                <CalendarOff size={20} className="mx-auto mb-2 text-stone-600" />
                No room blocks yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {deleting && (
        <DeleteConfirm
          label={`the block on room #${deleting.roomNo}`}
          onConfirm={() => { void removeBlock(deleting); }}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}

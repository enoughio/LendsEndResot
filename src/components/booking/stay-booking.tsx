'use client'

// TODO : overfetching here in /api/booking

import { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, Users, ShieldCheck, CreditCard, PhoneCall, CircleQuestionMark, ChevronLeft, ChevronRight, X, Images } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { notifyError, notifyInfo, notifySuccess } from '@/lib/client-notify';
import { roomImages } from '@/lib/rooms-images';
import { CANCELLATION_POLICY } from '@/lib/house-rules';
import { calculateNights, formatIndiaDate, indiaDateKey, parseDate, todayIndiaInput } from '@/lib/india-date';
import { ASK_ON_ARRIVAL_NOTE, CHECK_IN_LABEL, CHECK_OUT_LABEL, RESORT_EMAIL, RESORT_PHONE_DISPLAY, RESORT_PHONE_TEL, STAY_ADDONS, STAY_INCLUSIONS } from '@/lib/resort-copy';
import { MEAL_TIERS, buildPriceBreakdown, mealTierLabel, nightlyRateForTier, quoteStay, stayOccupancyError, type MealTier } from '@/lib/stay-pricing';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface StayBookingProps {}

const DEFAULT_ROOM_IMAGE = '/gallery/default.jpeg';
const MAX_ROOMS = 20;

function getRoomImages(roomName: string) {
  const normalizedName = roomName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const roomKey = Object.keys(roomImages).find((key) => normalizedName.includes(key));
  return roomKey ? roomImages[roomKey] : [DEFAULT_ROOM_IMAGE];
}

function RoomImageGallery({ roomName, compact = false, onOpen }: { roomName: string; compact?: boolean; onOpen?: () => void }) {
  const images = getRoomImages(roomName);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const activeImage = images[activeIndex] || DEFAULT_ROOM_IMAGE;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => (index - 1 + images.length) % images.length);
      if (event.key === 'ArrowRight') setActiveIndex((index) => (index + 1) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onOpen?.();
          setIsOpen(true);
        }}
        className={`group relative shrink-0 overflow-hidden ${compact ? 'h-32 w-full' : 'h-28 w-36 sm:h-32 sm:w-40'}`}
        aria-label={`View photos of ${roomName}`}
      >
        <Image src={activeImage} alt={`${roomName} room`} fill sizes={compact ? '(max-width: 1024px) 100vw, 400px' : '160px'} className="object-cover transition-transform group-hover:scale-105" />
        <span className="absolute bottom-2 right-2 rounded-full bg-black/65 p-1.5 text-white">
          <Images className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${roomName} photos`}
          onClick={() => setIsOpen(false)}
        >
          <div className="relative flex max-h-[90vh] w-full max-w-5xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <Image src={activeImage} alt={`${roomName} room, image ${activeIndex + 1}`} width={1600} height={1000} className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain" />
            <button type="button" onClick={() => setIsOpen(false)} className="absolute right-2 top-2 rounded-full bg-black/65 p-2 text-white hover:bg-black/85" aria-label="Close room photos">
              <X className="h-5 w-5" />
            </button>
            {images.length > 1 && (
              <>
                <button type="button" onClick={() => setActiveIndex((index) => (index - 1 + images.length) % images.length)} className="absolute left-2 rounded-full bg-black/65 p-2 text-white hover:bg-black/85" aria-label="Previous room photo">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button type="button" onClick={() => setActiveIndex((index) => (index + 1) % images.length)} className="absolute right-2 rounded-full bg-black/65 p-2 text-white hover:bg-black/85" aria-label="Next room photo">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

type RoomTypeApi = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  breakfastOnlyPrice?: number;
  breakfastPlusMealPrice?: number;
  allMealsPrice?: number;
  maxOccupancy: number;
  baseOccupancy: number;
  extraPersonPrice: number;
  amenities: string[];
  totalRooms: number;
  isSingleOccupancy?: boolean;
  isDormRoom?: boolean;
};

type MealPlanApi = {
  id: string;
  name: string;
  description?: string | null;
  pricePerPerson: number;
  isActive: boolean;
};

type BookingCatalogResponse = {
  data: {
    rooms: RoomTypeApi[];
    mealPlans: MealPlanApi[];
  };
};

type AvailabilitySnapshot = {
  key: string;
  counts: Record<string, number>;
  failed: boolean;
};

type FittedParty = {
  roomsRequested: number;
  baseGuests: number;
  extraGuests: number;
  singleOccupancyGuests: number;
  dormGuests: number;
};

function openDatePicker(input: HTMLInputElement | null) {
  if (!input) return;
  input.focus();
  try {
    (input as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
  } catch {
    // The focused date input still accepts a date when showPicker is blocked.
  }
}

function shiftIndiaDate(value: string, days: number) {
  const parsed = parseDate(value);
  if (!parsed) return todayIndiaInput();
  const [year, month, day] = indiaDateKey(parsed).split('-').map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  const nextYear = shifted.getUTCFullYear();
  const nextMonth = String(shifted.getUTCMonth() + 1).padStart(2, '0');
  const nextDay = String(shifted.getUTCDate()).padStart(2, '0');
  return `${nextYear}-${nextMonth}-${nextDay}`;
}

function stayRangeIsValid(checkIn: string, checkOut: string) {
  const start = parseDate(checkIn);
  const end = parseDate(checkOut);
  if (!start || !end) return false;
  return indiaDateKey(end) > indiaDateKey(start);
}

function planMatchesTier(name: string, tier: MealTier) {
  const value = name.trim().toLowerCase();
  if (tier === 'all-meals') return value.includes('all meal');
  if (tier === 'breakfast-plus-one') {
    return value.includes('one meal') || value.includes('breakfast +') || value.includes('breakfast plus') || value.includes('+ one');
  }
  return value.includes('breakfast') && !value.includes('one meal') && !value.includes('all meal') && !value.includes('+');
}

function mealPlanIdForTier(plans: MealPlanApi[], tier: MealTier) {
  const label = mealTierLabel(tier).toLowerCase();
  return (
    plans.find((plan) => plan.name.trim().toLowerCase() === label)?.id ??
    plans.find((plan) => planMatchesTier(plan.name, tier))?.id ??
    null
  );
}

// Meal prices are nested packages, so checkout keeps the fullest one still selected.
function fullestMealTier(tiers: readonly MealTier[]): MealTier | null {
  for (let index = MEAL_TIERS.length - 1; index >= 0; index -= 1) {
    const tier = MEAL_TIERS[index].id;
    if (tiers.includes(tier)) return tier;
  }
  return null;
}

function fitPartyToRoom(room: RoomTypeApi, people: number): FittedParty {
  const party = Math.max(1, people);
  if (room.isDormRoom) {
    const cap = Math.max(1, room.maxOccupancy || 1);
    return {
      roomsRequested: 1,
      baseGuests: 1,
      extraGuests: 0,
      singleOccupancyGuests: 1,
      dormGuests: Math.min(party, cap),
    };
  }
  if (room.isSingleOccupancy) {
    return {
      roomsRequested: 1,
      baseGuests: 1,
      extraGuests: 0,
      singleOccupancyGuests: Math.min(party, MAX_ROOMS),
      dormGuests: 1,
    };
  }
  const baseOccupancy = Math.max(1, room.baseOccupancy || 1);
  const maxOccupancy = Math.max(baseOccupancy, room.maxOccupancy || baseOccupancy);
  const roomsRequested = Math.min(MAX_ROOMS, Math.max(1, Math.ceil(party / maxOccupancy)));
  const included = baseOccupancy * roomsRequested;
  const capped = Math.min(party, maxOccupancy * roomsRequested);
  const baseGuests = Math.min(capped, included);
  const extraGuests = baseGuests >= included ? Math.max(0, capped - included) : 0;
  return {
    roomsRequested,
    baseGuests,
    extraGuests,
    singleOccupancyGuests: 1,
    dormGuests: 1,
  };
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === 'AbortError';
}

async function checkRoomAvailability(roomId: string, checkIn: string, checkOut: string, signal: AbortSignal) {
  try {
    const response = await fetch('/api/availability/stay', {
      method: 'POST',
      signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomTypeId: roomId,
        checkIn,
        checkOut,
        guests: 1,
        roomsRequested: 1,
        mealPlanName: mealTierLabel('breakfast-only'),
      }),
    });
    const json = (await response.json().catch(() => null)) as { data?: { availableCount?: unknown } } | null;
    const availableCount = Number(json?.data?.availableCount);
    if ((response.ok || response.status === 409) && Number.isFinite(availableCount)) {
      return { id: roomId, ok: true as const, count: availableCount };
    }
    return { id: roomId, ok: false as const, count: 0 };
  } catch (error) {
    if (signal.aborted || isAbortError(error)) throw error;
    return { id: roomId, ok: false as const, count: 0 };
  }
}

function CountControl({
  valueLabel,
  onDecrease,
  onIncrease,
  decreaseDisabled,
  increaseDisabled,
  decreaseLabel,
  increaseLabel,
}: {
  valueLabel: string;
  onDecrease: () => void;
  onIncrease: () => void;
  decreaseDisabled?: boolean;
  increaseDisabled?: boolean;
  decreaseLabel: string;
  increaseLabel: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrease}
        disabled={decreaseDisabled}
        aria-label={decreaseLabel}
        className="h-9 w-9 shrink-0 border border-[#cbbfa8] text-lg leading-none text-stone-800 hover:border-[#1f3d2e] disabled:opacity-40"
      >
        -
      </button>
      <div className="min-w-0 flex-1 border border-[#e4d7c3] bg-white px-2 py-1.5 text-center text-sm text-stone-800">{valueLabel}</div>
      <button
        type="button"
        onClick={onIncrease}
        disabled={increaseDisabled}
        aria-label={increaseLabel}
        className="h-9 w-9 shrink-0 border border-[#cbbfa8] text-lg leading-none text-stone-800 hover:border-[#1f3d2e] disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}

export function StayBooking({}: StayBookingProps) {
  const router = useRouter();
  const checkInInputRef = useRef<HTMLInputElement>(null);
  const checkOutInputRef = useRef<HTMLInputElement>(null);
  const guestIntentRef = useRef(1);
  const [roomTypes, setRoomTypes] = useState<RoomTypeApi[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlanApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [roomsRequested, setRoomsRequested] = useState(1);
  const [baseGuests, setBaseGuests] = useState(1);
  const [extraGuests, setExtraGuests] = useState(0);
  const [singleOccupancyGuests, setSingleOccupancyGuests] = useState(1);
  const [selectedMeals, setSelectedMeals] = useState<MealTier[]>([]);
  const [dormGuests, setDormGuests] = useState(1);
  const [desiredGuests, setDesiredGuests] = useState(1);
  const [showGuestInfo, setShowGuestInfo] = useState(false);
  const [availability, setAvailability] = useState<AvailabilitySnapshot | null>(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [availabilityAttempt, setAvailabilityAttempt] = useState(0);

  const handleBack = () => {
    router.push('/booking');
  };

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/bookings');
        if (!res.ok) throw new Error('Failed to load booking data');
        const json = (await res.json()) as BookingCatalogResponse;
        setRoomTypes(json.data.rooms || []);
        setMealPlans(json.data.mealPlans || []);
      } catch (err) {
        const message = notifyError(err, 'Failed to load booking data');
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    void loadCatalog();
  }, []);

  const selectedRoomData = roomTypes.find((room) => room.id === selectedRoom);
  const isDorm = Boolean(selectedRoomData?.isDormRoom);
  const isSingleOccupancy = Boolean(selectedRoomData?.isSingleOccupancy) && !isDorm;
  const baseOccupancy = selectedRoomData?.baseOccupancy || 1;
  const maxOccupancy = selectedRoomData?.maxOccupancy || baseOccupancy;
  const effectiveRoomsRequested = isSingleOccupancy ? singleOccupancyGuests : Math.min(Math.max(1, roomsRequested), MAX_ROOMS);
  const includedBaseGuests = baseOccupancy * effectiveRoomsRequested;
  const maxGuestsForRooms = maxOccupancy * effectiveRoomsRequested;
  const maxExtraGuests = Math.max(0, maxGuestsForRooms - includedBaseGuests);
  const effectiveBaseGuests = Math.min(Math.max(1, baseGuests), includedBaseGuests);
  const totalGuests = isDorm ? dormGuests : isSingleOccupancy ? singleOccupancyGuests : effectiveBaseGuests + extraGuests;
  guestIntentRef.current = selectedRoom ? totalGuests : desiredGuests;

  const datesReady = stayRangeIsValid(checkInDate, checkOutDate);
  const dateKey = `${checkInDate}|${checkOutDate}`;
  const parsedCheckIn = parseDate(checkInDate);
  const parsedCheckOut = parseDate(checkOutDate);
  const nights = datesReady && parsedCheckIn && parsedCheckOut ? calculateNights(parsedCheckIn, parsedCheckOut) : 0;
  const roomsNeeded = isDorm ? 1 : isSingleOccupancy ? totalGuests : effectiveRoomsRequested;
  const availabilitySettled = Boolean(availability && availability.key === dateKey && !availabilityLoading);
  const selectedAvailableCount = availabilitySettled && selectedRoom ? (availability?.counts[selectedRoom] ?? 0) : 0;
  const roomStillOffered = Boolean(availabilitySettled && selectedRoom && !availability?.failed && selectedAvailableCount > 0);
  const showPricedSummary = Boolean(selectedRoomData && datesReady && (roomStillOffered || !availabilitySettled));

  useEffect(() => {
    if (!datesReady) {
      setAvailability(null);
      setAvailabilityError(null);
      setAvailabilityLoading(false);
      return;
    }
    if (loading) return;
    if (roomTypes.length === 0) {
      setAvailability({ key: dateKey, counts: {}, failed: false });
      setAvailabilityError(null);
      setAvailabilityLoading(false);
      return;
    }

    const controller = new AbortController();
    let ignore = false;
    setAvailabilityLoading(true);
    setAvailabilityError(null);

    void (async () => {
      try {
        const results = await Promise.all(
          roomTypes.map((room) => checkRoomAvailability(room.id, checkInDate, checkOutDate, controller.signal)),
        );
        if (ignore) return;
        const counts: Record<string, number> = {};
        let okCount = 0;
        for (const result of results) {
          if (result.ok) {
            counts[result.id] = result.count;
            okCount += 1;
          }
        }
        setAvailability({ key: dateKey, counts, failed: okCount === 0 });
        setAvailabilityError(okCount === 0 ? "We couldn't check availability for these dates. Try again in a moment." : null);
      } catch (error) {
        if (ignore || isAbortError(error)) return;
        setAvailability({ key: dateKey, counts: {}, failed: true });
        setAvailabilityError("We couldn't check availability for these dates. Try again in a moment.");
      } finally {
        if (!ignore) setAvailabilityLoading(false);
      }
    })();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [checkInDate, checkOutDate, dateKey, datesReady, loading, roomTypes, availabilityAttempt]);

  useEffect(() => {
    if (!selectedRoom || !datesReady || availabilityLoading) return;
    if (!availability || availability.key !== dateKey) return;
    const count = availability.counts[selectedRoom] ?? 0;
    if (count <= 0 || availability.failed) {
      setDesiredGuests(totalGuests);
      setSelectedMeals([]);
      setSelectedRoom(null);
    }
  }, [availability, availabilityLoading, dateKey, datesReady, selectedRoom, totalGuests]);

  useEffect(() => {
    if (isSingleOccupancy) {
      setExtraGuests(0);
      setBaseGuests(1);
    }
  }, [isSingleOccupancy]);

  useEffect(() => {
    if (!isSingleOccupancy) {
      setRoomsRequested((prev) => Math.min(Math.max(1, prev), MAX_ROOMS));
      setBaseGuests((prev) => Math.min(Math.max(1, prev), includedBaseGuests));
    }
  }, [isSingleOccupancy, includedBaseGuests]);

  useEffect(() => {
    if (effectiveBaseGuests < includedBaseGuests && extraGuests > 0) {
      setExtraGuests(0);
    }
  }, [effectiveBaseGuests, includedBaseGuests, extraGuests]);

  const availableRooms = useMemo(() => {
    if (!availabilitySettled || !availability || availability.failed) return [];
    return [...roomTypes]
      .filter((room) => (availability.counts[room.id] ?? 0) > 0)
      .sort((firstRoom, secondRoom) => secondRoom.basePrice - firstRoom.basePrice);
  }, [availability, availabilitySettled, roomTypes]);

  const selectedTier = useMemo(() => fullestMealTier(selectedMeals), [selectedMeals]);
  const selectedMealPlanId = useMemo(
    () => (selectedTier ? mealPlanIdForTier(mealPlans, selectedTier) : null),
    [mealPlans, selectedTier],
  );
  const quote = selectedRoomData && nights && selectedTier
    ? quoteStay({
        room: selectedRoomData,
        tier: selectedTier,
        guests: totalGuests,
        roomsRequested: roomsNeeded,
        nights,
      })
    : null;
  const basePrice = quote?.quotedRoomAmount || 0;
  const extraGuestAmount = quote?.quotedExtraGuestAmount || 0;
  const grandTotal = quote?.totalAmount || 0;
  const occupancyError = selectedRoomData
    ? stayOccupancyError(
        { ...selectedRoomData, capacity: selectedRoomData.maxOccupancy },
        totalGuests,
        roomsNeeded,
      )
    : null;
  const needsMoreRooms = roomStillOffered && roomsNeeded > selectedAvailableCount;
  const canContinue = Boolean(roomStillOffered && selectedTier && !occupancyError && !needsMoreRooms && !submitting);
  const roomSkeletons = [1, 2, 3];
  const checkOutMin = checkInDate ? shiftIndiaDate(checkInDate, 1) : todayIndiaInput();

  const chooseStay = (room: RoomTypeApi, tier: MealTier) => {
    if (selectedRoom !== room.id) {
      const fitted = fitPartyToRoom(room, guestIntentRef.current);
      setRoomsRequested(fitted.roomsRequested);
      setBaseGuests(fitted.baseGuests);
      setExtraGuests(fitted.extraGuests);
      setSingleOccupancyGuests(fitted.singleOccupancyGuests);
      setDormGuests(fitted.dormGuests);
    }
    setSelectedMeals([tier]);
    setSelectedRoom(room.id);
  };

  const selectRoom = (room: RoomTypeApi) => {
    if (selectedRoom === room.id) return;
    chooseStay(room, 'all-meals');
  };

  const handleConfirmBooking = async () => {
    if (!datesReady) {
      notifyInfo('Choose a check-out date after check-in.');
      return;
    }
    if (!selectedRoom || !roomStillOffered) {
      notifyInfo('Select a room that is free for these dates.');
      return;
    }
    if (!selectedTier) {
      notifyInfo('Choose at least one meal option.');
      return;
    }
    if (occupancyError) {
      notifyInfo(occupancyError);
      return;
    }
    if (needsMoreRooms) {
      notifyInfo(`Only ${selectedAvailableCount} ${selectedAvailableCount === 1 ? 'room is' : 'rooms are'} left for those dates.`);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const createRes = await fetch('/api/bookings/stay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomTypeId: selectedRoom,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          guests: totalGuests,
          roomsRequested: roomsNeeded,
          mealPlanId: selectedMealPlanId,
          mealPlanName: mealTierLabel(selectedTier),
        }),
      });
      const createJson = await createRes.json();

      if (!createRes.ok) {
        throw new Error(createJson?.error?.message || 'Failed to create booking');
      }

      const bookingId = createJson?.data?.bookingId;
      notifySuccess('Stay booking created', 'Redirecting you to details and payment.');
      router.push(`/booking/${bookingId}/bill`);
    } catch (err) {
      const message = notifyError(err, 'Failed to confirm booking');
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const ruleNote = !selectedRoomData
    ? 'Dorms are priced per person. A private room rate includes its base occupancy, and further guests use the extra-person rate.'
    : isDorm
      ? 'Every guest is charged the nightly dorm rate.'
      : isSingleOccupancy
        ? 'Each guest books a separate room.'
        : `The rate includes ${baseOccupancy} ${baseOccupancy === 1 ? 'guest' : 'guests'} per room. An extra person is ₹${(selectedRoomData.extraPersonPrice || 0).toLocaleString('en-IN')} per night, with all meals.`;

  const guestHeading = !selectedRoomData ? 'Guests' : isDorm ? 'Guests' : isSingleOccupancy ? 'Rooms' : 'Guests';

  return (
    <div className="min-h-screen bg-[#f6f1e6] px-4 pb-20 pt-24 text-stone-800 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <button type="button" onClick={handleBack} className="text-sm text-stone-600 underline decoration-stone-400 underline-offset-4 hover:text-[#1f3d2e]">
          Back to booking
        </button>
        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6d5a38]">Land&apos;s End · The Last Resort</p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#1f3d2e] sm:text-5xl">Stay at Sumiran</h1>
          <p className="mt-4 text-base leading-7 text-stone-700">Choose your dates and guests, then a room and the meal price that suits you.</p>
        </header>
        <figure className="relative mt-8 aspect-video overflow-hidden">
          <Image
            src="/gallery/building.jpeg"
            alt="Land's End in Sumiran Forest"
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover object-[center_38%]"
          />
        </figure>

        <section className="mt-8" aria-labelledby="stay-dates-heading">
          <h2 id="stay-dates-heading" className="font-serif text-3xl font-medium text-[#1f3d2e]">Dates and guests</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">Check-in, check-out, and who is coming, in one booking bar.</p>
          <div className="mt-4 border border-[#e4d7c3] bg-[#fffdf8]">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.25fr)]">
              <div
                className="cursor-pointer border-b border-[#e4d7c3] px-4 py-4 sm:px-5 md:border-b-0 md:border-r"
                onClick={() => openDatePicker(checkInInputRef.current)}
              >
                <label htmlFor="stay-check-in" className="block">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6d5a38]">Check-in</span>
                    <Calendar className="h-4 w-4 text-[#1f3d2e]" aria-hidden="true" />
                  </span>
                  <input
                    ref={checkInInputRef}
                    id="stay-check-in"
                    type="date"
                    value={checkInDate}
                    min={todayIndiaInput()}
                    onChange={(event) => setCheckInDate(event.target.value)}
                    onClick={(event) => {
                      event.stopPropagation();
                      openDatePicker(checkInInputRef.current);
                    }}
                    className="mt-2 w-full cursor-pointer bg-transparent font-serif text-lg text-[#1f3d2e] outline-none [color-scheme:light]"
                  />
                </label>
              </div>

              <div
                className="cursor-pointer border-b border-[#e4d7c3] px-4 py-4 sm:px-5 md:border-b-0 md:border-r"
                onClick={() => openDatePicker(checkOutInputRef.current)}
              >
                <label htmlFor="stay-check-out" className="block">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6d5a38]">Check-out</span>
                    <Calendar className="h-4 w-4 text-[#1f3d2e]" aria-hidden="true" />
                  </span>
                  <input
                    ref={checkOutInputRef}
                    id="stay-check-out"
                    type="date"
                    value={checkOutDate}
                    min={checkOutMin}
                    onChange={(event) => setCheckOutDate(event.target.value)}
                    onClick={(event) => {
                      event.stopPropagation();
                      openDatePicker(checkOutInputRef.current);
                    }}
                    className="mt-2 w-full cursor-pointer bg-transparent font-serif text-lg text-[#1f3d2e] outline-none [color-scheme:light]"
                  />
                </label>
              </div>

              <div className="px-4 py-4 sm:px-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6d5a38]">{guestHeading}</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowGuestInfo((prev) => !prev)}
                      className="border border-[#e4d7c3] bg-[#fffdf8] p-1 text-[#6d5a38]"
                      aria-label="Booking info"
                      aria-expanded={showGuestInfo}
                      title="How room and guest pricing works"
                    >
                      <CircleQuestionMark className="h-5 w-5" />
                    </button>
                    <Users className="h-4 w-4 text-[#1f3d2e]" aria-hidden="true" />
                  </div>
                </div>

                {!selectedRoomData && (
                  <div className="mt-3">
                    <CountControl
                      valueLabel={`${desiredGuests} ${desiredGuests === 1 ? 'guest' : 'guests'}`}
                      onDecrease={() => setDesiredGuests((prev) => Math.max(1, prev - 1))}
                      onIncrease={() => setDesiredGuests((prev) => Math.min(MAX_ROOMS, prev + 1))}
                      decreaseDisabled={desiredGuests <= 1}
                      increaseDisabled={desiredGuests >= MAX_ROOMS}
                      decreaseLabel="Decrease guests"
                      increaseLabel="Increase guests"
                    />
                  </div>
                )}

                {selectedRoomData && isDorm && (
                  <div className="mt-3">
                    <CountControl
                      valueLabel={`${dormGuests} ${dormGuests === 1 ? 'guest' : 'guests'}`}
                      onDecrease={() => setDormGuests((prev) => Math.max(1, prev - 1))}
                      onIncrease={() => setDormGuests((prev) => Math.min(Math.max(1, maxOccupancy), prev + 1))}
                      decreaseDisabled={dormGuests <= 1}
                      increaseDisabled={dormGuests >= Math.max(1, maxOccupancy)}
                      decreaseLabel="Decrease guests"
                      increaseLabel="Increase guests"
                    />
                  </div>
                )}

                {selectedRoomData && isSingleOccupancy && (
                  <div className="mt-3">
                    <CountControl
                      valueLabel={`${singleOccupancyGuests} ${singleOccupancyGuests === 1 ? 'room' : 'rooms'}`}
                      onDecrease={() => setSingleOccupancyGuests((prev) => Math.max(1, prev - 1))}
                      onIncrease={() => setSingleOccupancyGuests((prev) => Math.min(MAX_ROOMS, prev + 1))}
                      decreaseDisabled={singleOccupancyGuests <= 1}
                      increaseDisabled={singleOccupancyGuests >= MAX_ROOMS}
                      decreaseLabel="Decrease rooms"
                      increaseLabel="Increase rooms"
                    />
                  </div>
                )}

                {selectedRoomData && !isDorm && !isSingleOccupancy && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-stone-600">Rooms</span>
                      <div className="w-40 shrink-0">
                        <CountControl
                          valueLabel={`${effectiveRoomsRequested} ${effectiveRoomsRequested === 1 ? 'room' : 'rooms'}`}
                          onDecrease={() => setRoomsRequested((prev) => Math.max(1, prev - 1))}
                          onIncrease={() => setRoomsRequested((prev) => Math.min(MAX_ROOMS, prev + 1))}
                          decreaseDisabled={effectiveRoomsRequested <= 1}
                          increaseDisabled={effectiveRoomsRequested >= MAX_ROOMS}
                          decreaseLabel="Decrease rooms"
                          increaseLabel="Increase rooms"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-stone-600">Guests</span>
                      <div className="w-40 shrink-0">
                        <CountControl
                          valueLabel={effectiveBaseGuests === 1 ? '1 guest' : `${effectiveBaseGuests} guests`}
                          onDecrease={() => setBaseGuests((prev) => Math.max(1, prev - 1))}
                          onIncrease={() => setBaseGuests((prev) => Math.min(includedBaseGuests, prev + 1))}
                          decreaseDisabled={effectiveBaseGuests <= 1}
                          increaseDisabled={effectiveBaseGuests >= includedBaseGuests}
                          decreaseLabel="Decrease guests"
                          increaseLabel="Increase guests"
                        />
                      </div>
                    </div>
                    {effectiveBaseGuests >= includedBaseGuests && maxExtraGuests > 0 && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm text-stone-600">Extra</span>
                        <div className="w-40 shrink-0">
                          <CountControl
                            valueLabel={extraGuests === 0 ? 'None' : `${extraGuests} extra`}
                            onDecrease={() => setExtraGuests((prev) => Math.max(0, prev - 1))}
                            onIncrease={() => setExtraGuests((prev) => Math.min(maxExtraGuests, prev + 1))}
                            decreaseDisabled={extraGuests === 0}
                            increaseDisabled={extraGuests >= maxExtraGuests}
                            decreaseLabel="Decrease extra guests"
                            increaseLabel="Increase extra guests"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {showGuestInfo && (
                  <div className="mt-3 space-y-1 border border-[#e4d7c3] bg-[#f6f1e6] p-3 text-xs leading-5 text-stone-700">
                    <p><strong>Rooms:</strong> How many rooms are in this booking.</p>
                    <p><strong>Guests:</strong> People staying.</p>
                    <p><strong>Dorm:</strong> Each guest pays the nightly rate.</p>
                    <p><strong>Private room:</strong> The rate includes {selectedRoomData ? `${baseOccupancy} per room` : 'the base occupancy'}. Extra guests are charged per night, with all meals.</p>
                    <p><strong>Meals:</strong> Every meal starts on. The fullest one you leave selected sets the nightly price.</p>
                    {isSingleOccupancy && <p><strong>Single occupancy:</strong> Each guest needs one room.</p>}
                  </div>
                )}

                {selectedRoomData && <p className="mt-3 text-sm font-semibold text-stone-900">Total guests: {totalGuests}</p>}
              </div>
            </div>
            <p className={`border-t border-[#e4d7c3] px-4 py-3 text-sm leading-6 sm:px-5 ${checkInDate && checkOutDate && !datesReady ? 'text-amber-700' : 'text-stone-600'}`}>
              {checkInDate && checkOutDate && !datesReady ? 'Check-out has to be after check-in.' : ruleNote}
            </p>
          </div>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {error && <p className="border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}

            <section aria-labelledby="available-rooms-heading">
              <h2 id="available-rooms-heading" className="font-serif text-3xl font-medium text-[#1f3d2e]">Available rooms</h2>
              {datesReady ? (
                <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                  {formatIndiaDate(checkInDate, { month: 'short' })} to {formatIndiaDate(checkOutDate, { month: 'short' })}
                  {' · '}
                  {nights} {nights === 1 ? 'night' : 'nights'}. Select a room, then the meal plan you want.
                </p>
              ) : (
                <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                  {checkInDate && checkOutDate ? 'Check-out has to be after check-in.' : 'Choose check-in and check-out to see available rooms.'}
                </p>
              )}

              {datesReady && loading && (
                <div className="mt-4 divide-y divide-[#e4d7c3] border-y border-[#e4d7c3]">
                  {roomSkeletons.map((item) => (
                    <div key={item} className="py-5">
                      <div className="flex animate-pulse items-start gap-4">
                        <div className="h-28 w-36 bg-[#e4d7c3] sm:h-32 sm:w-40" />
                        <div className="flex-1 space-y-3">
                          <div className="h-4 w-2/5 bg-[#e4d7c3]" />
                          <div className="h-3 w-full bg-[#f6f1e6]" />
                          <div className="h-3 w-4/5 bg-[#f6f1e6]" />
                          <div className="h-4 w-1/3 bg-[#e4d7c3]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {datesReady && !loading && !availabilitySettled && (
                <p className="mt-4 text-sm text-stone-600">Checking which rooms are free for these dates.</p>
              )}

              {datesReady && availabilitySettled && availability?.failed && (
                <div className="mt-4">
                  <p className="text-sm text-red-700">{availabilityError}</p>
                  <button
                    type="button"
                    onClick={() => setAvailabilityAttempt((attempt) => attempt + 1)}
                    className="mt-3 text-sm font-medium text-[#1f3d2e] underline decoration-stone-400 underline-offset-4"
                  >
                    Try again
                  </button>
                </div>
              )}

              {datesReady && availabilitySettled && !availability?.failed && availableRooms.length === 0 && (
                <p className="mt-4 text-sm text-stone-700">No rooms are free for these dates.</p>
              )}

              {datesReady && availabilitySettled && availableRooms.length > 0 && (
                <div className="mt-4 divide-y divide-[#e4d7c3] border-y border-[#e4d7c3]">
                  {availableRooms.map((room) => {
                    const isSelected = selectedRoom === room.id;
                    const roomsLeft = availability?.counts[room.id] ?? 0;
                    return (
                      <article
                        key={room.id}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`Select ${room.name}`}
                        onClick={() => selectRoom(room)}
                        onKeyDown={(event) => {
                          if (event.target !== event.currentTarget) return;
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            selectRoom(room);
                          }
                        }}
                        className={`cursor-pointer py-5 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3d2e] ${isSelected ? 'bg-[#fffdf8] px-4 ring-1 ring-inset ring-[#1f3d2e]' : ''}`}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                          <RoomImageGallery roomName={room.name} onOpen={() => selectRoom(room)} />
                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex items-start justify-between gap-3">
                              <h3 className="font-serif text-2xl text-stone-900">{room.name}</h3>
                              {isSelected && (
                                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Selected</span>
                              )}
                            </div>
                            <p className="mb-2 text-sm leading-6 text-stone-600">{room.description}</p>
                            <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1">
                              {room.amenities.map((amenity) => (
                                <span key={amenity} className="text-xs uppercase tracking-wide text-stone-500">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                              <span className="text-sm text-stone-600">
                                {room.isDormRoom
                                  ? 'Shared AC dorm · per person, per night'
                                  : room.isSingleOccupancy
                                    ? 'Single occupancy room • book multiple rooms'
                                    : `Rate for ${room.baseOccupancy}. Extra person ₹${room.extraPersonPrice.toLocaleString('en-IN')} / night, with all meals.`}
                              </span>
                              <span className="shrink-0 font-serif text-xl text-stone-900">
                                From ₹{nightlyRateForTier(room, 'breakfast-only').toLocaleString('en-IN')}/night
                              </span>
                            </div>
                            <p className="mt-2 text-xs uppercase tracking-wide text-stone-500">
                              {room.isDormRoom
                                ? roomsLeft === 1
                                  ? 'Dorm available for these dates'
                                  : `${roomsLeft} dorm rooms available for these dates`
                                : roomsLeft === 1
                                  ? '1 room left for these dates'
                                  : `${roomsLeft} rooms left for these dates`}
                            </p>
                            <div className="mt-4 grid gap-2 sm:grid-cols-3">
                              {MEAL_TIERS.map((tier) => {
                                const chosen = isSelected && selectedMeals.includes(tier.id);
                                const rate = nightlyRateForTier(room, tier.id);
                                return (
                                  <button
                                    type="button"
                                    key={tier.id}
                                    aria-pressed={chosen}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      chooseStay(room, tier.id);
                                    }}
                                    className={`px-3 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3d2e] ${
                                      chosen
                                        ? 'border border-[#1f3d2e] bg-white ring-1 ring-[#1f3d2e]'
                                        : 'border border-[#e4d7c3] bg-[#f6f1e6] hover:border-[#1f3d2e]'
                                    }`}
                                  >
                                    <p className="text-[11px] uppercase tracking-wide text-stone-500">{tier.label}</p>
                                    <p className="mt-1 font-serif text-xl text-stone-900">
                                      ₹{rate.toLocaleString('en-IN')}
                                      <span className="mt-1 block font-sans text-xs font-normal text-stone-500">
                                        {room.isDormRoom ? 'per person / night' : 'per room / night'}
                                      </span>
                                    </p>
                                    {chosen && (
                                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Selected</p>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-[#e4d7c3] bg-[#fffdf8] p-6">
              <h3 className="font-serif text-2xl text-[#1f3d2e]">Price summary</h3>
              {showPricedSummary && selectedRoomData && selectedTier ? (
                <>
                  <div className="mt-4">
                    <RoomImageGallery roomName={selectedRoomData.name} compact />
                    <h4 className="mt-4 font-serif text-2xl text-[#1f3d2e]">{selectedRoomData.name}</h4>
                    <p className="text-sm text-stone-600">Land&apos;s End The Last Resort</p>
                    <p className="mt-2 font-serif text-2xl text-stone-900">
                      ₹{nightlyRateForTier(selectedRoomData, selectedTier).toLocaleString('en-IN')}
                      <span className="ml-2 font-sans text-sm text-stone-600">{isDorm ? 'per person / night' : 'per room / night'}</span>
                    </p>
                    <p className="mt-1 text-sm text-stone-700">{mealTierLabel(selectedTier)}</p>
                    <p className="mt-2 text-sm leading-6 text-stone-700">
                      About ₹{buildPriceBreakdown({ baseAmount: nightlyRateForTier(selectedRoomData, selectedTier) }).totalAmount.toLocaleString('en-IN')} after GST and the online fee for one {isDorm ? 'guest' : 'room'} night.
                    </p>
                    <p className="mt-2 border border-[#e4d7c3] bg-[#f6f1e6] px-3 py-2 text-sm text-stone-700">
                      {formatIndiaDate(checkInDate, { month: 'short' })} – {formatIndiaDate(checkOutDate, { month: 'short' })}
                      {' · '}
                      {nights} {nights === 1 ? 'night' : 'nights'}
                      {' · '}
                      {totalGuests} {totalGuests === 1 ? 'guest' : 'guests'}
                    </p>
                  </div>

                  {quote && (
                    <>
                      <div className="mb-4 mt-4 border-b border-[#e4d7c3] pb-4">
                        <h4 className="mb-3 font-serif text-xl text-[#1f3d2e]">Price details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between gap-3 text-stone-700">
                            <span>
                              {isDorm ? 'Dorm' : 'Room'} · {mealTierLabel(selectedTier)} ({nights} {nights === 1 ? 'night' : 'nights'})
                              {isDorm ? ` × ${totalGuests} guests` : roomsNeeded > 1 ? ` × ${roomsNeeded}` : ''}
                            </span>
                            <span>₹{basePrice.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-stone-700">
                            <span>{mealTierLabel(selectedTier)} included</span>
                            <span>₹0</span>
                          </div>
                          {extraGuestAmount > 0 && (
                            <div className="flex justify-between text-stone-700">
                              <span>Extra guests ({quote.extraGuestCount || extraGuests}), all meals</span>
                              <span>₹{extraGuestAmount.toLocaleString('en-IN')}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-stone-700">
                            <span>GST (5%)</span>
                            <span>₹{(quote.taxAmount || 0).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-stone-700">
                            <span>Convenience fee (3%)</span>
                            <span>₹{(quote.convenienceFeeAmount || 0).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 flex items-end justify-between text-stone-900">
                        <span className="text-sm uppercase tracking-[0.16em] text-[#6d5a38]">Total</span>
                        <span className="font-serif text-3xl">₹{grandTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </>
                  )}

                  {occupancyError && <p className="mb-3 text-sm text-amber-700">{occupancyError}</p>}
                  {needsMoreRooms && (
                    <p className="mb-3 text-sm text-amber-700">
                      Only {selectedAvailableCount} {selectedAvailableCount === 1 ? 'room is' : 'rooms are'} left for those dates. This stay needs {roomsNeeded}.
                    </p>
                  )}
                  {!availabilitySettled && <p className="mb-3 text-sm text-stone-600">Checking availability for these dates.</p>}

                  <button
                    type="button"
                    disabled={!canContinue}
                    onClick={handleConfirmBooking}
                    className="w-full bg-[#1f3d2e] py-3 text-sm font-semibold text-[#f6f1e6] hover:bg-[#173026] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? 'Continuing...' : !availabilitySettled ? 'Checking availability...' : 'Continue to payment'}
                  </button>
                  {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
                </>
              ) : (
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {selectedRoomData && !selectedTier
                    ? 'Choose at least one meal to see the total.'
                    : datesReady && availabilitySettled && !availability?.failed && availableRooms.length === 0
                      ? 'No rooms are free for these dates, so payment stays closed.'
                      : datesReady
                        ? 'Select an available room to see the total.'
                        : 'Choose check-in and check-out, then a room, to see the total.'}
                </p>
              )}

              <div className="mt-4 space-y-2 border-t border-[#e4d7c3] pt-4 text-xs text-stone-600">
                <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#1f3d2e]" /> Secure booking and payment flow</p>
                <p className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-[#1f3d2e]" /> Instant confirmation after successful payment</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-14 border-t border-[#e4d7c3] pt-8">
          <h2 className="font-serif text-2xl font-medium text-[#1f3d2e]">Important booking information</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">Please review these details before confirming your stay.</p>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-serif text-xl text-[#1f3d2e]">Check-in / check-out</h3>
              <p className="mt-2 text-sm leading-6 text-stone-700">Check-in is at {CHECK_IN_LABEL} and check-out is by {CHECK_OUT_LABEL}.</p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-[#1f3d2e]">Cancellation policy</h3>
              <p className="mt-2 text-sm leading-6 text-stone-700">{CANCELLATION_POLICY}</p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-[#1f3d2e]">Activities and safety</h3>
              <p className="mt-2 text-sm leading-6 text-stone-700">Guided activities are weather dependent. Follow guide instructions and use provided safety equipment.</p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-[#1f3d2e]">Need help?</h3>
              <p className="mt-2 text-sm leading-6 text-stone-700">Our team can help with room selection and custom group requests.</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#1f3d2e]">
                <PhoneCall className="h-4 w-4" />
                <a href={`tel:${RESORT_PHONE_TEL}`}>{RESORT_PHONE_DISPLAY}</a>
              </p>
              <p className="mt-1 text-sm"><a className="font-medium text-[#1f3d2e]" href={`mailto:${RESORT_EMAIL}`}>{RESORT_EMAIL}</a></p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 border-t border-[#e4d7c3] pt-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-[#1f3d2e]">Included with every stay</h2>
            <ul className="mt-3 space-y-1 text-sm leading-6 text-stone-700">
              {STAY_INCLUSIONS.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#1f3d2e]">Add-ons</h2>
            <p className="mt-3 text-sm font-medium text-stone-800">{ASK_ON_ARRIVAL_NOTE}</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-stone-700">
              {STAY_ADDONS.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

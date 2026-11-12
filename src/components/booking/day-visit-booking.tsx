'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, Clock, PhoneCall } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { notifyError, notifyInfo, notifySuccess } from '@/lib/client-notify';
import { CANCELLATION_POLICY } from '@/lib/house-rules';
import { todayIndiaInput } from '@/lib/india-date';
import { ASK_ON_ARRIVAL_NOTE, RESORT_EMAIL, RESORT_PHONE_DISPLAY, RESORT_PHONE_TEL, SMALL_GROUP_MAX_GUESTS, STAY_ADDONS, splitIncludedAndAddons, visitMealsText } from '@/lib/resort-copy';
import { buildPriceBreakdown, quoteVisit } from '@/lib/stay-pricing';

interface DayVisitBookingProps {
  type?: 'full' | 'half' | 'short';
  packageId?: string | null;
}

type VisitPackageApi = {
  id: string;
  name: string;
  description?: string | null;
  packageType: 'FULL_DAY' | 'HALF_DAY' | 'SHORT_VISIT';
  duration: number;
  basePrice: number;
  maxGroupSize?: number;
  minGroupSize?: number;
  timing?: string | null;
  includes?: string[];
  status?: string;
};

const TYPE_TO_PACKAGE = {
  full: 'FULL_DAY',
  half: 'HALF_DAY',
  short: 'SHORT_VISIT',
} as const;

const PACKAGE_TO_TYPE = {
  FULL_DAY: 'full',
  HALF_DAY: 'half',
  SHORT_VISIT: 'short',
} as const;

function inr(value: number) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

function afterFees(sheetPrice: number) {
  return buildPriceBreakdown({ baseAmount: Number(sheetPrice) || 0 }).totalAmount;
}

export function DayVisitBooking({ type = 'full', packageId = null }: DayVisitBookingProps) {
  const router = useRouter();
  const visitDateInputRef = useRef<HTMLInputElement>(null);
  const [visitPackages, setVisitPackages] = useState<VisitPackageApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(packageId);
  const [visitDate, setVisitDate] = useState('');
  const [numGuests, setNumGuests] = useState(1);

  const packages = useMemo(() => {
    const active = visitPackages.filter((item) => !item.status || item.status === 'ACTIVE');
    return (['FULL_DAY', 'HALF_DAY', 'SHORT_VISIT'] as const)
      .map((packageType) => active.find((item) => item.packageType === packageType))
      .filter((item): item is VisitPackageApi => Boolean(item));
  }, [visitPackages]);

  const selectedPackage = useMemo(() => {
    return packages.find((item) => item.id === selectedId)
      || packages.find((item) => item.packageType === TYPE_TO_PACKAGE[type])
      || packages[0]
      || null;
  }, [packages, selectedId, type]);

  const quote = quoteVisit(Number(selectedPackage?.basePrice || 0), numGuests);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/bookings');
        if (!res.ok) throw new Error('Failed to load booking data');
        const json = await res.json();
        setVisitPackages(json.data.visitPackages || []);
      } catch (err) {
        setError(notifyError(err, 'Failed to load booking data'));
      } finally {
        setLoading(false);
      }
    };
    void loadCatalog();
  }, []);

  const missingRequirements = useMemo(() => {
    const missing: string[] = [];
    if (!visitDate) missing.push('Select visit date');
    if (numGuests < 1) missing.push('At least 1 guest');
    return missing;
  }, [numGuests, visitDate]);

  const choosePackage = (pkg: VisitPackageApi) => {
    setSelectedId(pkg.id);
    const nextType = PACKAGE_TO_TYPE[pkg.packageType];
    router.replace(`/booking/visit?type=${nextType}&packageId=${pkg.id}`);
  };

  const handleConfirmBooking = async () => {
    if (!selectedPackage) {
      notifyInfo('Please wait until booking options are loaded.');
      return;
    }
    if (missingRequirements.length > 0) {
      notifyInfo(`Please complete: ${missingRequirements.join(', ')}.`);
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch('/api/bookings/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitPackageId: selectedPackage.id,
          visitDate,
          guests: numGuests,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error?.message || 'Failed to create visit booking');
      }
      notifySuccess('Visit booking created', 'Redirecting you to details and payment.');
      router.push(`/booking/${json?.data?.bookingId}/bill`);
    } catch (err) {
      setError(notifyError(err, 'Failed to confirm booking'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f1e6] px-4 pb-20 pt-24 text-stone-800 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <button type="button" onClick={() => router.push('/booking')} className="text-sm text-stone-600 underline decoration-stone-400 underline-offset-4 hover:text-[#1f3d2e]">
          Back to booking
        </button>
        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6d5a38]">Land&apos;s End · The Last Resort</p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#1f3d2e] sm:text-5xl">Day visit</h1>
          <p className="mt-4 text-base leading-7 text-stone-700">Choose a date and how many guests are coming, then a visit. Meals listed with the package are included. One guest can book. A small group is {SMALL_GROUP_MAX_GUESTS} people or fewer.</p>
        </header>
        <figure className="relative mt-8 h-56 overflow-hidden sm:h-80">
          <Image
            src="/gallery/building-desktop.png"
            alt="Land's End in Sumiran Forest"
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover object-[center_38%]"
          />
        </figure>

        {error && <p className="mt-8 border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="border border-[#e4d7c3] bg-[#fffdf8] p-5 sm:p-6">
              <h2 className="font-serif text-2xl text-[#1f3d2e]">Visit details</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => visitDateInputRef.current?.showPicker?.()}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      visitDateInputRef.current?.showPicker?.();
                    }
                  }}
                  className="border border-[#e4d7c3] bg-[#f6f1e6] p-4"
                >
                  <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Visit date <Calendar className="h-4 w-4 text-[#1f3d2e]" /></p>
                  <input
                    ref={visitDateInputRef}
                    type="date"
                    value={visitDate}
                    min={todayIndiaInput()}
                    onChange={(event) => setVisitDate(event.target.value)}
                    onClick={(event) => event.stopPropagation()}
                    className="mt-3 w-full border border-[#e4d7c3] bg-white px-3 py-2 text-stone-900 outline-none focus:ring-2 focus:ring-[#1f3d2e]"
                  />
                </div>
                <div className="border border-[#e4d7c3] bg-[#f6f1e6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Guests</p>
                  <div className="mt-3 flex items-center gap-3">
                    <button type="button" className="h-10 w-10 border border-[#cbbfa8] text-lg text-stone-800 disabled:opacity-40" disabled={numGuests <= 1} onClick={() => setNumGuests((prev) => Math.max(1, prev - 1))} aria-label="Decrease guests">-</button>
                    <div className="flex-1 border border-[#e4d7c3] bg-white px-3 py-2 text-center text-stone-900">{numGuests} {numGuests === 1 ? 'guest' : 'guests'}</div>
                    <button type="button" className="h-10 w-10 border border-[#cbbfa8] text-lg text-stone-800" onClick={() => setNumGuests((prev) => prev + 1)} aria-label="Increase guests">+</button>
                  </div>
                  <p className="mt-2 text-xs text-stone-500">One guest can book. A small group is {SMALL_GROUP_MAX_GUESTS} people or fewer. Meals in the package are included.</p>
                </div>
              </div>
              {visitDate && loading && (
                <p className="mt-4 border border-[#1f3d2e] bg-[#f6f1e6] px-4 py-3 text-sm font-semibold text-[#1f3d2e]" role="status">
                  Checking visits for this date
                </p>
              )}
            </section>

            <section className="border-2 border-[#1f3d2e] bg-[#fffdf8] p-5 sm:p-6">
              <h2 className="font-serif text-3xl font-medium text-[#1f3d2e]">Choose a visit</h2>
              <div className="mt-4 grid gap-4">
                {loading && (
                  <div className="border border-[#1f3d2e] bg-[#fffdf8] px-4 py-4" role="status" aria-live="polite">
                    <p className="text-sm font-semibold text-[#1f3d2e]">
                      {visitDate ? 'Checking visits for this date' : 'Loading visits'}
                    </p>
                    <div className="mt-3 space-y-3">
                      {[0, 1, 2].map((item) => (
                        <div key={item} className="animate-pulse border border-[#e4d7c3] bg-white p-4">
                          <div className="h-5 w-1/3 bg-[#e4d7c3]" />
                          <div className="mt-3 h-3 w-1/2 bg-[#e4d7c3]" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {packages.map((pkg) => {
                  const selected = selectedPackage?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => choosePackage(pkg)}
                      className={`border bg-white p-5 text-left ${selected ? 'border-[#1f3d2e] ring-1 ring-[#1f3d2e]' : 'border-[#8d7350]'}`}
                    >
                      <p className="font-serif text-2xl text-[#1f3d2e]">{pkg.name}</p>
                      {selected && <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Selected</p>}
                      <p className="mt-2 text-sm text-stone-600">{pkg.timing}</p>
                      <p className="mt-3 font-serif text-3xl text-stone-900">
                        {inr(pkg.basePrice)}
                        <span className="ml-2 font-sans text-sm text-stone-600">per person</span>
                      </p>
                      <p className="mt-1 text-sm text-stone-600">
                        About {inr(afterFees(pkg.basePrice))} after GST and the online fee
                      </p>
                    </button>
                  );
                })}
                <p className="text-sm text-stone-700">
                  <Link href="/booking/group" className="underline decoration-stone-400 underline-offset-4 hover:text-[#1f3d2e]">
                    More than {SMALL_GROUP_MAX_GUESTS} guests? Send a group enquiry.
                  </Link>
                </p>
              </div>
            </section>

            {selectedPackage && (
              <section className="border border-[#e4d7c3] bg-[#fffdf8] p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap gap-4 text-sm text-stone-700">
                  <p className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-[#1f3d2e]" /> {selectedPackage.timing || `${selectedPackage.duration} hours`}</p>
                  <p className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-[#1f3d2e]" /> Small group: {SMALL_GROUP_MAX_GUESTS} people or fewer</p>
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Included</h3>
                <ul className="mt-2 grid gap-1 text-sm leading-6 text-stone-700 sm:grid-cols-2">
                  {splitIncludedAndAddons(selectedPackage.includes || []).included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h3 className="mt-4 text-sm font-medium text-stone-900">{ASK_ON_ARRIVAL_NOTE}</h3>
                <ul className="mt-2 grid gap-1 text-sm leading-6 text-stone-700 sm:grid-cols-2">
                  {STAY_ADDONS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Meals</h3>
                <p className="mt-2 text-sm leading-6 text-stone-700">{visitMealsText(selectedPackage.description, selectedPackage.packageType)}</p>
              </section>
            )}

          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 border border-[#e4d7c3] bg-[#fffdf8] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Your visit</p>
              <h3 className="mt-2 font-serif text-2xl text-[#1f3d2e]">{selectedPackage?.name || 'Day visit'}</h3>
              <div className="mt-4 space-y-2 text-sm text-stone-700">
                <div className="flex justify-between gap-3"><span>Visit ({numGuests} {numGuests === 1 ? 'guest' : 'guests'})</span><span>{inr(quote.quotedRoomAmount)}</span></div>
                <div className="flex justify-between gap-3"><span>Meals</span><span>Included</span></div>
                <div className="flex justify-between gap-3"><span>GST (5%)</span><span>{inr(quote.taxAmount)}</span></div>
                <div className="flex justify-between gap-3"><span>Convenience fee (3%)</span><span>{inr(quote.convenienceFeeAmount)}</span></div>
              </div>
              <div className="mt-4 flex items-end justify-between border-t border-[#e4d7c3] pt-4 text-stone-900">
                <span className="text-sm uppercase tracking-[0.16em] text-[#6d5a38]">Total</span>
                <span className="font-serif text-3xl">{inr(quote.totalAmount)}</span>
              </div>
              <button
                type="button"
                disabled={submitting || !selectedPackage}
                onClick={() => void handleConfirmBooking()}
                className="mt-5 w-full bg-[#1f3d2e] py-3 text-sm font-semibold text-[#f6f1e6] hover:bg-[#173026] disabled:opacity-60"
              >
                {submitting ? 'Confirming...' : 'Confirm booking'}
              </button>
              {missingRequirements.length > 0 && <p className="mt-3 text-sm text-amber-800">Please complete: {missingRequirements.join(', ')}.</p>}
              <div className="mt-4 space-y-2 border-t border-[#e4d7c3] pt-4 text-xs leading-5 text-stone-600">
                <p>Secure booking and payment.</p>
                <p>5% GST and 3% convenience fee are included above.</p>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-14 border-t border-[#e4d7c3] pt-8 text-sm leading-6 text-stone-700">
          <h2 className="font-serif text-2xl font-medium text-[#1f3d2e]">Cancellation</h2>
          <p className="mt-3">{CANCELLATION_POLICY}</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
            <a href={`tel:${RESORT_PHONE_TEL}`} className="inline-flex items-center gap-2 font-medium text-[#1f3d2e]">
              <PhoneCall className="h-4 w-4" /> {RESORT_PHONE_DISPLAY}
            </a>
            <a href={`mailto:${RESORT_EMAIL}`} className="inline-flex items-center gap-2 font-medium text-[#1f3d2e]">
              {RESORT_EMAIL}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

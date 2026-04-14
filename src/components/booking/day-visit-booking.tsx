'use client'
// TODO : overfetching here in /api/booking

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Calendar, Users, CheckCircle2, Clock, TreePine, ShieldCheck, CreditCard, PhoneCall, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { notifyError, notifyInfo, notifySuccess } from '@/lib/client-notify';

interface DayVisitBookingProps {
  type?: 'full' | 'half';
  packageId?: string | null;
}

type VisitPackageApi = {
  id: string;
  name: string;
  description: string;
  packageType: 'FULL_DAY' | 'HALF_DAY' | 'SHORT_VISIT';
  duration: number;
  maxActivity: number;
  basePrice: number;
  maxGroupSize: number;
  timing?: string | null;
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
    visitPackages: VisitPackageApi[];
    mealPlans: MealPlanApi[];
  };
};

export function DayVisitBooking({ type = 'full', packageId = null }: DayVisitBookingProps) {
  const router = useRouter();
  const visitDateInputRef = useRef<HTMLInputElement>(null);
  const [visitPackages, setVisitPackages] = useState<VisitPackageApi[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlanApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPackage = useMemo(() => {
    if (packageId) {
      const exact = visitPackages.find((pkg) => pkg.id === packageId);
      if (exact) return exact;
    }
    const desiredType = type === 'full' ? 'FULL_DAY' : 'HALF_DAY';
    return visitPackages.find((pkg) => pkg.packageType === desiredType) ?? visitPackages[0] ?? null;
  }, [packageId, type, visitPackages]);

  const basePrice = Number(selectedPackage?.basePrice || (type === 'full' ? 2999 : 1499));
  const [selectedMealPlanId, setSelectedMealPlanId] = useState<string | null>(null);
  const [visitDate, setVisitDate] = useState('');
  const [numGuests, setNumGuests] = useState(2);

  const missingRequirements = useMemo(() => {
    const missing: string[] = [];
    if (!visitDate) missing.push('Select visit date');
    if (!selectedMealPlanId) missing.push('Select a meal plan');
    return missing;
  }, [selectedMealPlanId, visitDate]);

  const handleBack = () => {
    router.push('/booking');
  };

  const openVisitDatePicker = () => {
    const input = visitDateInputRef.current;
    if (!input) return;
    input.focus();
    (input as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
  };

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/bookings');
        if (!res.ok) throw new Error('Failed to load booking data');
        const json = (await res.json()) as BookingCatalogResponse;
        setVisitPackages(json.data.visitPackages || []);
        const plans = json.data.mealPlans || [];
        setMealPlans(plans);
        setSelectedMealPlanId((prev) => prev || plans[0]?.id || null);
      } catch (err) {
        const message = notifyError(err, 'Failed to load booking data');
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    void loadCatalog();
  }, []);

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
          visitDate: new Date(visitDate).toISOString(),
          guests: numGuests,
          mealPlanId: selectedMealPlanId,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error?.message || 'Failed to create visit booking');
      }

      notifySuccess('Visit booking created', 'Redirecting you to details and payment.');
      router.push(`/booking/${json?.data?.bookingId}/bill`);
    } catch (err) {
      const message = notifyError(err, 'Failed to confirm booking');
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const totalPrice = basePrice * numGuests;
  const taxes = Math.floor(totalPrice * 0.05);
  const serviceFee = 100;
  const grandTotal = totalPrice + taxes + serviceFee;
  const visitSteps = [
    { id: '1', label: 'Choose package' },
    { id: '2', label: 'Select meal plan' },
    { id: '3', label: 'Select date & guests' },
    { id: '4', label: 'Review and pay' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/40 via-white to-sky-50/40">


      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1751931817996-368c9ee352ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwZm9yZXN0fGVufDF8fHx8MTc2MzY5ODIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Day visit"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-900/80 via-slate-900/45 to-transparent">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
            <div>
              <button onClick={handleBack} className="flex items-center gap-2 text-white mb-2 hover:text-green-400 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to offerings
              </button>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Nature day visit booking
              </p>
              <h1 className="text-white mb-2">{type === 'full' ? 'Full Day Visit' : 'Half Day Visit'} Booking</h1>
              <p className="text-sm text-white/85">Pick your package, meal plan, date, and guests in one flow.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6 rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-sm">
          <p className="mb-3 text-sm font-medium text-gray-700">Booking steps</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {visitSteps.map((step) => (
              <div key={step.id} className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-2 text-sm text-gray-700">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">{step.id}</span>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Info */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-gray-900 mb-1 text-2xl font-bold">{type === 'full' ? 'Full Day Visit at Sumiran' : 'Half Day Visit at Sumiran'}</h2>
              <p className="mb-4 text-sm text-gray-600">Choose your package and lock your preferred slot in minutes.</p>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Clock className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="text-gray-900">{type === 'full' ? '8-10 hours' : '4-5 hours'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-gray-600">Activities</p>
                    <p className="text-gray-900">Curated set included</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <TreePine className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-gray-600">Guide</p>
                    <p className="text-gray-900">Included</p>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <h3 className="text-gray-900 mb-3">What&apos;s Included</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {type === 'full' ? (
                    <>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Curated activities included</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Dedicated forest guide</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Full forest safari</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Meals & refreshments</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Curated activity included</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Activity guide</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Light refreshments</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Safety equipment</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Meal Plan */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-gray-900 mb-2 text-xl font-semibold">Meal Plan (Included)</h2>
              <p className="text-gray-600 mb-4">Meal plan is mandatory and included in the visit package price.</p>
              <div className="grid gap-3 md:grid-cols-2">
                {mealPlans.map((plan) => {
                  const isSelected = selectedMealPlanId === plan.id;
                  return (
                    <button
                      type="button"
                      key={plan.id}
                      onClick={() => setSelectedMealPlanId(plan.id)}
                      className={`text-left rounded-xl border-2 p-4 transition-all ${
                        isSelected
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-gray-900 font-medium">{plan.name}</p>
                          {plan.description && (
                            <p className="mt-1 text-xs text-gray-600">{plan.description}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-gray-900 font-semibold">Included</p>
                          <p className="text-xs text-gray-500">No extra charge</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
                {mealPlans.length === 0 && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    Meal plan details are not configured yet. Please contact support.
                  </div>
                )}
              </div>
            </section>

            {/* Visit Details */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-gray-900 mb-1 text-xl font-semibold">Visit Details</h2>
              <p className="mb-4 text-sm text-gray-600">Click anywhere on the date card to open the calendar quickly.</p>
              <div className="grid grid-cols-2 gap-3">
              <div
                role="button"
                tabIndex={0}
                onClick={openVisitDatePicker}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openVisitDatePicker();
                  }
                }}
                className="rounded-xl border border-gray-200 bg-linear-to-br from-white to-green-50 p-4 shadow-xs transition-all hover:border-green-400 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">Visit Date</p>
                  <Calendar className="w-4 h-4 text-green-700" />
                </div>
                <p className="mt-2 text-gray-900">
                  {visitDate ? new Date(visitDate).toLocaleDateString() : 'Choose your date'}
                </p>
                <input
                  ref={visitDateInputRef}
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div className="rounded-xl border border-gray-200 bg-linear-to-br from-white to-blue-50 p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">Number of Guests</p>
                  <Users className="w-4 h-4 text-blue-700" />
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{numGuests}</p>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setNumGuests((prev) => Math.max(1, prev - 1))}
                    className="h-10 w-10 rounded-lg border border-gray-300 text-lg text-gray-700 transition-colors hover:bg-gray-100"
                    aria-label="Decrease guests"
                  >
                    -
                  </button>
                  <div className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-gray-700">
                    {numGuests === 1 ? '1 guest' : `${numGuests} guests`}
                  </div>
                  <button
                    type="button"
                    onClick={() => setNumGuests((prev) => Math.min(20, prev + 1))}
                    className="h-10 w-10 rounded-lg border border-gray-300 text-lg text-gray-700 transition-colors hover:bg-gray-100"
                    aria-label="Increase guests"
                  >
                    +
                  </button>
                </div>
              </div>
              </div>
            </section>
              
            {/* Login Section */}
            <div className="border-t pt-6 pb-5" />
            {/* 
              <h2 className="text-gray-900 mb-4">Login or Sign up to book</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    We&apos;ll call or text you to confirm your number. Standard message and data rates apply.
                  </p>
                </div>

                <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Continue
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-gray-500">Or</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Apple className="w-5 h-5" />
                  </button>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#EA4335"/>
                    <path d="M18 12h-6v6h-1v-6H5v-1h6V5h1v6h6v1z" fill="white"/>
                  </svg>
                  Continue with email
                </button>
              </div>
            </div> */}
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-2xl border border-blue-200 bg-linear-to-b from-blue-50 to-white p-6 shadow-sm">
              <div className="mb-4">
                <div className="relative w-full h-32 mb-3">
                  <Image 
                    src="https://images.unsplash.com/photo-1751931817996-368c9ee352ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwZm9yZXN0fGVufDF8fHx8MTc2MzY5ODIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Day visit"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-gray-900 mb-1">{selectedPackage?.name || (type === 'full' ? 'Full Day Visit' : 'Half Day Visit')}</h3>
                <p className="text-gray-600">Sumiran Jungle Resort</p>
                {visitDate && (
                  <p className="mt-2 rounded-lg bg-blue-100 px-3 py-2 text-xs text-blue-800">
                    Visit date: {new Date(visitDate).toLocaleDateString()}
                  </p>
                )}
                {/* <div className="flex items-center gap-1 mt-2">
                  <span className="text-gray-900">4.8</span>
                  <span className="text-gray-600">Excellent</span>
                  <span className="text-gray-500 ml-1">286 reviews</span>
                </div> */}
              </div>

              {/* <div className="mb-4 pb-4 border-b border-blue-200">
                <p className="text-gray-600 mb-1">Your booking is protected by <span className="text-gray-900">Sumiran</span></p>
              </div> */}

              <div className="mb-4 pb-4 border-b border-blue-200">
                <h4 className="text-gray-900 mb-3">Price Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Base Fare ({numGuests} {numGuests === 1 ? 'guest' : 'guests'})</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  {selectedMealPlanId && (
                    <div className="flex justify-between text-gray-700">
                      <span>Meal plan (included)</span>
                      <span>₹0</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>Taxes (5%)</span>
                    <span>₹{taxes}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Service Fee</span>
                    <span>₹{serviceFee}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-gray-900 mb-4">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>

              {/* TODO: Re-enable booking functionality */}
              {loading && (
                <div className="mb-3 space-y-2 animate-pulse">
                  <div className="h-3 w-2/3 rounded bg-blue-100" />
                  <div className="h-3 w-1/2 rounded bg-blue-100" />
                </div>
              )}
              {error && <p className="mb-3 text-red-600 text-sm">{error}</p>}
              <button 
                disabled={submitting || !selectedPackage}
                onClick={handleConfirmBooking}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Confirming...' : 'Confirm Booking'}
              </button>
              {missingRequirements.length > 0 && (
                <p className="mt-3 text-sm text-amber-700">
                  Please complete: {missingRequirements.join(', ')}.
                </p>
              )}

              <div className="mt-4 border-t border-blue-200 pt-4 space-y-2 text-xs text-gray-600">
                <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Secure booking and payment flow</p>
                <p className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-blue-600" /> Instant confirmation after successful payment</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-gray-900 text-xl font-semibold mb-1">Important Booking Information</h2>
          <p className="text-gray-600 text-sm mb-5">Please review these details before confirming your day visit.</p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <h3 className="text-sm font-semibold text-emerald-800 mb-2">Arrival and Reporting</h3>
              <p className="text-sm text-emerald-900/90">Please report 30 minutes before your selected time slot for check-in and briefing.</p>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Reschedule Policy</h3>
              <p className="text-sm text-blue-900/90">You can request one free reschedule up to 24 hours before your visit, subject to availability.</p>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
              <h3 className="text-sm font-semibold text-amber-800 mb-2">Safety and Guidelines</h3>
              <p className="text-sm text-amber-900/90">Follow guide instructions at all times and wear provided safety equipment during activities.</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">Need Help?</h3>
              <p className="text-sm text-slate-700 mb-2">Our team can help you pick the right package and activities.</p>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                <PhoneCall className="h-4 w-4" />
                +91 98765 43210
              </p>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}

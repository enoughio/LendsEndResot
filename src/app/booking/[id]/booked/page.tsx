'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { formatIndiaDate } from '@/lib/india-date'
import { EXIT_POLICY_TEXT, ruleText } from '@/lib/house-rules'
import { ASK_ON_ARRIVAL_NOTE, CHECK_IN_LABEL, CHECK_OUT_LABEL, STAY_ADDONS, STAY_INCLUSIONS } from '@/lib/resort-copy'

type BookingDetailsResponse = {
  data: {
    bookingId: string;
    type: 'STAY' | 'VISIT';
    status: string;
    guestDetails: {
      name?: string | null;
      email?: string | null;
      phone?: string | null;
    };
    checkInTime?: string | null;
    checkOutTime?: string | null;
    included?: string[];
    extras?: string[];
    extrasNote?: string | null;
    houseRules?: {
      signerName?: string | null;
      acceptedRuleIds?: string[];
      exitPolicyAccepted?: boolean;
    } | null;
    stayDetails: {
      roomType?: string | null;
      checkIn?: string | null;
      checkOut?: string | null;
      mealPlanName?: string | null;
    } | null;
    visitDetails: {
      packageName?: string | null;
      visitDate?: string | null;
      timing?: string | null;
      description?: string | null;
      includes?: string[];
    } | null;
  };
}

function BookedContent() {
  const params = useParams<{ id: string }>()
  const bookingId = params?.id
  const [booking, setBooking] = useState<BookingDetailsResponse['data'] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!bookingId) return

    const loadBooking = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/bookings/${bookingId}`)
        if (!res.ok) return
        const json = (await res.json()) as BookingDetailsResponse
        setBooking(json.data)
      } finally {
        setLoading(false)
      }
    }

    void loadBooking()
  }, [bookingId])

  const details = useMemo(() => {
    if (booking) {
      if (booking.type === 'STAY') {
        return {
          title: booking.stayDetails?.roomType || 'Resort Stay',
          subtitle: 'Stay Booking',
          description: 'Your stay at Sumiran Jungle Resort has been confirmed.',
          bookingDate: booking.stayDetails?.checkIn,
          emailText: booking.guestDetails?.email || 'Guest details can be completed at check-in',
        }
      }

      return {
        title: booking.visitDetails?.packageName || 'Day Visit',
        subtitle: 'Day Visit Booking',
        description: 'Your day visit at Sumiran Jungle Resort has been confirmed.',
        bookingDate: booking.visitDetails?.visitDate,
        emailText: booking.guestDetails?.email || 'Guest details can be completed at arrival',
      }
    }


    return {
      title: 'Booking Confirmed',
      subtitle: 'Thank you for booking',
      description: 'Your booking has been confirmed.',
      bookingDate: null,
      emailText: 'Sent to your email address',
    }
  }, [booking])

  return (
    <div className="min-h-screen bg-[#f6f1e6] px-4 pb-20 pt-24 text-stone-800 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/booking" className="text-sm text-stone-600 underline decoration-stone-400 underline-offset-4 hover:text-[#1f3d2e]">
          Back to booking
        </Link>
        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6d5a38]">Land&apos;s End · The Last Resort</p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#1f3d2e] sm:text-5xl">Booking confirmed</h1>
          <p className="mt-4 text-base leading-7 text-stone-700">{details.description}</p>
        </header>
        <figure className="relative mt-8 h-56 overflow-hidden sm:h-80">
          <Image
            src="/gallery/building.jpeg"
            alt="Land's End in Sumiran Forest"
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </figure>

        {/* Booking Details Card */}
        <div className="mt-8 border border-[#e4d7c3] bg-[#fffdf8] p-5 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">{details.subtitle}</p>
            <h2 className="mt-2 font-serif text-3xl text-[#1f3d2e]">{details.title}</h2>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-6 animate-pulse">
              <div className="space-y-4">
                <div className="h-16 bg-[#e4d7c3]" />
                <div className="h-16 bg-[#e4d7c3]" />
              </div>
              <div className="space-y-4">
                <div className="h-16 bg-[#e4d7c3]" />
                <div className="h-16 bg-[#e4d7c3]" />
              </div>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 border border-[#e4d7c3] bg-[#f6f1e6] p-4">
                <Calendar className="mt-1 h-4 w-4 text-[#1f3d2e]" />
                <div>
                  <p className="text-stone-600 text-sm">{booking?.type === 'VISIT' ? 'Visit date' : 'Check-in'}</p>
                  <p className="text-stone-900">
                    {booking?.type === 'VISIT'
                      ? (formatIndiaDate(booking.visitDetails?.visitDate, { weekday: 'long' }) || 'Date to be confirmed')
                      : (formatIndiaDate(booking?.stayDetails?.checkIn, { weekday: 'long' }) || 'Date to be confirmed')}
                  </p>
                  {booking?.type === 'STAY' && (
                    <p className="text-stone-600 text-sm">at {booking.checkInTime || CHECK_IN_LABEL}</p>
                  )}
                  {booking?.type === 'VISIT' && booking.visitDetails?.timing && (
                    <p className="text-stone-600 text-sm">{booking.visitDetails.timing}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 border border-[#e4d7c3] bg-[#f6f1e6] p-4">
                <MapPin className="mt-1 h-4 w-4 text-[#1f3d2e]" />
                <div>
                  <p className="text-stone-600 text-sm">Location</p>
                  <p className="text-stone-900">Land&apos;s End Resort at Sumiran Ecological Foundation</p>
                  <p className="text-stone-600 text-sm">Sagoni, Bilkisganj, Madhya Pradesh 466115</p>
                  <a
                    href="https://maps.app.goo.gl/BNvC131L8wwmBHbi8"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm text-[#1f3d2e] underline decoration-stone-400 underline-offset-4"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 border border-[#e4d7c3] bg-[#f6f1e6] p-4">
                <Mail className="mt-1 h-4 w-4 text-[#1f3d2e]" />
                <div>
                  <p className="text-stone-600 text-sm">Confirmation Email</p>
                  <p className="text-stone-900">{details.emailText}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border border-[#e4d7c3] bg-[#f6f1e6] p-4">
                <Phone className="mt-1 h-4 w-4 text-[#1f3d2e]" />
                <div>
                  <p className="text-stone-600 text-sm">Contact Support</p>
                  <p className="text-stone-900">+91 6268244196</p>
                  <p className="text-stone-600 text-sm">landsend.sumiran@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          )}

          {booking?.type === 'STAY' && (
            <div className="mt-6 flex items-start gap-3 border border-[#e4d7c3] bg-[#f6f1e6] p-4">
              <Calendar className="mt-1 h-4 w-4 text-[#1f3d2e]" />
              <div>
                <p className="text-stone-600 text-sm">Check-out</p>
                <p className="text-stone-900">{formatIndiaDate(booking.stayDetails?.checkOut, { weekday: 'long' }) || 'Date to be confirmed'}</p>
                <p className="text-stone-600 text-sm">by {booking.checkOutTime || CHECK_OUT_LABEL}</p>
              </div>
            </div>
          )}

          <div className="mt-6 border-t border-[#e4d7c3] pt-6">
            <p className="text-stone-600 text-sm">
              <strong>Booking Reference:</strong> {booking?.bookingId || 'Shown after the booking loads'}
            </p>
          </div>
        </div>

        {booking && (
          <div className="mt-8 border border-[#e4d7c3] bg-[#fffdf8] p-5 sm:p-8">
            <h3 className="font-serif text-2xl text-[#1f3d2e]">On the day</h3>
            {booking.type === 'STAY' ? (
              <p className="mt-2 text-sm text-stone-700">
                Check-in {booking.checkInTime || CHECK_IN_LABEL}. Check-out {booking.checkOutTime || CHECK_OUT_LABEL}.
                {booking.stayDetails?.mealPlanName ? ` Meals: ${booking.stayDetails.mealPlanName}.` : ''}
              </p>
            ) : (
              <p className="mt-2 text-sm text-stone-700">
                {booking.visitDetails?.timing || 'Arrive at the time on your visit.'}
                {booking.visitDetails?.description ? ` Meals: ${booking.visitDetails.description}.` : ''}
              </p>
            )}

            <h4 className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Included</h4>
            <ul className="mt-2 space-y-1 text-sm text-stone-700">
              {(booking.included?.length ? booking.included : booking.type === 'STAY' ? STAY_INCLUSIONS : booking.visitDetails?.includes || []).map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>

            <h4 className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Extra</h4>
            <p className="mt-1 text-sm font-medium text-stone-800">{booking.extrasNote || ASK_ON_ARRIVAL_NOTE}</p>
            <ul className="mt-2 space-y-1 text-sm text-stone-700">
              {(booking.extras?.length ? booking.extras : STAY_ADDONS).map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>

            <h4 className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Rules you signed</h4>
            {booking.houseRules?.acceptedRuleIds?.length ? (
              <div className="mt-2 text-sm text-stone-700">
                <p>Signed by {booking.houseRules.signerName || 'the lead guest'}.</p>
                <ul className="mt-2 space-y-1">
                  {booking.houseRules.acceptedRuleIds.map((id) => (
                    <li key={id}>· {ruleText(id)}</li>
                  ))}
                </ul>
                {booking.houseRules.exitPolicyAccepted && <p className="mt-3">{EXIT_POLICY_TEXT}</p>}
              </div>
            ) : (
              <p className="mt-2 text-sm text-stone-600">The signed house rules are not on this booking yet.</p>
            )}
          </div>
        )}

        <section className="mt-8 border-t border-[#e4d7c3] pt-8">
          <h3 className="font-serif text-2xl text-[#1f3d2e]">What&apos;s next</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
            <li>Check your email for booking confirmation and details</li>
            <li>We&apos;ll contact you 24 hours before your visit with final instructions</li>
            <li>Save our contact number for any questions or changes</li>
            <li>Prepare for an amazing jungle experience!</li>
          </ul>
          <p className="mt-4 text-sm leading-6 text-stone-600">
            Your reservation is securely stored and can be retrieved anytime with your booking reference.
          </p>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center bg-[#1f3d2e] px-6 py-3 text-sm font-semibold text-[#f6f1e6] hover:bg-[#173026]"
          >
            Book Another Experience
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-[#1f3d2e] px-6 py-3 text-sm font-semibold text-[#1f3d2e] hover:bg-[#1f3d2e] hover:text-[#f6f1e6]"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f6f1e6] px-4 pt-24">
          <div className="mx-auto max-w-5xl animate-pulse space-y-6">
            <div className="h-10 w-40 bg-[#e4d7c3]" />
            <div className="h-16 w-2/3 bg-[#e4d7c3]" />
            <div className="h-64 bg-[#e4d7c3]" />
            <div className="h-56 bg-[#fffdf8]" />
          </div>
        </div>
      }
    >
      <BookedContent />
    </Suspense>
  )
}

export default Page

// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page
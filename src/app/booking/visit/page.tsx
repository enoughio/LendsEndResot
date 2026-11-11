'use client'

import { DayVisitBooking } from '@/components/booking/day-visit-booking'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function VisitContent() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')
  const type = typeParam === 'half' || typeParam === 'short' || typeParam === 'full' ? typeParam : 'full'
  const packageId = searchParams.get('packageId')

  return <DayVisitBooking type={type} packageId={packageId} />
}

const Page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f6f1e6] px-4 pt-24 text-sm text-stone-600">Loading the day visit...</div>}>
      <VisitContent />
    </Suspense>
  )
}

export default Page



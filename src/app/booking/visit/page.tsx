'use client'

import { DayVisitBooking } from '@/components/booking/day-visit-booking'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function VisitContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as 'full' | 'half' || 'full'
  const packageId = searchParams.get('packageId')

  return <DayVisitBooking type={type} packageId={packageId} />
}

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VisitContent />
    </Suspense>
  )
}

export default Page



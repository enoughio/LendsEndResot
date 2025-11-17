import Image from 'next/image'
import React from 'react'

const Activites = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <Image
            src="/home/home-activities-leves.svg"
            alt="Leaves decorative"
            width={220}
            height={90}
            className="-translate-x-2 select-none"
            priority
          />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight text-neutral-900 pr-2 sm:pr-4">
            Experiences &
            <br />
            <span className="font-medium">Activities</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* 1. Lake Boating (overlay card) */}
          <div className="order-1 md:order-1 md:col-span-2">
            <div className="relative h-48 sm:h-56 md:h-60 rounded-2xl overflow-hidden">
              <Image
                src="/home/home-activities-leves.svg"
                alt="Leaf background"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-center text-white">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">Lake Boating</h3>
                <p className="max-w-md text-sm sm:text-base opacity-90">
                  Enjoy peaceful boat rides on the pristine Upper Lake with stunning sunset views.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Sunset image (top-right on desktop) */}
          <div className="order-5 md:order-2">
            <div className="relative h-48 sm:h-56 md:h-60 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop"
                alt="Sunset by the lake"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* 3. Text card (wake up...) */}
          <div className="order-2 md:order-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 h-48 sm:h-56 md:h-60 flex">
              <p className="text-neutral-800 text-lg leading-7">
                Wake up to misty lake views and the sound of birdsong echoing through nature.
              </p>
            </div>
          </div>

          {/* 4. Boat image (small) */}
          <div className="order-3 md:order-4">
            <div className="relative h-48 sm:h-56 md:h-60 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2069&auto=format&fit=crop"
                alt="Inflatable boat on lake"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* 5. Nature Walks (overlay card) */}
          <div className="order-6 md:order-5">
            <div className="relative h-48 sm:h-56 md:h-60 rounded-2xl overflow-hidden">
              <Image
                src="/home/home-activities-leves.svg"
                alt="Leaf background"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-emerald-900/40" />
              <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-center text-white">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">Nature Walks</h3>
                <p className="max-w-md text-sm sm:text-base opacity-95">
                  Explore the rich biodiversity around the lake with guided nature walks.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Spa & Wellness (wide text card) */}
          <div className="order-4 md:order-6 md:col-span-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7 md:p-10 h-52 sm:h-56 md:h-60 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-2">Spa &amp; Wellness</h3>
              <p className="text-neutral-700 max-w-2xl">
                Rejuvenate with traditional Ayurvedic treatments and modern wellness therapies.
              </p>
            </div>
          </div>

          {/* 7. Birds photo (bottom-right) */}
          <div className="order-7 md:order-7">
            <div className="relative h-48 sm:h-56 md:h-60 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1974&auto=format&fit=crop"
                alt="Birds by the water"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Activites
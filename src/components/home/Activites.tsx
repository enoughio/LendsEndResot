import Image from 'next/image'
import React from 'react'

const Activities = () => {
  return (
    <section className="w-full relative py-6">
      <div className="mx-auto max-w-7xl   ">
        {/* Header */}
        <div className="flex  justify-between items-center relative px-2  md:pr-8 h-50  ">
         
         <div className='bg-blue-700 w-1/2 '>
            <Image
              src="/home/home-activities-leves.svg"
              alt="Leaves decorative"
              width={220}
              height={90}
              className=" w-[150px] md:w-[240px] select-none object-contain -translate-4 absolute top-5 left-0  md:-top-15 md:left-0"
              priority
              />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight leading-tight text-neutral-900 pr-2 sm:pr-4 text-nowrap">
            Experiences &
            <br />
            <span className="font-medium">Activities</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 md:px-10 px-2">
          {/* 1. Lake Boating (overlay card) */}
          <div className="order-1 md:order-1 md:col-span-2">
            <div className="relative h-32 md:h-36 rounded-2xl overflow-hidden border-gray-700 ">
              <Image
                src="/gallery/rafting.jpeg"
                alt="Lake and water activities"
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
            <div className="relative h-32 md:h-36 rounded-2xl overflow-hidden border-gray-700">
              <Image
                src="/gallery/stargazing.jpeg"
                alt="Bird watching in nature"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 p-5 sm:p-6 flex items-end">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Stargazing</h3>
              </div>
            </div>
          </div>

          {/* 3. Text card (wake up...) */}
          <div className="order-2 md:order-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6  h-32 md:h-36 flex">
              <p className="text-neutral-800 text-lg leading-7">
                Wake up to misty lake views and the sound of birdsong echoing through nature.
              </p>
            </div>
          </div>

          {/* 4. Boat image (small) */}
          <div className="order-3 md:order-4">
            <div className="relative  h-32 md:h-36 rounded-2xl overflow-hidden border-gray-700">
              <Image
                src="/gallery/bird.jpeg"
                alt="Night sky and stargazing"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-center"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 p-5 sm:p-6 flex items-end">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Bird Watching</h3>
              </div>
            </div>
          </div>

          {/* 5. Nature Walks (overlay card) */}
          <div className="order-6 md:order-5">
            <div className="relative  h-32 md:h-36 rounded-2xl overflow-hidden border-gray-700">
              <Image
                src="/gallery/WhatsApp Image 2026-02-04 at 8.32.06 PM.jpeg"
                alt="Forest walks and nature trails"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-emerald-900/40" />
              <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-center text-white">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">Forest Walks</h3>
                <p className="max-w-md text-sm sm:text-base opacity-95">
                  Explore the rich biodiversity around the lake with guided nature walks.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Wellness (wide text card) */}
          <div className="order-4 md:order-6 md:col-span-2">
            <div className="relative h-32 md:h-36 rounded-2xl overflow-hidden border-gray-700">
              <Image
                src="/gallery/mediation.jpeg"
                alt="Yoga and wellness activities"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-center"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 p-6 sm:p-7 md:p-10 flex flex-col justify-center text-white">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">Yoga & Wellness</h3>
                <p className="max-w-2xl text-sm sm:text-base opacity-90">
                  Rejuvenate with traditional Ayurvedic treatments and modern wellness therapies.
                </p>
              </div>
            </div>
          </div>

          {/* 7. Birds photo (bottom-right) */}
          <div className="order-7 md:order-7">
            <div className="relative  h-32 md:h-36 rounded-2xl overflow-hidden border-gray-700">
              <Image
                src="/gallery/climbing.jpeg"
                alt="Adventure activities"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-center"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 p-5 sm:p-6 flex items-end">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Zipline & Climbing</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Activities
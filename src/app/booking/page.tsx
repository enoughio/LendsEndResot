// import { Metadata } from 'next';
// import { OverviewPage } from '@/components/booking/overview-page'

// export const metadata: Metadata = {
//   title: "Book Your Stay",
//   description: "Book your stay at Land's End Resort, Sumiran Forest. Choose from overnight stays or day visits. Experience nature, activities, organic dining, and sustainable living near Bhopal.",
//   openGraph: {
//     title: "Book Your Stay | Land's End Resort",
//     description: "Reserve your eco-friendly accommodation at Sumiran Forest. Overnight stays and day visits available.",
//     images: ['/gallery/room1.jpeg'],
//   },
// };

// const Page = () => {
//   return (
//     <OverviewPage />
//   )
// }

// export default Page


import { Metadata } from 'next';
import { RoomBookingCard, type RoomCard } from '@/components/booking/RoomBookingCard';
import { sampleRooms } from '@/lib/bookingStore';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Book Your Stay',
  description: "Reserve rooms at Land's End Resort with secure payments.",
};

const Page = async () => {
  let rooms: RoomCard[] = [];

  try {
    const dbRooms = await prisma.room.findMany({ orderBy: { price: 'asc' } });

    if (dbRooms.length) {
      rooms = dbRooms;
    } else {
      const seeded = await Promise.all(
        sampleRooms.map((room) =>
          prisma.room.upsert({
            where: { slug: room.slug },
            update: {},
            create: room,
          }),
        ),
      );
      rooms = seeded;
    }
  } catch (error) {
    console.error('Falling back to sample rooms. Check database connection.', error);
    rooms = sampleRooms.map((room, idx) => ({ id: `sample-${idx}`, ...room }));
  }

  return (
    <div className="bg-white min-h-screen pt-28 pb-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-2">
          <p className="text-green-700 text-sm uppercase tracking-wide">Land&apos;s End • Sumiran Forest</p>
          <h1 className="text-gray-900">Book your stay</h1>
          <p className="text-gray-600 max-w-3xl">
            Choose a room, select your dates, and complete a secure Razorpay payment. Complimentary breakfast and
            guided nature walk included with every booking.
          </p>
        </div>

        <div className="grid gap-5">
          {rooms.map((room) => (
            <RoomBookingCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
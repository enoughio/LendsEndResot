"use client";

import { useEffect, useMemo, useState } from "react";
import { Star, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { BookingType } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AboutHero from "./AboutHero";
import Link from "next/link";

type VisitPackageApi = {
  id: string;
  name: string;
  description: string;
  packageType: "FULL_DAY" | "HALF_DAY" | "SHORT_VISIT";
  duration: number;
  maxActivity: number;
  basePrice: number;
};

type RoomTypeApi = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
};

type ActivityApi = {
  id: string;
  name: string;
  status: string;
};

type BookingCatalogResponse = {
  data: {
    visitPackages: VisitPackageApi[];
    rooms: RoomTypeApi[];
    activities: ActivityApi[];
  };
};

export function OverviewPage() {
  const router = useRouter();
  const [visitPackages, setVisitPackages] = useState<VisitPackageApi[]>([]);
  const [rooms, setRooms] = useState<RoomTypeApi[]>([]);
  const [activitiesData, setActivitiesData] = useState<ActivityApi[]>([]);

  useEffect(() => {
    const loadCatalog = async () => {
      const res = await fetch("/api/bookings");
      if (!res.ok) return;
      const json = (await res.json()) as BookingCatalogResponse;
      setVisitPackages(json.data.visitPackages || []);
      setRooms(json.data.rooms || []);
      setActivitiesData(
        (json.data.activities || []).filter(
          (activity) => activity.status.toUpperCase() !== "INACTIVE",
        ),
      );
    };

    void loadCatalog();
  }, []);

  const fullDayPackage = useMemo(
    () => visitPackages.find((pkg) => pkg.packageType === "FULL_DAY"),
    [visitPackages],
  );

  const halfDayPackage = useMemo(
    () => visitPackages.find((pkg) => pkg.packageType === "HALF_DAY"),
    [visitPackages],
  );

  const onSelectBooking = (type: BookingType, packageId?: string) => {
    if (type === "full-day" || type === "half-day") {
      const visitType = type === "full-day" ? "full" : "half";
      const packageParam = packageId ? `&packageId=${packageId}` : "";
      router.push(`/booking/visit?type=${visitType}${packageParam}`);
    } else if (type === "stay") {
      router.push("/booking/stay");
    }
  };

  const activities = activitiesData.map((activity) => activity.name);

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment:
        "Amazing experience at Sumiran! The jungle trek was breathtaking and our guide was incredibly knowledgeable. The resort amenities were top-notch. Highly recommend the wildlife safari - we saw so many animals in their natural habitat!",
    },
    {
      id: 2,
      name: "Rahul Verma",
      rating: 5,
      comment:
        "Stayed in the Forest Villa and it was perfect for our family. The complimentary activities were well-organized and the staff was very helpful. The food was delicious and the location is stunning. Will definitely come back!",
    },
    {
      id: 3,
      name: "Anita Desai",
      rating: 4,
      comment:
        "Great day visit package! We chose bird watching and kayaking. Both activities were excellent and our guide made it educational. The only suggestion would be to have more vegetarian meal options. Overall a wonderful experience in nature.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/40 via-white to-sky-50/40 px-4 sm:px-6 lg:px-10 xl:px-16">
      {/* Header */}
      <AboutHero />
      <Link href={"/booking/stay"} className="hidden" />
      <Link href={"/booking/visit"} className="hidden" />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 sm:py-10 md:py-12">
        <section className="mb-8 -mt-10 sm:-mt-14 relative z-10">
          <div className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur-sm sm:p-6">
            <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              Plan Your Escape
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-900 sm:text-3xl">
              Book Your Sumiran Experience
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Pick a day visit or immersive stay, customize activities, and
              confirm in a few simple steps.
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-gray-900 text-2xl font-semibold">Overview</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-8 text-sm sm:text-base">
            Welcome to Land’s End – The Last Resort, a forest retreat where you
            slow down, step away from the noise, and reconnect with nature.
            Nestled in the forests of Sumiran, it offers a grounded and
            immersive escape into the wilderness.
            <div className="mb-2" />
            Our forest retreat features comfortable stay options—both
            pocket-friendly and deluxe—along with thoughtfully curated nature
            and adventure experiences. Whether you're seeking a short day visit
            or a peaceful multi-day retreat, Land’s End offers a balanced blend
            of exploration and stillness.
            <div className="mb-2" />
            Guests can engage in forest walks, nature-based activities, and
            adventure experiences designed to deepen their connection with the
            natural surroundings. All experiences are conducted with care,
            ensuring both safety and authenticity.
            <div className="mb-2" />
            Our stay options include shared dorms, deluxe rooms, executive
            rooms, tower rooms, and tent accommodation on request—catering to
            individuals, groups, and varied travel preferences.
            <div className="mb-2" />
            At Land’s End, we believe in simplicity, sustainability, and
            meaningful experiences—allowing you to enjoy nature while respecting
            and preserving it.
          </p>

          {/* Rating Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="bg-linear-to-br from-green-600 to-emerald-700 text-white p-4 rounded-xl shadow-sm">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl">4.8</span>
              </div>
              <div className="text-sm opacity-90">Excellent</div>
              <div className="text-xs opacity-75 mt-1">286 reviews</div>
            </div>
            <div className="border border-gray-200 bg-gray-50/80 p-4 rounded-xl flex flex-col items-center justify-center">
              <Star className="w-6 h-6 text-gray-700 mb-2" />
              <span className="text-gray-700">Wildlife Rich</span>
            </div>
            <div className="border border-gray-200 bg-gray-50/80 p-4 rounded-xl flex flex-col items-center justify-center">
              <Star className="w-6 h-6 text-gray-700 mb-2" />
              <span className="text-gray-700">Expert Guides</span>
            </div>
            <div className="border border-gray-200 bg-gray-50/80 p-4 rounded-xl flex flex-col items-center justify-center">
              <Star className="w-6 h-6 text-gray-700 mb-2" />
              <span className="text-gray-700">Eco-Friendly</span>
            </div>
            <div className="border border-gray-200 bg-gray-50/80 p-4 rounded-xl flex flex-col items-center justify-center">
              <Star className="w-6 h-6 text-gray-700 mb-2" />
              <span className="text-gray-700">Scenic Views</span>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-0 sm:p-6 shadow-sm">
          <div className="mb-6 px-4 pt-5 sm:px-0 sm:pt-0">
            <h2 className="text-gray-900 font-bold text-3xl sm:text-4xl lg:text-5xl pb-3 sm:pb-5">
              Our Offerings
            </h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>

          {/* Day Visits */}
          <div className="mb-8 px-1 ">
            <h3 className="text-gray-900 mb-4 px-4 sm:px-0 font-semibold text-2xl sm:text-3xl lg:text-4xl">
              Day Visit at Sumiran
            </h3>
            <div className="space-y-4">
              {/* Full Day Visit */}
              <div className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-6 border border-gray-200 rounded-xl hover:border-green-500 hover:shadow-sm transition-all">
                <Image
                  src="https://images.unsplash.com/photo-1751931817996-368c9ee352ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwZm9yZXN0fGVufDF8fHx8MTc2MzY5ODIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Full day visit"
                  width={80}
                  height={80}
                  className="rounded object-cover w-full sm:w-20 h-40 sm:h-20"
                />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2 font-semibold">
                    {fullDayPackage?.name || "Full Day Visit at Sumiran"}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {fullDayPackage
                          ? `${fullDayPackage.duration} hours`
                          : "8-10 hours"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{fullDayPackage?.maxActivity || 2} Activities</span>
                    </div>
                  </div>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Choose any 2 activities from our list
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Dedicated forest guide included
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Full forest safari experience
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Meals and refreshments included
                    </li>
                  </ul>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <div className="mb-3">
                    <span className="text-2xl text-gray-900">
                      ₹{(fullDayPackage?.basePrice || 2999).toLocaleString()}
                    </span>
                    <span className="text-gray-600">/person</span>
                  </div>
                  <button
                    onClick={() =>
                      onSelectBooking("full-day", fullDayPackage?.id)
                    }
                    className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book now
                  </button>
                </div>
              </div>

              {/* Half Day Visit */}
              <div className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-6 border border-gray-200 rounded-xl hover:border-green-500 hover:shadow-sm transition-all">
                <Image
                  src="https://images.unsplash.com/photo-1537166947947-46e504aa0555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBhZHZlbnR1cmUlMjBhY3Rpdml0aWVzfGVufDF8fHx8MTc2MzY5ODIxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Half day visit"
                  width={80}
                  height={80}
                  className="rounded object-cover w-full sm:w-20 h-40 sm:h-20"
                />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2 font-semibold">
                    {halfDayPackage?.name || "Half Day Visit at Sumiran"}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {halfDayPackage
                          ? `${halfDayPackage.duration} hours`
                          : "4-5 hours"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{halfDayPackage?.maxActivity || 1} Activity</span>
                    </div>
                  </div>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Choose any 1 activity from our list
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Activity guide included
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Light refreshments included
                    </li>
                  </ul>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <div className="mb-3">
                    <span className="text-2xl text-gray-900">
                      ₹{(halfDayPackage?.basePrice || 1499).toLocaleString()}
                    </span>
                    <span className="text-gray-600">/person</span>
                  </div>
                  <button
                    onClick={() =>
                      onSelectBooking("half-day", halfDayPackage?.id)
                    }
                    className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stay at Sumiran */}
          <div className=" px-1 pb-5 sm:pb-0 pt-2">
            <h3 className="text-gray-900 font-bold text-2xl sm:text-3xl lg:text-4xl px-4 sm:px-0 mb-4">
              Stay at Sumiran
            </h3>
            <div className="p-4 sm:p-6 border border-gray-200 rounded-xl hover:border-green-500 hover:shadow-sm transition-all">
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1630823070635-5fe15b1a7c14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjByZXNvcnR8ZW58MXx8fHwxNzYzNjk4MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Resort stay"
                  width={80}
                  height={80}
                  className="rounded object-cover w-full sm:w-20 h-40 sm:h-20"
                />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2 font-semibold">
                    Immersive Stay Experience
                  </h4>
                  <p className="text-gray-600 mb-3">
                    Choose from 4 luxury room types. All stays include 2
                    complimentary activities with the option to add more.
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      2 complimentary activities per stay
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Add additional activities as needed
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      All meals included
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Access to all resort amenities
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {(rooms.length
                  ? rooms
                  : [
                      {
                        id: "fallback-1",
                        name: "Deluxe Room",
                        description: "Cozy room with forest views",
                        basePrice: 4999,
                      },
                      {
                        id: "fallback-2",
                        name: "Premium Suite",
                        description: "Spacious suite with premium amenities",
                        basePrice: 7999,
                      },
                    ]
                ).map((room) => (
                  <div
                    key={room.id}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <h5 className="text-gray-900 mb-1 font-medium">
                      {room.name}
                    </h5>
                    <p className="text-gray-600 mb-2">{room.description}</p>
                    <span className="text-gray-900">
                      ₹{room.basePrice.toLocaleString()}/night
                    </span>
                  </div>
                ))}
              </div>

              {/* TODO: Re-enable booking functionality */}
              <button
                onClick={() => onSelectBooking("stay")}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Book Your Stay
              </button>
            </div>
          </div>
        </section>

        {/* Available Activities */}
        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-gray-900 text-2xl font-semibold">
              Available Activities
            </h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {(activities.length
              ? activities
              : ["Bird Watching", "Jungle Trek", "Wildlife Safari"]
            ).map((activity, idx) => (
              <div
                key={`${activity}-${idx}`}
                className="p-4 border border-gray-200 rounded-xl text-center bg-gray-50/80 hover:border-green-500 hover:bg-green-50/40 transition-colors"
              >
                <span className="text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-gray-900 text-2xl font-semibold">Location</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4 text-gray-700">
            <MapPin className="w-5 h-5 mt-1 shrink-0 text-green-600" />
            <div>
              <p className="text-gray-900 mb-1">Sumiran Forest Reserve</p>
              <p className="text-gray-600">
                Deep in the heart of pristine wilderness, surrounded by diverse
                flora and fauna. Easily accessible from major cities while
                maintaining complete seclusion.
              </p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-gray-900 text-2xl font-semibold">Reviews</h2>
              <div className="w-12 h-1 bg-green-600 mt-1"></div>
            </div>
            {/* <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Give your review
            </button> */}
          </div>

          {/* Overall Rating */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl text-gray-900">4.8</span>
              <span className="text-gray-600">Excellent</span>
            </div>
            <p className="text-gray-500">286 verified reviews</p>
          </div>

          {/* Review List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h4 className="text-gray-900">{review.name}</h4>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-900">{review.rating}.0</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* <button className="px-3 py-1 text-gray-600 hover:text-gray-900">{"<"}</button> */}
            <span className="text-gray-700">1 of 96</span>
            {/* <button className="px-3 py-1 text-gray-600 hover:text-gray-900">{">"}</button> */}
          </div>
        </section>
      </div>
    </div>
  );
}

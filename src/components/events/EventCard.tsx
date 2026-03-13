import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  image: string;
  title: string;
  shortDescription: string;
  startDate: string; // ISO
  endDate?: string; // ISO, optional for multi-day
  time: string;
  location: string;
  price?: string;
  earlyPrice?: string;
  regularPrice?: string;
  href?: string;
  registrationLink?: string;
  seats?: number;
  earlyBirdDeadline?: string;
};

const formatDate = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
};

const formatDay = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "--" : d.getDate().toString().padStart(2, "0");
};

const formatMonth = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "Date"
    : d.toLocaleDateString(undefined, { month: "short" }).toUpperCase();
};

export default function EventCard({
  image,
  title,
  shortDescription,
  startDate,
  endDate,
  time,
  location,
  price,
  earlyPrice,
  regularPrice,
  href = "#",
  registrationLink,
  seats,
  earlyBirdDeadline,
}: EventCardProps) {
  const isMulti = !!endDate && endDate !== startDate;

  return (
    <article className="group flex flex-col md:flex-row rounded-3xl border border-green-200 bg-white overflow-hidden shadow-[0_15px_40px_-30px_rgba(0,0,0,0.65)] hover:shadow-[0_28px_50px_-30px_rgba(15,23,42,0.5)] transition-all duration-300">
      <div className="relative w-full md:w-[40%] h-80 md:h-auto shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 200px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-2xl bg-white/95 border border-white shadow-md px-3 py-2 text-center min-w-16">
          <p className="text-xl font-semibold leading-none text-gray-900">{formatDay(startDate)}</p>
          <p className="text-[10px] tracking-[0.14em] font-medium text-green-800">{formatMonth(startDate)}</p>
        </div>
      </div>

      <div className="p-5 md:p-7 flex-1 flex flex-col justify-between bg-linear-to-br from-white to-green-50/40">
        <div>
          <h3 className="text-gray-900 text-xl md:text-2xl font-semibold leading-snug">{title}</h3>
          <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">{shortDescription}</p>

          <div className="mt-4 grid gap-2 text-sm text-gray-700">
            <div className="inline-flex items-start gap-2">
              <span className="text-gray-900 font-medium min-w-16">Date</span>
              <span>{formatDate(startDate)}{isMulti ? ` - ${formatDate(endDate as string)}` : ""}</span>
            </div>
            <div className="inline-flex items-start gap-2">
              <span className="text-gray-900 font-medium min-w-16">Time</span>
              <span>{time}</span>
            </div>
            <div className="inline-flex items-start gap-2">
              <span className="text-gray-900 font-medium min-w-16">Location</span>
              <span>{location}</span>
            </div>
            {earlyPrice || regularPrice || price ? (
              <div className="inline-flex items-start gap-2">
                <span className="text-gray-900 font-medium min-w-16">Tickets</span>
                {earlyPrice ? (
                  <span className="inline-flex flex-wrap items-baseline gap-2">
                    <span className="bg-green-100 text-green-900 border border-green-200 px-2 py-0.5 rounded-full text-xs font-semibold">Early Bird {earlyPrice}</span>
                    {regularPrice && <span className="text-gray-500 text-sm line-through">{regularPrice}</span>}
                  </span>
                ) : (
                  <span>{price || regularPrice}</span>
                )}
              </div>
            ) : null}
            {seats ? (
              <div className="inline-flex items-center gap-2">
                <span className="text-gray-900 font-medium">Seats</span>
                <span>{seats} (limited)</span>
              </div>
            ) : null}
            {earlyBirdDeadline ? (
              <div>
                <span className="inline-block bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full text-xs">Early-bird valid till {earlyBirdDeadline}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-5 md:mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-green-100 pt-4">
          <div className="flex items-center gap-3">
            <Link href={href} className="inline-block bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-2xl text-sm font-medium transition-colors">
              View details
            </Link>
            {registrationLink ? (
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white border border-green-700 text-green-800 px-4 py-2 rounded-2xl text-sm font-medium hover:bg-green-50 transition-colors"
              >
                Register
              </a>
            ) : null}
          </div>
          <div className="text-xs text-gray-500">Flexible cancellation</div>
        </div>
      </div>
    </article>
  );
}

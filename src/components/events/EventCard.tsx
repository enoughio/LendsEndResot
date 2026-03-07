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

export default function EventCard({
  image,
  title,
  shortDescription,
  startDate,
  endDate,
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
    <article className="flex flex-col md:flex-row bg-white border border-green-300 rounded-2xl hover:shadow-gray-600 overflow-hidden shadow-sm hover:shadow-lg">
      <div className="relative w-full md:w-[40%] h-96 md:h-auto flex-shrink-0 rounded-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-2xl"
          sizes="(max-width: 768px) 100vw, 200px"
        />
      </div>

      <div className="p-4 md:p-5 md:pl-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-gray-900 text-lg md:text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">{shortDescription}</p>

          <div className="text-sm text-gray-600 space-y-1">
            <div>
              <strong className="text-gray-800">Date:</strong>{" "}
              {formatDate(startDate)}{isMulti ? ` — ${formatDate(endDate as string)}` : ""}
            </div>
            {/* <div>
              <strong className="text-gray-800">Timing:</strong>{" "}{time}{isMulti ? " (Daily)" : ""}
            </div> */}
            <div>
              <strong className="text-gray-800">Location:</strong>{" "}{location}
            </div>
            {earlyPrice || regularPrice || price ? (
              <div>
                <strong className="text-gray-800">Tickets:</strong>{" "}
                {earlyPrice ? (
                  <span className="inline-flex items-baseline gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm font-medium">Early bird {earlyPrice}</span>
                    {regularPrice && <span className="text-gray-500 text-sm line-through">{regularPrice}</span>}
                  </span>
                ) : (
                  <span>{price || regularPrice}</span>
                )}
              </div>
            ) : null}
            {seats ? (
              <div>
                <strong className="text-gray-800">Seats:</strong> {seats} (limited)
              </div>
            ) : null}
            {earlyBirdDeadline ? (
              <div>
                <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">Early-bird valid till {earlyBirdDeadline}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4 md:mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={href} className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl text-sm">
              View details
            </Link>
            {registrationLink ? (
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white border border-green-600 text-green-600 px-4 py-2 rounded-2xl text-sm hover:bg-green-50"
              >
                Register
              </a>
            ) : null}
          </div>
          <div className="text-xs text-gray-500">Free cancellation</div>
        </div>
      </div>
    </article>
  );
}

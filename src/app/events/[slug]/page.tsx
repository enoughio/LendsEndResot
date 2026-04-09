import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Fotter from "@/components/Fotter";
import { events } from "@/data/events";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = (await params) as { slug: string };
  const event = events.find((e) => e.slug === p.slug);
  if (!event) return { title: "Land's End | Event" };
  return {
    title: `Land's End | ${event.title}`,
    description: event.shortDescription,
    openGraph: { images: event.images?.[0] ? [event.images[0]] : undefined },
  } as Metadata;
}

export default async function EventDetails({ params }: { params: Promise<{ slug: string }> }) {
  const p = (await params) as { slug: string };
  const event = events.find((e) => e.slug === p.slug);
  if (!event) return notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <section className="relative h-[320px] md:h-[480px] overflow-hidden">
        <Image src={event.images[0]} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 h-full flex items-end pb-8">
          <div className="text-white max-w-3xl">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold">{event.title}</h1>
            <p className="mt-2 text-gray-200">{event.shortDescription}</p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2 space-y-6 order-last lg:order-first">
          <div className="text-gray-700">
            <h2 className="text-gray-900 text-2xl">About this event</h2>
            {event.description ? (
              <div className="mt-2 space-y-3 text-gray-700">
                {event.description.split(/\n\n+/).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : (
              <p className="mt-2">{event.shortDescription}</p>
            )}
          </div>

          {/* Structured sections from event data (matches PDF layout) */}
          {event.sections?.map((s) => (
            <section key={s.title} className="pt-4">
              <h3 className="text-gray-900 text-xl mb-3">{s.title}</h3>
              {s.paragraphs?.map((p, idx) => (
                <p key={idx} className="text-gray-700 mb-3">{p}</p>
              ))}
              {s.bullets && (
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {event.images && event.images.length > 1 && (
            <section>
              <h3 className="text-gray-900 text-xl mb-3">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {event.images.map((src) => (
                  <div key={src} className="aspect-video relative rounded overflow-hidden">
                    <Image src={src} alt={event.title} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="space-y-4 order-first lg:order-last">
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="text-sm text-gray-600">
              <div className="mb-3">
                <strong className="text-gray-800">Date:</strong>{" "}
                {event.startDate}{event.endDate ? ` — ${event.endDate}` : ""}
              </div>
              <div className="mb-3">
                <strong className="text-gray-800">Timing:</strong>{" "}{event.time}
              </div>
              <div className="mb-3">
                <strong className="text-gray-800">Location:</strong>{" "}{event.location}
              </div>

              {/* Pricing block */}
              {(event.earlyPrice || event.regularPrice || event.price) && (
                <div className="mb-3">
                  <strong className="text-gray-800">Contribution</strong>
                  <div className="mt-2">
                    {event.earlyPrice ? (
                      <div className="flex items-baseline gap-3">
                        <div className="text-lg font-semibold text-green-700">Early bird {event.earlyPrice}</div>
                        {event.regularPrice && <div className="text-sm text-gray-500 line-through">{event.regularPrice}</div>}
                      </div>
                    ) : (
                      <div className="text-lg font-semibold">{event.price || event.regularPrice}</div>
                    )}
                    {event.earlyBirdDeadline && <div className="text-xs text-gray-500">Early bird until {event.earlyBirdDeadline}</div>}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              <a
                id="book"
                href={event.registrationLink ?? '#'}
                target={event.registrationLink ? "_blank" : undefined}
                rel={event.registrationLink ? "noopener noreferrer" : undefined}
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {event.registrationLink ? 'Book tickets' : 'Book tickets'}
              </a>

              {event.seats ? (
                <div className="text-sm text-gray-700">Seats: <strong className="text-gray-900">{event.seats}</strong> (limited)</div>
              ) : null}

              {event.contact && event.contact.length > 0 ? (
                <div className="text-sm text-gray-700">
                  <div className="text-gray-900 font-medium">Contact Us:</div>
                  <div className="mt-1 space-y-1">
                    {event.contact.map((c) => (
                      <div key={c}><a href={`tel:${c.replace(/\s+/g, '')}`} className="text-green-700">{c}</a></div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {event.includes && (
            <div className="p-4 border border-gray-100 rounded-lg text-sm text-gray-700">
              <h4 className="text-gray-900 mb-2">Includes</h4>
              <ul className="list-disc ml-5 space-y-1">
                {event.includes.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
            </div>
          )}

          {event.excludes && (
            <div className="p-4 border border-gray-100 rounded-lg text-sm text-gray-700">
              <h4 className="text-gray-900 mb-2">Excludes</h4>
              <ul className="list-disc ml-5 space-y-1">
                {event.excludes.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            </div>
          )}

          {event.whoFor && (
            <div className="p-4 border border-gray-100 rounded-lg text-sm text-gray-700">
              <h4 className="text-gray-900 mb-2">Who is this for?</h4>
              <ul className="list-disc ml-5 space-y-1">
                {event.whoFor.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-4 border border-gray-100 rounded-lg text-sm text-gray-600">
            <h4 className="text-gray-900 mb-2">What to bring</h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>Comfortable shoes</li>
              <li>Sun protection</li>
              <li>Water bottle</li>
            </ul>
          </div>
        </aside>
      </main>

      <Fotter />
    </div>
  );
}

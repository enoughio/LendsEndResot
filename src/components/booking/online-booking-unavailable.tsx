import Link from "next/link";
import { AlertCircle } from "lucide-react";
import {
  ONLINE_BOOKING_UNAVAILABLE_MESSAGE,
} from "@/lib/service-status";

export function OnlineBookingUnavailable() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-emerald-50/40 px-6 py-16">
      <section className="w-full max-w-xl rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm sm:p-12">
        <AlertCircle className="mx-auto h-12 w-12 text-emerald-700" aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-semibold text-gray-900">
          Online booking is not available yet
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          {ONLINE_BOOKING_UNAVAILABLE_MESSAGE}
        </p>
        <Link
          href="/contact"
          className="mt-7 inline-flex rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          Contact us
        </Link>
      </section>
    </main>
  );
}

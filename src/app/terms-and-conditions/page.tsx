import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Land's End Resort at Sumiran",
  description:
    "Read the booking, cancellation, payment, and stay terms for Land's End Resort at Sumiran.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-emerald-50/40 via-white to-sky-50/40 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-semibold text-gray-900">Terms & Conditions</h1>
        <p className="mt-2 text-sm text-gray-600">Last updated: March 12, 2026</p>

        <div className="mt-6 space-y-5 text-sm leading-7 text-gray-700 sm:text-base">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">1. Booking and Payment</h2>
            <p>
              All bookings are subject to availability and are confirmed only after successful payment. The guest must provide
              accurate contact and guest details during checkout.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">2. Check-In and Visit Timing</h2>
            <p>
              Standard check-in and check-out timings apply for stay bookings. For day visits, guests are requested to report at
              least 30 minutes before the scheduled slot.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">3. Cancellations and Rescheduling</h2>
            <p>
              Cancellation and rescheduling requests are processed according to the active policy shared during booking. Any refund,
              if applicable, will be initiated to the original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">4. Guest Responsibilities</h2>
            <p>
              Guests must follow safety instructions provided by guides and resort staff. The resort reserves the right to deny
              participation in activities if safety rules are violated.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">5. Contact</h2>
            <p>
              For support, contact us at <strong>+91 8871317382</strong> or <strong>landsend.sumiran@gmail.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

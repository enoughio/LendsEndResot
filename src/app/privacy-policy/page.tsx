import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Land's End Resort at Sumiran",
  description:
    "Learn how Land's End Resort at Sumiran collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-emerald-50/40 via-white to-sky-50/40 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-semibold text-gray-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-600">Last updated: March 12, 2026</p>

        <div className="mt-6 space-y-5 text-sm leading-7 text-gray-700 sm:text-base">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">1. Information We Collect</h2>
            <p>
              We collect information such as name, email, phone number, booking details, and payment metadata required to process
              reservations and provide support.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">2. How We Use Information</h2>
            <p>
              Your information is used to confirm bookings, share booking communications, provide customer support, and improve our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">3. Data Protection</h2>
            <p>
              We use reasonable security measures to protect personal information. Payment transactions are processed through secure,
              trusted payment providers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">4. Data Sharing</h2>
            <p>
              We do not sell personal data. Information is shared only with service providers required to deliver booking and payment
              functionality, or when legally required.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">5. Contact</h2>
            <p>
              For privacy-related queries, contact us at <strong>landsend.sumiran@gmail.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

import React from "react";
import WorkWithUsForm from "@/components/aboutPage/WorkWithUsForm";

export const metadata = {
  title: "Lend's End | Work With Us",
  description: "Join our team at Landsend. Submit your details and we'll get in touch.",
};

export default function WorkWithUsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:pt-25 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <section>
          <h1 className="text-3xl font-bold mb-4">Work with us</h1>
          <p className="text-gray-700 mb-4">We&apos;re always looking for passionate people to join our team. Whether you&apos;re interested in hospitality, events, guiding, or operations — tell us about yourself and what role you&apos;d like to explore.</p>

          <h3 className="text-xl font-semibold mb-2">What to expect</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Opportunities in guest services, events and site operations.</li>
            <li>Flexible roles with training and development.</li>
            <li>Friendly, nature-focused working environment.</li>
          </ul>

          <p className="text-gray-700">Fill in the form and we&apos;ll review your submission. If we think there&apos;s a fit, we&apos;ll reach out via email or phone to discuss next steps.</p>
        </section>

        <section>
          <div className="bg-white p-6 rounded-md shadow">
            <h2 className="text-2xl font-semibold mb-4">Apply / Enquire</h2>
            <WorkWithUsForm />
          </div>
        </section>
      </div>
    </main>
  );
}

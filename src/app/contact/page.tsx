import React from "react";
import { Metadata } from 'next';
import ContactHero from "@/components/contactPage/ContactHero";
import ContactInfo from "@/components/contactPage/contactInfo";
import Fotter from "@/components/Fotter";

export const metadata: Metadata = {
  title: "Land's End | Contact Us",
  description: "Get in touch with Land's End Resort at Sumiran Forest. Phone: +91 6268244196 | Email: landsend.sumiran@gmail.com | Located near Bhopal, Madhya Pradesh 462038.",
  openGraph: {
    title: "Contact Land's End Resort | Sumiran Forest",
    description: "Reach out to us for bookings, inquiries, or more information about our eco resort near Bhopal.",
  },
};

const Contact = () => {

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/40 via-white to-sky-50/40">
      <ContactHero />
      <ContactInfo/>
      <section className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-6">
        <div className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm md:p-8">
          <h2 className="text-2xl md:text-3xl text-gray-900">Contact FAQ</h2>
          <div className="mt-2 h-1 w-12 bg-green-600" />
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-3xl">
            Common questions about reaching Land&apos;s End Resort, booking support, and planning your visit in
            Sumiran Forest near Bhopal.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-5">
              <h3 className="text-gray-900 font-semibold">What is the fastest way to contact the resort?</h3>
              <p className="mt-2 text-sm md:text-base text-gray-700">
                Call or email our team for booking support, event inquiries, and availability. We respond quickly
                during business hours.
              </p>
            </div>
    
            <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-5">
              <h3 className="text-gray-900 font-semibold">Can I book a day visit or a group outing?</h3>
              <p className="mt-2 text-sm md:text-base text-gray-700">
                Yes, we offer day visit packages and group bookings. Share your dates and group size, and we will
                suggest the right package.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-5">
              <h3 className="text-gray-900 font-semibold">Where is Land&apos;s End Resort located?</h3>
              <p className="mt-2 text-sm md:text-base text-gray-700">
                We are located in Sumiran Forest near Bhopal, Madhya Pradesh. The contact section includes the
                exact address and directions.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-5">
              <h3 className="text-gray-900 font-semibold">How early should I contact you for events?</h3>
              <p className="mt-2 text-sm md:text-base text-gray-700">
                For retreats, celebrations, or corporate events, reach out at least 2 to 4 weeks in advance so we
                can reserve spaces and customize your itinerary.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Fotter />
    </div>
  );
};

export default Contact;



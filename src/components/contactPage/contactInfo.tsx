'use client'

import React from "react";
import ContactForm from "./ContactForm";
import Image from "next/image";
import Link from "next/link";

const ContactInfo = () => {
  return (
    <div className="w-full py-12 lg:py-18 px-[6vw] md:px-[8vw]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-5">
            {/* Call To Us Section */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="relative w-6 h-6">
                    <Image
                      src="/icons/call.png"
                      alt="Phone"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Call To Us
                </h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p className="text-base">
                  We are available to assist you with your journey to nature 24/7.
                </p>
                <p className="text-base font-medium">Phone: +91 6268244196, +91 8871317382</p>
              </div>
            </div>

            {/* Write To Us Section */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6 ">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="relative w-6 h-6">
                    <Image
                      src="/icons/email.png"
                      alt="Email"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Write To US
                </h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p className="text-base">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="text-base">Email: landsend.sumiran@gmail.com</p>
                <p className="text-base">Website: sumiran.org</p>
                <div className="flex flex-wrap gap-3 pt-1 text-sm text-green-700">
                  <Link href="/terms-and-conditions" className="hover:text-green-800">Terms &amp; Conditions</Link>
                  <Link href="/privacy-policy" className="hover:text-green-800">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Contact form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

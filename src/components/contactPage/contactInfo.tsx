import React from "react";
import ContactForm from "./ContactForm";
import Image from "next/image";

const ContactInfo = () => {
  return (
    <div className="w-full bg-gray-50 py-12 lg:py-18 px-[8vw]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-8 md:space-y-12 lg:block md:flex justify-between">
            {/* Call To Us Section */}
            <div>
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
                  We are available 24/7, 7 days a week.
                </p>
                <p className="text-base font-medium">Phone: +880161112222</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t md:border-l border-gray-300"></div>

            {/* Write To Us Section */}
            <div className="md:max-w-[50%] lg:max-w-full">
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
                <p className="text-base">Emails: customer@exclusive.com</p>
                <p className="text-base">Emails: support@exclusive.com</p>
              </div>
            </div>
          </div>
          {/* Right Column - Contact form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

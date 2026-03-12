import React from "react";
import { Metadata } from 'next';
import ContactHero from "@/components/contactPage/ContactHero";
import ContactInfo from "@/components/contactPage/contactInfo";
import Fotter from "@/components/Fotter";

export const metadata: Metadata = {
  title: "Lend's End | Contact Us",
  description: "Get in touch with Land's End Resort at Sumiran Forest. Phone: +91 8871317382 | Email: landsend.sumiran@gmail.com | Located near Bhopal, Madhya Pradesh 462038.",
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
      <Fotter />
    </div>
  );
};

export default Contact;



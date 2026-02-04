import React from "react";
import ContactHero from "@/components/contactPage/ContactHero";
import ContactInfo from "@/components/contactPage/contactInfo";
import Fotter from "@/components/Fotter";

const Contact = () => {
  return (
    <div>
      <ContactHero />
      <ContactInfo/>
      <Fotter />
    </div>
  );
};

export default Contact;

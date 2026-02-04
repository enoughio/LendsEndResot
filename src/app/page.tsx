import { Metadata } from 'next';
import Fotter from "@/components/Fotter";
import AboutSerenity from "@/components/home/AboutSerenity";  
import Activites from "@/components/home/Activites";
import Dining from "@/components/home/Dining";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero"; 
import Location from "@/components/home/Location";

export const metadata: Metadata = {
  title: "Home",
  description: "Discover Land's End Resort at Sumiran Forest - A 600-acre eco resort near Bhopal with pristine nature, clean air (AQI <10), and sustainable living. Experience forest walks, bird watching, organic dining, and more.",
  openGraph: {
    title: "Land's End Resort | Sumiran Forest - Eco Resort Near Bhopal",
    description: "Discover 600 acres of pristine forest with activities like bird watching, forest walks, stargazing, and organic dining.",
    images: ['/gallery/room1.jpeg'],
  },
};


export default function Home() {
  return (
    <div className="h-screen">
      <Hero />
      <AboutSerenity />
      <Activites />
      <Dining />
      <Gallery />
      <Location />
      {/* <Testimonials /> */}
      <Fotter />
    </div>
  );
}

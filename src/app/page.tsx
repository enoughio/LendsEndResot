import Fotter from "@/components/Fotter";
import AboutSerenity from "@/components/home/AboutSerenity";  
import Activites from "@/components/home/Activites";
import Dining from "@/components/home/Dining";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero"; 
import Location from "@/components/home/Location";


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

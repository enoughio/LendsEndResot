import AboutSerenity from "@/components/home/AboutSerenity";  
import Activites from "@/components/home/Activites";
import Dining from "@/components/home/Dining";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero"; 

export default function Home() {
  return (
    <div className="h-screen">
      <Hero />
      <AboutSerenity />
      <Activites />
      < Dining />
      {/* < Gallery /> */}
      <div className="w-full h-screen">

      </div>


    </div>
  );
}

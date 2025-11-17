import AboutSerenity from "@/components/home/AboutSerenity";  
import Activites from "@/components/home/Activites";
import Hero from "@/components/home/Hero"; 

export default function Home() {
  return (
    <div className="h-screen">
      <Hero />
      <AboutSerenity />
      <Activites />


    </div>
  );
}

import { Metadata } from 'next';
import Fotter from "@/components/Fotter";
import AboutSerenity from "@/components/home/AboutSerenity";  
import Activites from "@/components/home/Activites";
import Dining from "@/components/home/Dining";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero"; 
import IdealFor from "@/components/home/IdealFor";
import Location from "@/components/home/Location";

import "reflect-metadata";


export const metadata: Metadata = {
  title: "Lend's End | Home",
  description: "Discover Land's End Resort at Sumiran Forest - A 600-acre eco resort near Bhopal with pristine nature, clean air (AQI <10), and sustainable living. Experience forest walks, bird watching, organic dining, and more.",
  openGraph: {
    title: "Land's End Resort | Sumiran Forest - Eco Resort Near Bhopal",
    description: "Discover 600 acres of pristine forest with activities like bird watching, forest walks, stargazing, and organic dining.",
    images: ['/gallery/room1.jpeg'],
  },
};

const seoKeywords = [
  "Land's End Resort",
  "Lands End Resort Bhopal",
  "Land's End Sumiran Forest",
  "Sumiran Forest resort",
  "Bhopal eco resort",
  "eco resort near Bhopal",
  "nature resort Madhya Pradesh",
  "forest resort Bhopal",
  "wildlife resort Bhopal",
  "luxury forest stay",
  "weekend getaway Bhopal",
  "family resort Bhopal",
  "romantic resort Bhopal",
  "couple getaway Bhopal",
  "group stay Bhopal",
  "corporate retreat Bhopal",
  "team outing Bhopal",
  "offsite retreat Bhopal",
  "destination wedding venue Bhopal",
  "wedding resort Bhopal",
  "birthday party venue Bhopal",
  "anniversary getaway Bhopal",
  "day visit resort Bhopal",
  "day outing Bhopal",
  "staycation Bhopal",
  "nature stay near Bhopal",
  "resort near Bhopal",
  "resort near airport Bhopal",
  "resort near Bhojpur",
  "resort near Kerwa",
  "resort near Van Vihar",
  "resort near Sanchi",
  "resort near Udayagiri",
  "resort near Raisen",
  "eco-friendly stay",
  "sustainable resort",
  "green resort India",
  "low AQI resort",
  "clean air resort",
  "oxygen rich resort",
  "forest walk experience",
  "guided nature trails",
  "bird watching Bhopal",
  "stargazing resort",
  "night sky views",
  "sunset point resort",
  "sunrise views resort",
  "bonfire nights",
  "campfire experience",
  "outdoor activities resort",
  "adventure activities Bhopal",
  "cycling trails",
  "nature photography spot",
  "peaceful retreat",
  "quiet resort stay",
  "wellness retreat Bhopal",
  "yoga retreat Bhopal",
  "meditation in forest",
  "spa resort Bhopal",
  "relaxation getaway",
  "organic dining",
  "local cuisine resort",
  "farm to table dining",
  "fresh breakfast resort",
  "vegetarian resort dining",
  "family friendly resort",
  "kids friendly resort",
  "pet friendly resort",
  "senior friendly resort",
  "accessible resort Bhopal",
  "private cottages Bhopal",
  "luxury cottages",
  "forest view rooms",
  "lake view resort",
  "nature view rooms",
  "premium suites Bhopal",
  "budget resort Bhopal",
  "best resort Bhopal",
  "top resort Bhopal",
  "resort with activities",
  "resort with pool Bhopal",
  "swimming pool resort",
  "indoor games resort",
  "outdoor games resort",
  "conference hall Bhopal",
  "meeting room resort",
  "banquet hall Bhopal",
  "event venue resort",
  "photography location Bhopal",
  "pre wedding shoot Bhopal",
  "eco tourism Madhya Pradesh",
  "nature tourism Bhopal",
  "forest tourism India",
  "wildlife escape",
  "rustic luxury resort",
  "heritage style resort",
  "boutique resort Bhopal",
  "private resort booking",
  "resort booking online",
  "secure resort booking",
  "best time to visit Bhopal resort",
  "monsoon getaway Bhopal",
  "winter getaway Bhopal",
  "summer resort Bhopal",
  "weekend resort deals",
  "holiday resort packages",
  "stay packages Bhopal",
  "day visit packages",
  "corporate packages",
  "family packages",
  "couple packages",
  "school picnic resort",
  "college outing resort",
  "nature education tours",
  "eco learning trips",
  "team building activities",
  "forest adventure camp",
  "nature camp Bhopal",
  "glamping near Bhopal",
  "camping resort Bhopal",
  "rainy day retreat",
  "peaceful forest resort",
  "safe resort Bhopal",
  "clean rooms resort",
  "hygienic resort stay",
  "24x7 security resort",
  "parking available resort",
  "easy check in resort",
  "early check in Bhopal",
  "late checkout resort",
  "open lawn resort",
  "garden resort Bhopal",
  "children play area resort",
  "nature park resort",
  "eco cottages Bhopal",
  "wooden cottages resort",
  "stone cottages resort",
  "luxury tents Bhopal",
  "riverside resort Bhopal",
  "forest edge resort",
  "secluded resort Bhopal",
  "romantic dinner resort",
  "candlelight dinner Bhopal",
  "private dining resort",
  "local sightseeing Bhopal",
  "nearby attractions Bhopal",
  "resort near tourist spots",
  "book resort in Bhopal",
  "best eco resort India",
  "Land's End booking",
];


export default function Home() {
  return (
    <div className="h-screen">
      <Hero />
      <AboutSerenity />
      <Activites />
      <IdealFor />
      <Dining />
      <Gallery />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Resort Highlights & Search Phrases
        </h2>
        <p className="mt-3 text-sm text-neutral-600">
          Guests search for Land's End Resort using many different phrases.
          Here are common terms that describe the forest setting, experiences,
          and stays around Bhopal.
        </p>
        <p className="mt-3 text-sm text-neutral-600">
          Use these highlights to find the right getaway, whether you want a
          quiet nature stay, a family outing, or a weekend escape in the
          Sumiran Forest.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-neutral-700 sm:grid-cols-2 lg:grid-cols-3">
          {seoKeywords.map((keyword) => (
            <li key={keyword} className="rounded-md bg-neutral-50 px-3 py-2">
              {keyword}
            </li>
          ))}
        </ul>
      </section>
      <Location />
      {/* <Testimonials /> */}
      <Fotter />
    </div>
  );
}

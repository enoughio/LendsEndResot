// import type { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// import Fotter from "@/components/Fotter";

// export const metadata: Metadata = {
//   title: "Sumiran Forest Immersion Camp | Land's End Resort",
//   description:
//     "Residential summer camp (ages 10-16) in Sumiran Forest with adventure, learning, and nature immersion at Land's End Resort near Bhopal.",
//   openGraph: {
//     title: "Sumiran Forest Immersion Camp",
//     description:
//       "Adventure, fun, and learning for ages 10-16 in a living forest ecosystem near Bhopal.",
//     images: ["/gallery/kids.jpeg"],
//   },
// };

// const campDates = [
//   "4-7 May 2026",
//   "7-10 May 2026",
//   "11-14 May 2026",
//   "14-17 May 2026",
//   "25-28 May 2026",
//   "28-31 May 2026",
//   "1-4 June 2026",
//   "4-7 June 2026",
// ];

// const whyThisCampGaps = [
//   "Real-life exposure and hands-on learning",
//   "Confidence in communication",
//   "Opportunities for independent thinking",
//   "Connection with nature and sustainable practices",
// ];

// const whyThisCampResponse = [
//   "Hands-on forest activities, creation labs, and real-world sustainability tasks.",
//   "Guided storytelling, public speaking, and expression circles every day.",
//   "Problem-solving challenges, teamwork missions, and reflection sessions.",
//   "Daily nature immersion, biodiversity learning, and mindful living practices.",
// ];

// const coreLearningFocus = [
//   {
//     title: "Storytelling and Public Speaking",
//     description:
//       "Children build confidence in expression through storytelling, speaking exercises, discussions, and performance.",
//   },
//   {
//     title: "Build a Strong Body and Mind",
//     description:
//       "Simple daily practices to improve focus, energy, emotional balance, and wellbeing based on Life Without Medicine principles.",
//   },
//   {
//     title: "Embracing Excellence",
//     description:
//       "Sessions on discipline, mindset, responsibility, and personal growth that shape a strong life approach.",
//   },
//   {
//     title: "Sustainability and Real-World Learning",
//     description:
//       "Organic farming, water conservation, waste management, forest development, and mindful living through direct experience.",
//   },
// ];

// const sustainabilityExperience = [
//   "Visit the Sumiran Gaushala to understand how a biogas plant works",
//   "Learn how waste is converted into usable energy",
//   "Experience sustainability through real systems in action",
// ];

// const adventureHighlights = [
//   "Zipline",
//   "Archery and shooting activities",
//   "Mud baths",
//   "Rural games and traditional sports",
//   "Scavenger hunt and team challenges",
//   "Music, dance, and jamming sessions",
//   "Stargazing and astronomical storytelling",
// ];

// const adventureBuilds = [
//   "Confidence and courage",
//   "Teamwork and collaboration",
//   "Physical coordination and resilience",
//   "Social bonding",
// ];

// const natureImmersion = [
//   "Guided forest walks",
//   "Bird watching and observation",
//   "Understanding ecosystems and biodiversity",
//   "Learning coexistence with nature",
// ];

// const handsOnCreation = [
//   "Collect plant samples",
//   "Learn their ecological importance",
//   "Create a personal herbarium to take home",
// ];

// const stayAndLiving = [
//   "Air-conditioned shared dormitories",
//   "Safe and supervised environment",
//   "Structured yet comfortable residential setup",
//   "Community living that builds responsibility, independence, and cooperation",
// ];

// const dailyGlimpse = [
//   "Morning wellness and nature activities",
//   "Hands-on learning sessions",
//   "Adventure and outdoor experiences",
//   "Evening storytelling, expression, and reflection",
//   "Night-time stargazing and group bonding",
// ];

// const outcomes = [
//   "Become more confident and expressive",
//   "Improve communication and public speaking skills",
//   "Develop stronger character, discipline, and values",
//   "Build leadership and teamwork abilities",
//   "Enhance thinking and decision-making skills",
//   "Become more independent and self-aware",
//   "Develop respect for nature and sustainability",
// ];

// const facilitators = [
//   {
//     name: "Mr Rajesh Gupta, (IPS)",
//     role: "Chief Mentor and Programme Head",
//     details: "ADG (Retd.), MP Police | Creator of Sumiran Forest",
//     image: "/events/rajeshGupta.png",
//   },
//   {
//     name: "Dr Monika Gupta",
//     role: "Chief Wellness Mentor",
//     details: "MBBS | Professor | Certified Yoga Trainer | Holistic Health Practitioner",
//     image: "/events/monikaGupta.png",
//   },
//   {
//     name: "Cmde Manoj Bhuraria (Retd.)",
//     role: "Life Coach, Counsellor and Mentor",
//     details: "Guides confidence building, reflection, and character development",
//     image: "/events/cmdeManojbhuraria.png",
//   },
//   {
//     name: "Mrs Jyoti Pande",
//     role: "Storyteller and Psychologist",
//     details: "Leads expression, storytelling, and emotional learning",
//     image: "/events/jyotiPandey.png",
//   },
//   {
//     name: "Mr Aviral Pawaar",
//     role: "Camp Director and Programme Coordinator",
//     details: "Leads execution, safety, and participant experience",
//     image: "/events/aviralPawar.png",
//   },
// ];

// export default function SumiranForestImmersionCampPage() {
//   return (
//     <div className="min-h-screen bg-linear-to-br from-emerald-100 via-amber-50 to-sky-100 ">
//       <section className="relative overflow-hidden pt-5">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_60%)]" />
//         <div className="absolute -top-24 left-6 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" />
//         <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl" />
//         <div className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" />

//         <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-10">
//           <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
//             <div>
//                        <div className="md:inline-flex hidden   items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs md:text-sm text-emerald-800 border border-emerald-100">
//                 Residential Summer Camp | Ages 10-16
//               </div>
       
//               <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-900">
//                 {/* Sumiran Forest Immersion Camp */}
//                 Sumiran Forest Residential Summer Camp
//               </h1>
//               <p className="mt-4 text-sm md:text-lg text-gray-700 max-w-2xl">
//                 Adventure. Fun. Learning. Character. 
//                 <br />
//                 <br />
//                 A three-day, three-night residential camp in a living forest
//                 ecosystem near Bhopal where nature becomes the teacher.
//               </p>
              

//               <div className="mt-6 flex flex-wrap gap-3 text-xs md:text-sm">
//                 <span className="rounded-full bg-emerald-100/80 text-emerald-800 px-3 py-1">3 days, 3 nights</span>
//                 <span className="rounded-full bg-amber-100/80 text-amber-900 px-3 py-1">Limited seats per batch</span>
//                 <div className=" md:hidden inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs md:text-sm text-emerald-800 border border-emerald-100">
//                 Residential Summer Camp | Ages 10-16
//               </div>
//                 <span className="rounded-full bg-sky-100/80 text-sky-900 px-3 py-1">Safe and supervised</span>
//               </div>

//               <div className="mt-6 flex flex-col sm:flex-row gap-3">
//                 <Link
//                   href="#registration"
//                   className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-white text-sm md:text-base hover:bg-emerald-700 transition-colors"
//                 >
//                   Registration Info
//                 </Link>
//                 <Link
//                   href="#dates"
//                   className="inline-flex items-center justify-center rounded-lg border border-emerald-200 px-5 py-3 text-emerald-700 text-sm md:text-base hover:bg-emerald-50 transition-colors"
//                 >
//                   View Camp Dates
//                 </Link>
//               </div>
//             </div>

//             <div className="relative">
//               <div className="absolute -inset-2 rounded-3xl bg-linear-to-br from-emerald-200/70 via-transparent to-amber-100/70 blur-xl" />
//               <div className="relative rounded-3xl overflow-hidden border border-white/70 shadow-xl">
//                 <Image
//                   src="/gallery/kids.jpeg"
//                   alt="Forest walk in Sumiran"
//                   width={600}
//                   height={480}
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white/90 px-4 py-3 text-xs md:text-sm shadow-lg border border-emerald-100 font-bold">
//                 Land&apos;s End - The Last Resort, Sumiran Forest
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
//         <div className="absolute left-8 top-10 h-16 w-16 rounded-full border border-emerald-200/70 bg-white/60 backdrop-blur-sm" />
//         <div className="absolute right-8 bottom-14 h-12 w-12 rounded-full border border-amber-200/70 bg-amber-100/60" />

//         <div className="relative grid gap-6 lg:grid-cols-2">
//           <article className="rounded-3xl border border-emerald-100 bg-white/80 p-6 md:p-8 shadow-sm backdrop-blur-sm">
//             <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-700">About Sumiran</p>
//             <h2 className="mt-3 text-2xl md:text-3xl text-gray-900">A living forest designed for deeper learning</h2>
//             <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-700">
//               Sumiran is a 300-acre man-made, living, breathing forest, thoughtfully developed as a space for
//               learning, reflection, and sustainable living. It is not just a destination, but an ecosystem where
//               children can experience life beyond screens and classrooms, and reconnect with nature in a meaningful
//               way.
//             </p>
//           </article>

//           <article className="rounded-3xl border border-amber-100 bg-linear-to-br from-amber-50/90 via-white to-emerald-50/70 p-6 md:p-8 shadow-sm">
//             <p className="text-xs font-semibold tracking-[0.16em] uppercase text-amber-700">About The Camp</p>
//             <h2 className="mt-3 text-2xl md:text-3xl text-gray-900">Immersive growth in 3 days and 3 nights</h2>
//             <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-700">
//               The Sumiran Forest Residential Summer Camp is a carefully designed immersive experience that helps
//               children grow into more confident, aware, and self-reliant individuals. Through adventure, experiential
//               learning, and guided reflection, participants build life skills while enjoying nature.
//             </p>
//             <div className="mt-5 grid grid-cols-2 gap-3 text-xs md:text-sm">
//               <div className="rounded-xl bg-white/80 px-3 py-2 text-emerald-800 border border-emerald-100">Ages 10-16</div>
//               <div className="rounded-xl bg-white/80 px-3 py-2 text-emerald-800 border border-emerald-100">3 Days, 3 Nights</div>
//             </div>
//           </article>
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
//         <div className="rounded-3xl border border-emerald-200/60 bg-linear-to-br from-emerald-900 via-emerald-800 to-slate-900 p-6 md:p-8 shadow-xl">
//           <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
//             <article className="rounded-2xl border border-white/15 bg-white/10 p-5 md:p-6 backdrop-blur-sm">
//               <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-200">Why This Camp</p>
//               <h2 className="mt-3 text-2xl md:text-3xl text-white">From screen fatigue to real growth</h2>
//               <p className="mt-3 text-sm md:text-base text-emerald-50/95">
//                 In today&apos;s fast-paced, screen-driven world, children often miss vital developmental experiences. This
//                 camp closes those gaps through practical learning, adventure, and guided reflection in nature.
//               </p>
//               <div className="mt-5 grid grid-cols-2 gap-3 text-xs md:text-sm">
//                 <div className="rounded-xl border border-emerald-200/30 bg-emerald-300/10 px-3 py-2 text-emerald-100">
//                   300-acre living forest
//                 </div>
//                 <div className="rounded-xl border border-emerald-200/30 bg-emerald-300/10 px-3 py-2 text-emerald-100">
//                   3 days, 3 nights immersion
//                 </div>
//                 <div className="rounded-xl border border-emerald-200/30 bg-emerald-300/10 px-3 py-2 text-emerald-100">
//                   Guided by expert mentors
//                 </div>
               
//               </div>
//             </article>

//             <div className="grid gap-3 sm:grid-cols-2">
//               {whyThisCampGaps.map((gap, index) => (
//                 <article key={gap} className="rounded-2xl border border-white/15 bg-white/10 p-4 md:p-5">
//                   <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-200">
//                     Gap {index + 1}
//                   </p>
//                   <p className="mt-2 text-sm md:text-base text-white">{gap}</p>
//                   <div className="my-3 h-px bg-white/20" />
//                   <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-emerald-200">
//                     Camp Response
//                   </p>
//                   <p className="mt-2 text-sm text-emerald-50/95">{whyThisCampResponse[index]}</p>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
//         <div className="flex items-end justify-between gap-4">
//           <div>
//             <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-700">Core Learning Focus</p>
//             <h2 className="mt-2 text-2xl md:text-3xl text-gray-900">Character, confidence, wellbeing, and sustainability</h2>
//           </div>
//           <div className="hidden md:block rounded-full border border-emerald-100 bg-white/70 px-4 py-2 text-xs text-emerald-700">
//             Adventure. Fun. Learning. Character.
//           </div>
//         </div>

//         <div className="mt-6 grid gap-4 md:grid-cols-2">
//           {coreLearningFocus.map((focus) => (
//             <article key={focus.title} className="rounded-2xl border border-emerald-100 bg-white/75 p-5 shadow-sm">
//               <h3 className="text-lg md:text-xl text-gray-900">{focus.title}</h3>
//               <p className="mt-2 text-sm md:text-base text-gray-700">{focus.description}</p>
//             </article>
//           ))}
//         </div>

//         <article className="mt-5 rounded-2xl border border-amber-100 bg-linear-to-r from-amber-50/90 via-white to-emerald-50/70 p-5 md:p-6">
//           <h3 className="text-lg md:text-xl text-gray-900">Special Experience: Turning Waste into Energy</h3>
//           <ul className="mt-3 grid gap-2 md:grid-cols-3 text-sm md:text-base text-gray-700">
//             {sustainabilityExperience.map((item) => (
//               <li key={item} className="rounded-xl bg-white/80 px-4 py-3 border border-amber-100">{item}</li>
//             ))}
//           </ul>
//         </article>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
//         <div className="grid gap-6 lg:grid-cols-2">
//           <article className="rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50/80 via-white to-emerald-100/40 p-6 shadow-sm">
//             <h2 className="text-2xl md:text-3xl text-gray-900">Adventure, Fun and Experiences</h2>
//             <ul className="mt-4 grid gap-2 text-sm md:text-base text-gray-700">
//               {adventureHighlights.map((item) => (
//                 <li key={item} className="rounded-xl bg-white/75 px-4 py-3 border border-emerald-100">{item}</li>
//               ))}
//             </ul>
//             <p className="mt-5 text-xs font-semibold tracking-[0.14em] uppercase text-emerald-700">These activities help build</p>
//             <div className="mt-3 flex flex-wrap gap-2">
//               {adventureBuilds.map((item) => (
//                 <span key={item} className="rounded-full bg-emerald-100/80 px-3 py-1 text-xs md:text-sm text-emerald-800">
//                   {item}
//                 </span>
//               ))}
//             </div>
//           </article>

//           <div className="grid gap-6">
//             <article className="rounded-3xl border border-sky-100 bg-linear-to-br from-sky-50/80 via-white to-emerald-50/60 p-6 shadow-sm">
//               <h3 className="text-xl md:text-2xl text-gray-900">Nature Immersion</h3>
//               <ul className="mt-4 space-y-2 text-sm md:text-base text-gray-700">
//                 {natureImmersion.map((item) => (
//                   <li key={item} className="flex items-start gap-2">
//                     <span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </article>

//             <article className="rounded-3xl border border-amber-100 bg-linear-to-br from-amber-50/80 via-white to-orange-50/60 p-6 shadow-sm">
//               <h3 className="text-xl md:text-2xl text-gray-900">Hands-On Creation</h3>
//               <p className="mt-3 text-sm md:text-base text-gray-700">Personal Herbarium</p>
//               <ul className="mt-3 space-y-2 text-sm md:text-base text-gray-700">
//                 {handsOnCreation.map((item) => (
//                   <li key={item} className="flex items-start gap-2">
//                     <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </article>
//           </div>
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
//         <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 md:p-8 shadow-sm">
//           <h2 className="text-2xl md:text-3xl text-gray-900">Stay and Living Experience</h2>
//           <p className="mt-3 text-sm md:text-base text-gray-700">At Land&apos;s End - The Last Resort, Sumiran Forest</p>
//           <div className="mt-5 grid gap-3 md:grid-cols-2">
//             {stayAndLiving.map((item) => (
//               <div key={item} className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm md:text-base text-gray-700">
//                 {item}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
//         <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-emerald-50/70 via-white to-sky-50/60 p-6 md:p-8 shadow-sm">
//           <h2 className="text-2xl md:text-3xl text-gray-900">A Glimpse of the Experience</h2>
//           <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
//             {dailyGlimpse.map((item, index) => (
//               <article key={item} className="rounded-xl border border-white bg-white/90 px-4 py-4">
//                 <p className="text-xs font-semibold text-emerald-700">Activity {index + 1}</p>
//                 <p className="mt-2 text-sm md:text-base text-gray-700">{item}</p>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
//         <div className="rounded-3xl border border-emerald-100 bg-white/75 p-6 md:p-8 shadow-sm">
//           <h2 className="text-2xl md:text-3xl text-gray-900">Outcomes for Participants</h2>
//           <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
//             {outcomes.map((item) => (
//               <div key={item} className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm md:text-base text-gray-700">
//                 {item}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section id="dates" className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
//         <div className="grid gap-6">
//           <article className="rounded-3xl border border-amber-100 bg-linear-to-br from-amber-50/90 via-white to-emerald-50/60 p-6 md:p-8 shadow-sm">
//             <h2 className="text-2xl md:text-3xl text-gray-900">Camp Dates</h2>
//             <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm md:text-base text-gray-700">
//               {campDates.map((date) => (
//                 <div key={date} className="rounded-xl border border-amber-100 bg-white/80 px-4 py-3">
//                   {date}
//                 </div>
//               ))}
//             </div>
//           </article>
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-12">
//         <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 md:p-8 shadow-sm">
//           <h2 className="text-2xl md:text-3xl text-gray-900">Leadership and Facilitators</h2>
//           <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {facilitators.map((person) => (
//               <article key={person.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80">
//                 <div className="relative aspect-4/3 w-full bg-slate-100">
//                   <Image
//                     src={person.image}
//                     alt={person.name}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     className="object-contain"
//                   />
//                 </div>
//                 <div className="p-4">
//                 <h3 className="text-base md:text-lg text-gray-900">{person.name}</h3>
//                 <p className="mt-1 text-sm font-medium text-emerald-700">{person.role}</p>
//                 <p className="mt-2 text-sm text-gray-600">{person.details}</p>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section id="registration" className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
//         <div className="grid gap-6 lg:grid-cols-2">
//           <article className="rounded-3xl border border-emerald-100 bg-linear-to-b from-emerald-700 to-emerald-800 p-6 md:p-8 text-white shadow-lg">
//                         <div className="mb-6 rounded-xl bg-white/10 px-4 py-3 text-sm text-emerald-50">
//               Inaugural offering: Designed at a value of INR 30,000+ and offered at a special fee of INR 9,900.
//             </div>
//             <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-100">Programme Fee</p>
//             <p className="mt-3 text-3xl md:text-4xl font-semibold">INR 9,900</p>
//             <p className="mt-2 text-sm text-emerald-100">Per participant</p>
//             <ul className="mt-5 space-y-2 text-sm text-emerald-50/95">
//               <li>Stay (AC dormitories)</li>
//               <li>All meals</li>
//               <li>Activities and experiences</li>
//               <li>Expert-led sessions</li>
//               <li>Certificate on successful completion</li>
//               <li>Travel to and from Sumiran is not included</li>
//             </ul>

//           </article>

//           <article className="rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50/85 via-white to-amber-50/60 p-6 md:p-8 shadow-sm">
//             <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-700">Registrations Open</p>
//             <h2 className="mt-2 text-2xl md:text-3xl text-gray-900">Reserve your child&apos;s seat</h2>
//             <p className="mt-4 text-sm md:text-base text-gray-700">
//               For details and registration, visit the official camp page. Seats are limited and each batch is capped.
//             </p>
//             <div className="mt-5 space-y-1 text-sm md:text-base text-gray-700">
//               <p>Organised by: Land&apos;s End - The Last Resort</p>
//               <p>In association with: Young Leaders&apos; Club</p>
//               <p>Contact: Land&apos;s End Resort Team</p>
//               <p>Phone/WhatsApp: +91 8871317382, 6268244196</p>
//               <p>Email: landsend.sumiran@gmail.com</p>
//             </div>
//             <div className="mt-6 flex flex-wrap gap-3">
//               <Link
//                 href="https://rzp.io/rzp/fnnrvFkZ"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors"
//               >
//                 Register Now
//               </Link>
//               <Link
//                 href="tel:+916268244196"
//                 className="inline-flex items-center justify-center rounded-lg border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
//               >
//                 Call for Assistance
//               </Link>
//             </div>
//           </article>
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
//         <article className="rounded-3xl border border-emerald-100 bg-linear-to-r from-emerald-600 via-emerald-700 to-teal-700 p-6 md:p-8 text-white shadow-lg">
//           <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-100">Final Note</p>
//           <p className="mt-3 text-xl md:text-2xl leading-relaxed">
//             This is not just a summer camp. It is a carefully designed experience to help children grow into
//             confident, aware, and responsible individuals while enjoying the beauty of nature.
//           </p>
//         </article>
//       </section>

//       <Fotter />
//     </div>
//   );
// }




'use client';

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const REG_LINK = 'https://rzp.io/rzp/fnnrvFkZ';
const GROUP_PHONE = '8871317382';

const BATCHES = [
  { num: 'Batch 1 · Limited', dates: '14 – 17 May 2026', tag: '⚡ 15 Seats Only', hot: true },
  { num: 'Batch 2', dates: '28 – 31 May 2026', tag: '30–35 Seats', hot: false },
  { num: 'Batch 3', dates: '4 – 7 June 2026', tag: '30–35 Seats', hot: false },
];

const EXPERIENCES = [
  { icon: '🪂', name: 'Zipline', desc: 'Build courage and confidence on the forest canopy zipline.' },
  { icon: '🏹', name: 'Archery', desc: 'Focus, patience, and precision through archery and target shooting.' },
  { icon: '🌱', name: 'Organic Farming', desc: 'Hands-on farming and understanding food systems from soil to seed.' },
  { icon: '🌟', name: 'Stargazing', desc: 'Astronomical storytelling under an open forest sky — lying on the ground, looking up.' },
  { icon: '📔', name: 'Herbarium', desc: 'Create a personal field journal of forest plants — a lasting takeaway.' },
  { icon: '🔥', name: 'Biogas Plant', desc: 'Watch waste transform into energy at the Sumiran Gaushala.' },
  { icon: '🎤', name: 'Storytelling', desc: 'Public speaking, expression, and a final performance on the last evening.' },
  { icon: '🌊', name: 'Mud Bath & Games', desc: 'Nature immersion, rural games, team challenges, and scavenger hunts.' },
];

const PROGRAMME = [
  {
    day: 'DAY 1', title: 'Arrive & Belong', sub: '11 AM arrival',
    colorClass: 'd1',
    items: [
      { time: '11–1 PM', act: 'Arrivals · Check-in · Ice-breaker games', expert: false },
      { time: '2–5 PM', act: 'Sustainability Session — Mr Rajesh Gupta, IPS', expert: true },
      { time: '5:30–6:30', act: 'Adventure — Zipline · Archery · Mud bath', expert: false },
      { time: '7:30–9 PM', act: 'Dinner', expert: false },
      { time: '9–10 PM', act: 'Storytelling Session 1 — Aviral Pawaar', expert: false },
    ],
  },
  {
    day: 'DAY 2', title: 'Explore & Challenge', sub: 'Full day',
    colorClass: 'd2',
    items: [
      { time: '6–10 AM', act: 'Dawn walk · Bird watching · Scavenger hunt', expert: false },
      { time: '10–1 PM', act: 'Storytelling Session — Mrs Jyoti Pande', expert: true },
      { time: '1–4:30 PM', act: 'Lunch · Rest · Herbarium completion', expert: false },
      { time: '5–7:30 PM', act: 'Evening walk · Free time · Music', expert: false },
      { time: '9–10 PM', act: 'Speaking Session 2 + Stargazing — Aviral', expert: false },
    ],
  },
  {
    day: 'DAY 3', title: 'Reflect & Express', sub: 'Full day',
    colorClass: 'd3',
    items: [
      { time: '6–10 AM', act: 'Adventure block · Performance prep', expert: false },
      { time: '10–1 PM', act: 'Embracing Excellence — Cmde Manoj Bhuraria', expert: true },
      { time: '1–5 PM', act: 'Lunch · Rest · Silent forest walk', expert: false },
      { time: '7:30–8:30', act: 'Celebration dinner', expert: false },
      { time: '8:30–10 PM', act: 'The Big Evening — Every child performs', expert: true },
    ],
  },
  {
    day: 'DAY 4', title: 'Leave & Carry Forward', sub: 'Depart by 11 AM',
    colorClass: 'd4',
    items: [
      { time: '6–7 AM', act: 'Gratitude circle in nature', expert: false },
      { time: '7–8 AM', act: 'Breakfast + packing', expert: false },
      { time: '8–10 AM', act: 'Life Without Medicine — Dr Monika Gupta', expert: true },
      { time: '10–11 AM', act: 'Parent arrivals · Departures', expert: false },
      { time: '11 AM', act: 'Camp ends', expert: false },
    ],
  },
];

const SAFETY = [
  { icon: '🏥', title: 'Resident Doctor On-Site', desc: 'A qualified medical professional present throughout the entire camp — not on call, on-site.' },
  { icon: '🛡️', title: '24/7 Supervised', desc: 'Dedicated adult supervision at all times. Gender-separated dormitories with dedicated wardens overnight.' },
  { icon: '🔒', title: 'Secure Environment', desc: 'Dedicated security personnel on day and night shifts. Strict visitor policy — no unannounced visits.' },
  { icon: '🚐', title: 'Emergency Ready', desc: 'Dedicated camp vehicle on standby. Nearest hospital in Bhopal mapped and pre-registered.' },
  { icon: '📱', title: 'Daily Parent Updates', desc: 'A dedicated WhatsApp channel with daily photos. Single point of contact for all parent queries.' },
  { icon: '🍽️', title: 'Nutrition & Hygiene', desc: 'All meals included. Allergen register maintained. Clean drinking water throughout.' },
];

const FACILITATORS = [
  { initials: 'RG', name: 'Mr Rajesh Gupta, IPS', role: 'Chief Mentor', day: 'Sustainability Session · Day 1', bg: 'ADG (Retd.), MP Police · Creator of Sumiran', gold: false },
  { initials: 'JP', name: 'Mrs Jyoti Pande', role: 'Storyteller & Psychologist', day: 'Storytelling Session · Day 2', bg: 'Communication Specialist', gold: false },
  { initials: 'MB', name: 'Cmde Manoj Bhuraria', role: 'Life Coach & Mentor', day: 'Embracing Excellence · Day 3', bg: 'Former Naval Commander', gold: false },
  { initials: 'MG', name: 'Dr Monika Gupta', role: 'Wellness Mentor', day: 'Life Without Medicine · Day 4', bg: 'MBBS · Certified Yoga Trainer', gold: false },
  { initials: 'AP', name: 'Aviral Pawaar', role: 'Camp Director', day: 'All 4 Days · Storytelling & Public Speaking', bg: 'Founder, Bharat Storytellers Foundation', gold: true },
];

const INCLUDES = [
  'Residential stay — AC dormitories',
  'All meals throughout',
  'All activities and workshops',
  'Expert-led facilitation',
  'Personal Herbarium kit',
  'Certificate of Completion',
];

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────
export default function SumiranCampPage() {
  useReveal();

  return (
    <>
      <Head>
        <title>Sumiran Forest Residential Summer Camp 2026 | Land&apos;s End – The Last Resort</title>
        <meta name="description" content="A 3-day, 3-night residential summer camp for children aged 10–16 inside Sumiran's 300-acre living forest near Bhopal. Expert-led sessions, adventure, storytelling and nature immersion." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
       

        :root {
          --green-deep:   #1B4332;
          --green-mid:    #2D6A4F;
          --green-light:  #52B788;
          --green-pale:   #D8F3DC;
          --gold:         #C9953A;
          --gold-light:   #F0D080;
          --cream:        #F9F5EE;
          --dark:         #111811;
          --text:         #2A2A2A;
          --text-muted:   #666;
          --white:        #FFFFFF;
          --font-display: 'Cormorant Garamond', Georgia, serif;
          --font-body:    'DM Sans', sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: var(--font-body);
          color: var(--text);
          background: var(--cream);
          overflow-x: hidden;
        }

        /* HERO */
        .hero { position: relative; height: 100vh; min-height: 600px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center 30%; filter: brightness(0.55); }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(10,25,10,0.3) 0%, rgba(10,25,10,0.15) 40%, rgba(10,25,10,0.7) 100%); }
        .hero-content { position: relative; text-align: center; padding: 0 1.5rem; animation: fadeUp 1.2s ease both; }
        .hero-badge { display: inline-block; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold-light); border: 1px solid rgba(201,149,58,0.5); padding: 0.4rem 1.2rem; border-radius: 2rem; margin-bottom: 1.5rem; backdrop-filter: blur(4px); }
        .hero-title { font-family: var(--font-display); font-size: clamp(2.8rem, 8vw, 6.5rem); font-weight: 700; color: var(--white); line-height: 0.95; letter-spacing: -0.01em; margin-bottom: 0.4rem; }
        .hero-title em { font-style: italic; color: var(--gold-light); display: block; font-size: 0.6em; }
        .hero-sub { font-family: var(--font-display); font-style: italic; font-size: clamp(1rem, 2.5vw, 1.4rem); color: rgba(255,255,255,0.75); margin: 1rem 0 2.5rem; }
        .hero-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-bottom: 2.5rem; }
        .pill { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.08em; color: var(--white); background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); padding: 0.4rem 1rem; border-radius: 2rem; backdrop-filter: blur(6px); }
        .hero-cta { display: inline-flex; align-items: center; gap: 0.6rem; background: var(--gold); color: var(--white); font-family: var(--font-body); font-weight: 600; font-size: 0.9rem; letter-spacing: 0.05em; padding: 0.9rem 2.2rem; border-radius: 3rem; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 8px 30px rgba(201,149,58,0.4); }
        .hero-cta:hover { background: #b8832a; transform: translateY(-2px); }
        .hero-scroll { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 0.4rem; color: rgba(255,255,255,0.5); font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; animation: bounce 2s infinite; }

        /* BATCH STRIP */
        .batch-strip { background: var(--green-deep); padding: 2rem 1.5rem; }
        .batch-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.1); border-radius: 1rem; overflow: hidden; }
        .batch-item { background: var(--green-deep); padding: 1.5rem 1.2rem; text-align: center; transition: background 0.3s; cursor: default; }
        .batch-item:hover { background: var(--green-mid); }
        .batch-item.hot { background: #2a1800; }
        .batch-item.hot:hover { background: #3a2200; }
        .batch-num { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--green-light); margin-bottom: 0.4rem; }
        .batch-item.hot .batch-num { color: var(--gold-light); }
        .batch-dates { font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; color: var(--white); line-height: 1.1; }
        .batch-tag { display: inline-block; font-size: 0.7rem; font-weight: 600; margin-top: 0.5rem; padding: 0.25rem 0.8rem; border-radius: 2rem; background: rgba(82,183,136,0.2); color: var(--green-light); border: 1px solid rgba(82,183,136,0.3); }
        .batch-item.hot .batch-tag { background: rgba(201,149,58,0.2); color: var(--gold-light); border-color: rgba(201,149,58,0.4); }

        /* ABOUT */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; padding: 6rem 1.5rem; max-width: 1200px; margin: 0 auto; }
        .about-images { position: relative; height: 520px; }
        .about-img-main { position: absolute; top: 0; left: 0; width: 75%; height: 85%; object-fit: cover; border-radius: 1rem; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
        .about-img-accent { position: absolute; bottom: 0; right: 0; width: 55%; height: 55%; object-fit: cover; border-radius: 1rem; box-shadow: 0 20px 60px rgba(0,0,0,0.2); border: 4px solid var(--cream); }
        .section-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: var(--green-mid); margin-bottom: 0.75rem; }
        .section-title { font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; color: var(--green-deep); line-height: 1.1; margin-bottom: 1.2rem; }
        .section-title em { font-style: italic; color: var(--green-mid); }
        .section-body { font-size: 1.05rem; line-height: 1.75; color: var(--text-muted); max-width: 680px; }
        .stat-row { display: flex; gap: 2rem; margin-top: 2.5rem; }
        .stat-num { font-family: var(--font-display); font-size: 2.8rem; font-weight: 700; color: var(--green-deep); line-height: 1; }
        .stat-lbl { font-size: 0.75rem; font-weight: 500; color: var(--text-muted); letter-spacing: 0.05em; margin-top: 0.2rem; }

        /* GALLERY */
        .gallery-section { background: var(--green-deep); padding: 5rem 1.5rem; }
        .gallery-inner { max-width: 1200px; margin: 0 auto; }
        .gallery-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: var(--green-light); margin-bottom: 0.75rem; }
        .gallery-title { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700; color: var(--white); margin-bottom: 2.5rem; line-height: 1.15; }
        .gallery-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; grid-template-rows: 280px 280px; gap: 12px; }
        .gallery-item { overflow: hidden; border-radius: 0.75rem; position: relative; }
        .gallery-item:first-child { grid-row: span 2; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; display: block; }
        .gallery-item:hover img { transform: scale(1.06); }
        .gallery-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem; background: linear-gradient(transparent, rgba(0,0,0,0.6)); color: rgba(255,255,255,0.85); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.05em; transform: translateY(100%); transition: transform 0.3s ease; }
        .gallery-item:hover .gallery-caption { transform: translateY(0); }

        /* EXPERIENCES */
        .experiences { padding: 6rem 1.5rem; background: var(--cream); }
        .exp-inner { max-width: 1200px; margin: 0 auto; }
        .exp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 3rem; }
        .exp-card { background: var(--white); border-radius: 1rem; padding: 1.5rem; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; position: relative; overflow: hidden; }
        .exp-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--green-light); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease; }
        .exp-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }
        .exp-card:hover::before { transform: scaleX(1); }
        .exp-icon { font-size: 1.8rem; margin-bottom: 0.75rem; }
        .exp-name { font-family: var(--font-display); font-size: 1.15rem; font-weight: 600; color: var(--green-deep); margin-bottom: 0.4rem; }
        .exp-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }

        /* PROGRAMME */
        .programme-section { background: var(--green-deep); padding: 6rem 1.5rem; }
        .prog-inner { max-width: 1200px; margin: 0 auto; }
        .prog-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: var(--green-light); margin-bottom: 0.75rem; }
        .prog-title { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700; color: var(--white); margin-bottom: 3rem; line-height: 1.15; }
        .prog-days { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .prog-day { border-radius: 1rem; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
        .prog-day-head { padding: 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .prog-day-num { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.3rem; }
        .prog-day-title { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--white); }
        .prog-day-sub { font-size: 0.75rem; margin-top: 0.2rem; font-style: italic; }
        .d1 .prog-day-head { background: rgba(45,106,79,0.5); } .d1 .prog-day-num, .d1 .prog-day-sub { color: #74c69d; }
        .d2 .prog-day-head { background: rgba(24,95,165,0.4); } .d2 .prog-day-num, .d2 .prog-day-sub { color: #90c9f9; }
        .d3 .prog-day-head { background: rgba(186,117,23,0.4); } .d3 .prog-day-num, .d3 .prog-day-sub { color: var(--gold-light); }
        .d4 .prog-day-head { background: rgba(83,58,183,0.4); } .d4 .prog-day-num, .d4 .prog-day-sub { color: #c4b9f7; }
        .prog-items { padding: 1rem; background: rgba(0,0,0,0.2); }
        .prog-item { padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); display: grid; grid-template-columns: 70px 1fr; gap: 0.5rem; }
        .prog-item:last-child { border-bottom: none; }
        .prog-time { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.4); padding-top: 1px; }
        .prog-act { font-size: 0.82rem; color: rgba(255,255,255,0.8); line-height: 1.4; }
        .prog-act.expert { color: var(--gold-light); font-weight: 600; }

        /* SAFETY */
        .safety-section { padding: 6rem 1.5rem; background: var(--white); }
        .safety-inner { max-width: 1200px; margin: 0 auto; }
        .safety-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3rem; }
        .safety-card { padding: 2rem; border-radius: 1rem; background: var(--cream); border-left: 4px solid var(--green-light); transition: all 0.3s; }
        .safety-card:hover { background: var(--green-pale); }
        .safety-icon { font-size: 1.8rem; margin-bottom: 1rem; }
        .safety-title { font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; color: var(--green-deep); margin-bottom: 0.5rem; }
        .safety-desc { font-size: 0.9rem; color: var(--text-muted); line-height: 1.65; }

        /* FACILITATORS */
        .facilitators-section { background: var(--cream); padding: 6rem 1.5rem; }
        .fac-inner { max-width: 1200px; margin: 0 auto; }
        .fac-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-top: 3rem; }
        .fac-card { background: var(--white); border-radius: 1rem; padding: 1.5rem 1.2rem; border: 1px solid rgba(0,0,0,0.06); text-align: center; transition: all 0.3s; position: relative; overflow: hidden; }
        .fac-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--green-light); }
        .fac-card.gold-card::after { background: var(--gold); }
        .fac-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }
        .fac-initials { width: 56px; height: 56px; border-radius: 50%; background: var(--green-pale); color: var(--green-deep); font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
        .fac-initials.gold-init { background: #FDF4D0; color: #8B6010; }
        .fac-name { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--green-deep); margin-bottom: 0.3rem; line-height: 1.2; }
        .fac-role { font-size: 0.72rem; font-weight: 600; color: var(--green-mid); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.5rem; }
        .fac-day { font-size: 0.72rem; color: var(--text-muted); font-style: italic; }

        /* PRICING */
        .pricing-section { background: var(--green-deep); padding: 6rem 1.5rem; }
        .price-inner { max-width: 900px; margin: 0 auto; text-align: center; }
        .price-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: var(--green-light); margin-bottom: 0.75rem; }
        .price-title { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700; color: var(--white); margin-bottom: 0.5rem; }
        .price-subtitle { color: rgba(255,255,255,0.55); font-size: 1rem; margin-bottom: 3rem; }
        .price-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2.5rem; }
        .price-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 1.25rem; padding: 2rem 1.5rem; transition: all 0.3s; }
        .price-card.featured { background: rgba(201,149,58,0.15); border-color: rgba(201,149,58,0.4); }
        .price-card:hover { background: rgba(255,255,255,0.1); }
        .price-card.featured:hover { background: rgba(201,149,58,0.2); }
        .price-cat { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 1rem; }
        .price-card.featured .price-cat { color: var(--gold-light); }
        .price-amount { font-family: var(--font-display); font-size: 2.8rem; font-weight: 700; color: var(--white); line-height: 1; margin-bottom: 0.3rem; }
        .price-card.featured .price-amount { color: var(--gold-light); }
        .price-note { font-size: 0.8rem; color: rgba(255,255,255,0.45); }
        .price-includes { background: rgba(0,0,0,0.2); border-radius: 1rem; padding: 1.5rem 2rem; text-align: left; margin-bottom: 2rem; }
        .price-includes h4 { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--green-light); margin-bottom: 1rem; }
        .includes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem 2rem; }
        .include-item { font-size: 0.85rem; color: rgba(255,255,255,0.7); display: flex; gap: 0.5rem; align-items: flex-start; }
        .include-item::before { content: '✓'; color: var(--green-light); font-weight: 700; flex-shrink: 0; }
        .price-fine { font-size: 0.8rem; color: rgba(255,255,255,0.35); margin-bottom: 1rem; }
        .group-note { font-size: 0.95rem; color: rgba(255,255,255,0.7); padding: 0.9rem 1.4rem; background: rgba(82,183,136,0.12); border: 1px solid rgba(82,183,136,0.25); border-radius: 0.75rem; display: inline-block; margin-bottom: 2rem; }
        .group-note a { color: #74c69d; font-weight: 600; text-decoration: none; }
        .btn-primary { display: inline-block; background: var(--gold); color: var(--white); font-weight: 700; font-size: 1rem; letter-spacing: 0.04em; padding: 1.1rem 3rem; border-radius: 3rem; text-decoration: none; transition: all 0.3s; box-shadow: 0 8px 30px rgba(201,149,58,0.5); }
        .btn-primary:hover { background: #b8832a; transform: translateY(-2px); box-shadow: 0 14px 40px rgba(201,149,58,0.6); }

        /* CTA */
        .cta-section { position: relative; min-height: 500px; display: flex; align-items: center; justify-content: center; overflow: hidden; text-align: center; padding: 6rem 1.5rem; }
        .cta-bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.35); }
        .cta-content { position: relative; max-width: 700px; }
        .cta-title { font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 700; color: var(--white); line-height: 1; margin-bottom: 1rem; }
        .cta-sub { font-family: var(--font-display); font-style: italic; font-size: 1.3rem; color: var(--gold-light); margin-bottom: 0.8rem; }
        .cta-note { font-size: 0.9rem; color: rgba(255,255,255,0.55); margin-bottom: 1rem; }
        .cta-group { font-size: 0.85rem; color: rgba(255,255,255,0.55); margin-bottom: 2rem; }
        .cta-group a { color: var(--gold-light); font-weight: 600; text-decoration: none; }
        .cta-url { display: block; margin-top: 1.2rem; font-size: 0.8rem; color: rgba(255,255,255,0.3); letter-spacing: 0.08em; }

        /* FOOTER */
        .site-footer { background: var(--dark); padding: 2.5rem 1.5rem; text-align: center; }
        .footer-text { font-size: 0.8rem; color: rgba(255,255,255,0.3); line-height: 1.8; }
        .footer-text a { color: var(--green-light); text-decoration: none; }

        /* ANIMATIONS */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          .about-images { height: 320px; }
          .exp-grid { grid-template-columns: repeat(2, 1fr); }
          .prog-days { grid-template-columns: 1fr 1fr; }
          .fac-grid { grid-template-columns: repeat(3, 1fr); }
          .price-cards { grid-template-columns: 1fr; }
          .includes-grid { grid-template-columns: 1fr 1fr; }
          .safety-grid { grid-template-columns: 1fr 1fr; }
          .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
          .gallery-item:first-child { grid-row: span 1; }
          .batch-inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .exp-grid { grid-template-columns: 1fr; }
          .prog-days { grid-template-columns: 1fr; }
          .fac-grid { grid-template-columns: repeat(2, 1fr); }
          .safety-grid { grid-template-columns: 1fr; }
          .gallery-grid { grid-template-columns: 1fr; }
          .stat-row { gap: 1.2rem; }
          .includes-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/gallery/building.jpeg')" }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">
            Land&apos;s End – The Last Resort · Sumiran Forest · Bhopal
          </div>
          <h1 className="hero-title">
            Sumiran Forest
            <em>Residential Summer Camp</em>
          </h1>
          <p className="hero-sub">&ldquo;Where the forest becomes the classroom&rdquo;</p>
          <div className="hero-pills">
            {['Ages 10–16', '3 Days · 3 Nights', 'Residential', '300 Acres of Living Forest', '1 Hour from Bhopal'].map((p) => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>
          <Link href={REG_LINK} className="hero-cta" target="_blank" rel="noopener noreferrer">
            Book Now ↓
          </Link>
        </div>
        <div className="hero-scroll">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 10l5 5 5-5" />
          </svg>
          Scroll
        </div>
      </section>

      {/* ── BATCH STRIP ───────────────────────────────────────────────────── */}
      <div className="batch-strip">
        <div className="batch-inner">
          {BATCHES.map((b) => (
            <div key={b.num} className={`batch-item${b.hot ? ' hot' : ''}`}>
              <div className="batch-num">{b.num}</div>
              <div className="batch-dates">{b.dates.replace(' 2026', '')}<br />2026</div>
              <span className="batch-tag">{b.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <div className="about-grid reveal">
        <div className="about-images">
          <img className="about-img-main" src="/gallery/garden.jpg" alt="Sumiran Forest garden pathway" />
          <img className="about-img-accent" src="/gallery/kids.jpeg" alt="Children at Sumiran Forest" />
        </div>
        <div>
          <div className="section-label">About Sumiran</div>
          <h2 className="section-title">A Living, Breathing <em>300-Acre Forest</em></h2>
          <p className="section-body">
            Sumiran is not just a destination — it is an ecosystem. A man-made forest developed over decades as a space for learning, reflection, and sustainable living, just one hour from Bhopal. Here, children step beyond screens and classrooms and discover what the world beyond walls truly looks like.
          </p>
          <p className="section-body" style={{ marginTop: '1rem' }}>
            This camp is designed for children aged 10–16 to spend three transformative days — exploring the forest, learning from experts, and discovering what they are truly capable of.
          </p>
          <div className="stat-row">
            {[['300', 'Acres of Forest'], ['1 hr', 'from Bhopal'], ['4', 'Days of Experience'], ['5', 'Expert Facilitators']].map(([num, lbl]) => (
              <div key={lbl} className="stat">
                <div className="stat-num">{num}</div>
                <div className="stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GALLERY ───────────────────────────────────────────────────────── */}
      <div className="gallery-section">
        <div className="gallery-inner reveal">
          <div className="gallery-label">Life at Sumiran</div>
          <h2 className="gallery-title">
            See the Forest Your Child<br />Will Call Home for 4 Days
          </h2>
          <div className="gallery-grid">
            {[
              { src: '/gallery/circle-stones.jpg', alt: 'Natural stone seating circle', caption: 'The natural amphitheatre — where stories are told' },
              { src: '/gallery/building.jpeg', alt: "Land's End main building", caption: "Land's End — where children stay" },
              { src: '/gallery/garden.jpeg', alt: 'Dense forest interior', caption: "Deep inside Sumiran's living forest" },
              // { src: '/gallery/garden.jpg', alt: 'Organic garden pathway', caption: 'The organic farm and garden' },
              { src: '/gallery/kids.jpeg', alt: 'Group of children at Sumiran', caption: 'Children who have been here before' },
            ].map((img) => (
              <div key={img.src} className="gallery-item">
                <img src={img.src} alt={img.alt} />
                <div className="gallery-caption">{img.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EXPERIENCES ───────────────────────────────────────────────────── */}
      <section className="experiences">
        <div className="exp-inner">
          <div className="reveal">
            <div className="section-label">What Your Child Will Do</div>
            <h2 className="section-title">
              8 <em>Real Experiences.</em><br />No Classroom. No Screens.
            </h2>
          </div>
          <div className="exp-grid">
            {EXPERIENCES.map((exp) => (
              <div key={exp.name} className="exp-card reveal">
                <div className="exp-icon">{exp.icon}</div>
                <div className="exp-name">{exp.name}</div>
                <div className="exp-desc">{exp.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME ─────────────────────────────────────────────────────── */}
      <section className="programme-section">
        <div className="prog-inner reveal">
          <div className="prog-label">The 4-Day Programme</div>
          <h2 className="prog-title">Arrive · Explore · Reflect · Leave Changed</h2>
          <div className="prog-days">
            {PROGRAMME.map((day) => (
              <div key={day.day} className={`prog-day ${day.colorClass}`}>
                <div className="prog-day-head">
                  <div className="prog-day-num">{day.day}</div>
                  <div className="prog-day-title">{day.title}</div>
                  <div className="prog-day-sub">{day.sub}</div>
                </div>
                <div className="prog-items">
                  {day.items.map((item) => (
                    <div key={item.time} className="prog-item">
                      <span className="prog-time">{item.time}</span>
                      <span className={`prog-act${item.expert ? ' expert' : ''}`}>{item.act}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY ────────────────────────────────────────────────────────── */}
      <section className="safety-section">
        <div className="safety-inner">
          <div className="reveal">
            <div className="section-label">Your Child&apos;s Safety</div>
            <h2 className="section-title">Every Concern. <em>Answered.</em></h2>
          </div>
          <div className="safety-grid">
            {SAFETY.map((item) => (
              <div key={item.title} className="safety-card reveal">
                <div className="safety-icon">{item.icon}</div>
                <div className="safety-title">{item.title}</div>
                <div className="safety-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITATORS ──────────────────────────────────────────────────── */}
      <section className="facilitators-section">
        <div className="fac-inner">
          <div className="reveal">
            <div className="section-label">The Team</div>
            <h2 className="section-title">Expert-Led. <em>Purpose-Driven.</em></h2>
          </div>
          <div className="fac-grid">
            {FACILITATORS.map((f) => (
              <div key={f.name} className={`fac-card reveal${f.gold ? ' gold-card' : ''}`}>
                <div className={`fac-initials${f.gold ? ' gold-init' : ''}`}>{f.initials}</div>
                <div className="fac-name">{f.name}</div>
                <div className="fac-role">{f.role}</div>
                <div className="fac-day">{f.day}<br />{f.bg}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section className="pricing-section" id="register">
        <div className="price-inner reveal">
          <div className="price-label">Programme Fee</div>
          <h2 className="price-title">Exceptional Value. All-Inclusive.</h2>
          <p className="price-subtitle">Designed at a value of ₹30,000+ · Offered at a special inaugural fee</p>
          <div className="price-cards">
            <div className="price-card featured">
              <div className="price-cat">Early Bird — Register by 8 May</div>
              <div className="price-amount">₹8,500</div>
              <div className="price-note">per participant · all batches</div>
            </div>
            <div className="price-card">
              <div className="price-cat">Regular Fee — After 8 May</div>
              <div className="price-amount">₹9,900</div>
              <div className="price-note">per participant · all batches</div>
            </div>
            <div className="price-card">
              <div className="price-cat">Group — 5 or More Together</div>
              <div className="price-amount">₹9,000</div>
              <div className="price-note">per participant · anytime</div>
            </div>
          </div>
          <div className="price-includes">
            <h4>Everything Included</h4>
            <div className="includes-grid">
              {INCLUDES.map((item) => (
                <div key={item} className="include-item">{item}</div>
              ))}
            </div>
          </div>
          <p className="price-fine">
            Travel to and from Sumiran Forest not included · Split payment available on request
          </p>
          <p className="group-note">
            📞 For group bookings &amp; discounts, call{' '}
            <a href={`tel:${GROUP_PHONE}`}>{GROUP_PHONE.replace(/(\d{5})(\d{5})/, '$1 $2')}</a>
          </p>
          <Link href={REG_LINK} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Book Now — Pay Securely
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="cta-section">
        <div
          className="cta-bg"
          style={{ backgroundImage: "url('/gallery/circle-stones.jpg')" }}
        />
        <div className="cta-content reveal">
          <h2 className="cta-title">Register Today.</h2>
          <p className="cta-sub">Before the seats are gone.</p>
          <p className="cta-note">
            Batch 1 · 14–17 May · 15 seats only · Early bird ₹8,500 closes 8 May
          </p>
          <p className="cta-group">
            For group bookings, call{' '}
            <a href={`tel:${GROUP_PHONE}`}>{GROUP_PHONE.replace(/(\d{5})(\d{5})/, '$1 $2')}</a>
          </p>
          <Link href={REG_LINK} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Secure Your Child&apos;s Seat
          </Link>
          <span className="cta-url">rzp.io/rzp/fnnrvFkZ</span>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="site-footer">
        <p className="footer-text">
          Land&apos;s End – The Last Resort · Sumiran Forest · Bhopal, Madhya Pradesh ·{' '}
          <a href="https://landsend.storyretreat.in" target="_blank" rel="noopener noreferrer">
            landsend.storyretreat.in
          </a>
          <br /><br />
          Organised by Land&apos;s End – The Last Resort · In association with Young Leaders&apos; Club ·
          Camp Director: Aviral Pawaar
        </p>
      </footer>
    </>
  );
}

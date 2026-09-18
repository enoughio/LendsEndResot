import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Fotter from "@/components/Fotter";

const imagePath = (fileName: string) =>
  `/events/life-without-medicine/${encodeURIComponent(fileName)}`;

const gallery = [
  "WhatsApp Image 2026-09-17 at 7.27.54 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.34.18 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.35.00 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.35.12 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.37.47 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.21.16 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.27.10 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.00.39 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.00.54 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.01.34 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.22.31 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.25.04 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.27.41 PM.jpeg",
  "WhatsApp Image 2026-09-17 at 7.35.14 PM.jpeg",
];

export const metadata: Metadata = {
  title: "Life Without Medicine | Land's End",
  description:
    "A 4-day experiential health and wellness retreat at Sumiran Forest near Bhopal, October 23-26, 2026.",
  openGraph: {
    images: [imagePath(gallery[0])],
  },
};

const elements = [
  { icon: "01", title: "Air & attitude", text: "Breathe more deeply, shift your inner climate, and understand how mindset shapes health." },
  { icon: "02", title: "Water", text: "Learn how mindful hydration and water therapy can support everyday wellbeing." },
  { icon: "03", title: "Nutrition", text: "Explore whole, fresh, local food, circadian eating, and a more grateful relationship with meals." },
  { icon: "04", title: "Exercise & entertainment", text: "Discover movement for longevity, energy and joy rather than performance alone." },
  { icon: "05", title: "Sunlight", text: "Understand how to use sunlight consciously and safely as part of a healthy rhythm." },
  { icon: "06", title: "Rest", text: "Make space for sleep, recovery, stress release and the body's natural repair work." },
];

const days = [
  ["Day 1 · Oct 23", "Arrival & foundation", "Settling in, health check-up, understanding your body's intelligence, and the first immersion in nature."],
  ["Day 2 · Oct 24", "What the body wants", "Organic food, panchtatvas, autonomic balance and a deep dive into the forest."],
  ["Day 3 · Oct 25", "How disease manifests and reverses", "Cellular dysfunction, organ response, happiness and nature restoring health."],
  ["Day 4 · Oct 26", "Integration & departure", "A closing circle, practical takeaways and a return to everyday life with a healthier rhythm."],
];

const accommodation = [
  ["AC Dormitory", "6 participants", "INR 23,000"],
  ["AC Dormitory", "4 participants", "INR 27,000"],
  ["AC Room", "3 participants", "INR 29,000"],
  ["AC Room", "2 participants", "INR 35,000"],
];

export default function LifeWithoutMedicineRetreat() {
  return (
    <main className="bg-[#f6f4eb] text-[#27352d]">
      <section className="relative min-h-[680px] overflow-hidden bg-[#183b31] text-white">
        <Image src={imagePath(gallery[0])} alt="A group gathered at Land's End in Sumiran Forest" fill priority className="object-cover object-center opacity-65" sizes="100vw" />
        <div className="absolute inset-0 bg-linear-to-r from-[#102c26]/95 via-[#102c26]/60 to-transparent" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-end px-5 pb-16 md:px-10 md:pb-24">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#d7c887]">Sumiran Forest · Near Bhopal</p>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[0.98] md:text-7xl">Life Without Medicine</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl">A 4-day experiential health and wellness retreat for rediscovering balance in body, mind and spirit.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold"><span className="border border-white/30 bg-white/10 px-4 py-2">October 23-26, 2026</span><span className="border border-white/30 bg-white/10 px-4 py-2">3 nights · Fully residential</span></div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:px-10 md:py-20 lg:grid-cols-[1fr_360px]">
        <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c6b2d]">A lifestyle correction program</p><h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">Come back to the basics that keep us well.</h2><div className="mt-7 max-w-3xl space-y-5 text-lg leading-8 text-[#526057]"><p>Modern life can pull us away from the natural rhythms that support health. This immersive workshop is an invitation to slow down, listen closely to your body, and reconnect with the elements that sustain it.</p><p>Life Without Medicine began as a personal experiment by physicians at Team Sumiran. Since becoming a structured four-day immersion in 2018, it has welcomed more than 1,000 participants across age groups.</p></div></div>
        <aside className="h-fit border border-[#cdd8c7] bg-white p-6 shadow-[0_20px_50px_-35px_rgba(25,53,42,0.8)] lg:sticky lg:top-24"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8c6b2d]">Reserve your place</p><h2 className="mt-3 text-2xl font-semibold">October 23-26, 2026</h2><dl className="mt-6 space-y-4 text-sm text-[#526057]"><div><dt className="font-semibold text-[#27352d]">Venue</dt><dd>Land&apos;s End Resort, Sumiran Forest</dd></div><div><dt className="font-semibold text-[#27352d]">Contribution</dt><dd>From INR 23,000 per person, all-inclusive</dd></div><div><dt className="font-semibold text-[#27352d]">Guided by</dt><dd>Dr. Ranjana Garg and Dr. Monika Gupta</dd></div></dl><Link href="https://forms.gle/PGXA6w6dJYWZ6WX88" target="_blank" rel="noopener noreferrer" className="mt-7 block bg-[#356b43] px-5 py-3 text-center font-semibold text-white transition hover:bg-[#244e32]">Register for the retreat</Link><p className="mt-4 text-xs leading-5 text-[#6c786f]">Payment details will be shared personally after registration.</p></aside>
      </section>

      <section className="bg-[#e6eee1] px-5 py-14 md:px-10 md:py-20"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c6b2d]">The six vital elements</p><h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">Health is a rhythm, not a prescription.</h2><div className="mt-10 grid gap-px bg-[#c7d4c3] sm:grid-cols-2 lg:grid-cols-3">{elements.map((element) => <article key={element.icon} className="bg-[#e6eee1] p-6 md:p-8"><span className="text-sm font-semibold text-[#8c6b2d]">{element.icon}</span><h3 className="mt-8 text-xl font-semibold">{element.title}</h3><p className="mt-3 leading-7 text-[#526057]">{element.text}</p></article>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c6b2d]">A sample journey</p><h2 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">Four days in the forest.</h2><p className="mt-6 leading-7 text-[#526057]">Several deep indoor sessions, immersive outdoor activities, nourishing food and time to let the experience settle. The detailed schedule is shared after arrival.</p></div><div className="divide-y divide-[#d4ddd1] border-y border-[#d4ddd1]">{days.map(([label, title, text]) => <article key={label} className="grid gap-3 py-6 md:grid-cols-[170px_1fr]"><p className="text-sm font-semibold uppercase tracking-wide text-[#8c6b2d]">{label}</p><div><h3 className="text-2xl font-semibold">{title}</h3><p className="mt-2 leading-7 text-[#526057]">{text}</p></div></article>)}</div></div></section>

      <section className="bg-[#1e3f34] px-5 py-14 text-white md:px-10 md:py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d7c887]">Meet your guides</p><h2 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">Experience, attention and a practical approach to wellbeing.</h2></div><div className="grid gap-6 sm:grid-cols-2"><article className="border-l border-[#d7c887]/60 pl-5"><h3 className="text-2xl font-semibold">Dr. Ranjana Garg</h3><p className="mt-2 text-sm font-semibold text-[#d7c887]">MBBS, DCH · Preventive & holistic medicine</p><p className="mt-4 leading-7 text-white/75">A medical practitioner with 30+ years of experience, focused on diet, lifestyle and the relationship between mind, body and spirit.</p></article><article className="border-l border-[#d7c887]/60 pl-5"><h3 className="text-2xl font-semibold">Dr. Monika Gupta</h3><p className="mt-2 text-sm font-semibold text-[#d7c887]">MBBS · Physician, yoga & energy healing coach</p><p className="mt-4 leading-7 text-white/75">A physician professionally trained in yoga and energy healing, guiding people toward wellness through practical lifestyle changes.</p></article></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20"><div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c6b2d]">Stay in the forest</p><h2 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">Land&apos;s End, Sumiran Forest</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-[#526057]">Three hundred acres of community forest, 90 acres of lakes and 10,000 acres of wilderness. Expect fresh air, organic meals, forest walks, birdwatching and star-filled skies.</p><h3 className="mt-10 text-2xl font-semibold">Accommodation contributions</h3><div className="mt-4 overflow-hidden border border-[#d4ddd1] bg-white">{accommodation.map(([type, occupancy, price]) => <div key={type + occupancy} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#e7ece4] px-4 py-4 last:border-0 sm:grid-cols-[1fr_1fr_auto]"><span className="font-semibold">{type}</span><span className="text-[#526057]">{occupancy}</span><span className="font-semibold text-[#356b43]">{price}</span></div>)}</div></div><div className="relative min-h-[420px] overflow-hidden"><Image src={imagePath(gallery[1])} alt="Guests enjoying the forest at Land's End" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" /></div></div></section>

      <section className="bg-[#ebe5d5] px-5 py-14 md:px-10 md:py-20"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c6b2d]">The experience</p><h2 className="mt-3 text-4xl font-semibold md:text-5xl">A place to notice what your body already knows.</h2></div><div className="mt-10 grid auto-rows-[190px] grid-cols-2 gap-3 md:auto-rows-[250px] md:grid-cols-4">{gallery.map((fileName, index) => <div key={fileName} className={`relative overflow-hidden ${index === 0 || index === 5 ? "col-span-2 row-span-2" : ""}`}><Image src={imagePath(fileName)} alt="Life Without Medicine retreat at Sumiran Forest" fill className="object-cover transition duration-500 hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" /></div>)}</div></div></section>

      <section className="px-5 py-16 text-center md:px-10 md:py-24"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c6b2d]">Come home to yourself</p><h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">Four days. One forest. A reset your body will remember.</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#526057]">For registration support, contact Shubham Gaikwad at +91 8698283671 or Dr. Monika Gupta at +91 8770673594.</p><Link href="https://forms.gle/PGXA6w6dJYWZ6WX88" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-[#356b43] px-7 py-4 font-semibold text-white transition hover:bg-[#244e32]">Open registration form</Link></section>
      <Fotter />
    </main>
  );
}
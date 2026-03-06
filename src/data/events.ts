export type Event = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  price?: string;
  earlyPrice?: string;
  regularPrice?: string;
  earlyBirdDeadline?: string;
  includes?: string[];
  excludes?: string[];
  whoFor?: string[];
  sections?: { title: string; paragraphs?: string[]; bullets?: string[] }[];
};

export const events: Event[] = [
//   {
//     id: "1",
//     slug: "sunrise-walk-2026",
//     shortDescription:
//       "Guided sunrise walk to discover resident and migratory birds in Sumiran Forest.",
//     description:
//       "Join our guided sunrise walk led by local naturalists. You’ll learn bird identification, habitat notes, and enjoy a quiet morning immersed in the forest. Comfortable walking shoes and a light jacket are recommended. Tea and light snacks included.",
//     images: ["/gallery/riverrafting.jpeg", "/gallery/birds1.jpg"],
//     startDate: "2026-04-10",
//     time: "06:00 AM",
//     location: "Sumiran Forest Trailhead",
//     price: "INR 499",
//   },
//   {
//     id: "2",
//     slug: "eco-workshop-2026",
//     title: "Weekend Eco-Workshop: Living Lightly",
//     shortDescription:
//       "A two-day workshop on off-grid living, organic farming and low-impact building.",
//     description:
//       "This two-day intensive introduces practical skills for low-impact living: composting, rainwater harvesting, natural building techniques and organic gardening. Sessions combine short theory, hands-on practice and group reflection.",
//     images: ["/about/aboutHero.png", "/gallery/workshop1.jpg", "/gallery/workshop2.jpg"],
//     startDate: "2026-05-15",
//     endDate: "2026-05-16",
//     time: "09:00 AM — 05:00 PM",
//     location: "Land's End Commons",
//     price: "INR 4999",
//   },
  {
    id: "3",
    slug: "antarman-2026",
    title: "Antarman — A Sufi Singing & Personal Storytelling Retreat",
    shortDescription:
      "A three-day retreat combining Sufi singing and personal storytelling for inner healing, held inside Sumiran’s 300-acre community conserved forest.",
    description:
      `Antarman means the inner self. This retreat is an invitation to meet it — gently, honestly, courageously.

For three days, inside a 300-acre community conserved forest, you will enter a space where music becomes medicine and stories become healing. This is not about performance. This is about truth.

The Heart of Antarman — Personal Storytelling for Healing
With renowned storyteller Jyoti Pande, this retreat will focus deeply on identifying and shaping your personal stories, understanding how stories hold memory and emotion, reframing life experiences through narrative, speaking your truth in a safe, held space, and using storytelling as a path to self-acceptance and healing.

Sufi Singing for Inner Healing
Led by Anahita, a Sufi singer from Goa, the musical journey will centre around learning Sufi songs rooted in devotion and surrender, using breath and voice as tools for emotional release, understanding the healing power of collective singing, and experiencing music as meditation. No prior musical training required.

Held inside Sumiran’s forest, participants will also experience guided forest walks, kayaking in the 60-acre lake, a natural mud bath, archery sessions, silent reflection time, and evenings under open skies. Accommodation (double sharing) and all meals are included.
`,
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    ],
    startDate: "2026-03-20",
    endDate: "2026-03-22",
    time: "See daily schedule (mornings: walks & sessions; afternoons: workshops; evenings: group singing)",
    location: "Land's End – The Last Resort, Sumiran Forest (near Bhopal)",
    price: "Early Bird ₹14,999 | Regular ₹15,999 (per person, double sharing)",
    earlyPrice: "₹14,999",
    regularPrice: "₹15,999",
    includes: [
      "All storytelling and Sufi singing sessions",
      "All nature and adventure activities",
      "All meals during the retreat",
      "Accommodation (double sharing)",
    ],
    excludes: ["Travel to and from Sumiran Forest"],
    whoFor: [
      "Those carrying untold stories",
      "Those seeking emotional clarity and healing",
      "Lovers of music and meaning",
      "Anyone ready to meet themselves a little more deeply",
    ],
    sections: [
      {
        title: "The Heart of Antarman",
        paragraphs: [
          "Personal Storytelling for Healing — With renowned storyteller Jyoti Pande, this retreat will focus deeply on identifying and shaping your personal stories, understanding how stories hold memory and emotion, reframing life experiences through narrative, speaking your truth in a safe, held space, and using storytelling as a path to self-acceptance and healing.",
        ],
      },
      {
        title: "Sufi Singing for Inner Healing",
        paragraphs: [
          "Led by Anahita, a Sufi singer from Goa, the musical journey will centre around learning Sufi songs rooted in devotion and surrender, using breath and voice as tools for emotional release, understanding the healing power of collective singing, and experiencing music as meditation. No prior musical training required.",
        ],
      },
      {
        title: "Healing in the Lap of the Forest",
        bullets: [
          "Guided forest walks",
          "Kayaking in the 60-acre lake",
          "Mud bath in a natural mud pool",
          "Archery sessions",
          "Silent reflection time",
          "Evenings under open skies",
        ],
      },
    ],
  },
];

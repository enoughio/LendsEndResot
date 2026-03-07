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
  seats?: number;
  registrationLink?: string;
  contact?: string[];
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
    title: "ANTARMAN — A Storytelling and Sufi Singing Retreat",
    shortDescription:
      "Three-day immersion into personal storytelling for healing and Sufi singing as inner medicine — 20–22 March 2026, Sumiran Forest (near Bhopal).",
    description:
      `Three-day immersion into Personal Storytelling for Healing and Sufi Singing as Inner Medicine.

Learn Sufi songs for inner healing.
Discover how to tell your personal stories.

Held at Land's End – The Last Resort, Sumiran Forest, this retreat offers forest walks, reflection and soulful circles alongside guided sessions in storytelling and Sufi singing.
`,
    images: ["/events/antarman.jpeg"],
    startDate: "2026-03-20",
    endDate: "2026-03-22",
    time: "Full-day retreat program across three days; mornings: nature & sessions, afternoons: workshops, evenings: singing circles",
    location: "Land's End – The Last Resort, Sumiran Forest, Near Bhopal",
    price: "Early Bird: ₹14,999 (valid till 10 March 2026) • Regular: ₹15,999",
    earlyPrice: "₹14,999",
    regularPrice: "₹15,999",
    earlyBirdDeadline: "2026-03-10",
    seats: 16,
    registrationLink: "https://rzp.io/rzp/fDNN9HW",
    contact: ["+91 6268244196", "+91 8871317382"],
    includes: [
      "Storytelling and Sufi singing sessions",
      "All meals during the retreat",
      "Accommodation (double sharing)",
      "Guided forest walks and reflection time",
    ],
    excludes: ["Travel to and from Sumiran Forest"],
    whoFor: [
      "Those seeking healing through story and song",
      "People curious about Sufi singing",
      "Those ready to explore personal narratives in a held environment",
    ],
    sections: [
      {
        title: "Facilitators",
        paragraphs: [
          "Anahita Batra — Vocalist | Sufi Singer",
          "Jyoti Pande — Storyteller | Psychologist",
        ],
      },
      {
        title: "Booking & Important Info",
        bullets: [
          "Limited to 16 seats only",
          "Early Bird Offer: ₹14,999 (Valid till 10 March 2026)",
          "Regular: ₹15,999",
          "To register: https://rzp.io/rzp/fDNN9HW",
          "Contact: +91 6268244196, +91 8871317382",
        ],
      },
    ],
  },
];

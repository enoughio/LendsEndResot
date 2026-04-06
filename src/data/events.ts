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
//   {
//     id: "3",
//     slug: "antarman-2026",
//     title: "ANTARMAN — A Storytelling and Sufi Singing Retreat",
//     shortDescription:
//       "Three-day immersion into personal storytelling for healing and Sufi singing as inner medicine — 20–22 March 2026, Sumiran Forest (near Bhopal).",
//     description:
//       `Three-day immersion into Personal Storytelling for Healing and Sufi Singing as Inner Medicine.

// Learn Sufi songs for inner healing.
// Discover how to tell your personal stories.

// Held at Land's End – The Last Resort, Sumiran Forest, this retreat offers forest walks, reflection and soulful circles alongside guided sessions in storytelling and Sufi singing.
// `,
//     images: ["/events/antarman.jpeg"],
//     startDate: "2026-03-20",
//     endDate: "2026-03-22",
//     time: "Full-day retreat program across three days; mornings: nature & sessions, afternoons: workshops, evenings: singing circles",
//     location: "Land's End – The Last Resort, Sumiran Forest, Near Bhopal",
//     price: "Early Bird: ₹14,999 (valid till 10 March 2026) • Regular: ₹15,999",
//     earlyPrice: "₹14,999",
//     regularPrice: "₹15,999",
//     earlyBirdDeadline: "2026-03-10",
//     seats: 16,
//     registrationLink: "https://rzp.io/rzp/fDNN9HW",
//     contact: ["+91 6268244196", "+91 8871317382"],
//     includes: [
//       "Storytelling and Sufi singing sessions",
//       "All meals during the retreat",
//       "Accommodation (double sharing)",
//       "Guided forest walks and reflection time",
//     ],
//     excludes: ["Travel to and from Sumiran Forest"],
//     whoFor: [
//       "Those seeking healing through story and song",
//       "People curious about Sufi singing",
//       "Those ready to explore personal narratives in a held environment",
//     ],
//     sections: [
//       {
//         title: "Facilitators",
//         paragraphs: [
//           "Anahita Batra — Vocalist | Sufi Singer",
//           "Jyoti Pande — Storyteller | Psychologist",
//         ],
//       },
//       {
//         title: "Booking & Important Info",
//         bullets: [
//           "Limited to 16 seats only",
//           "Early Bird Offer: ₹14,999 (Valid till 10 March 2026)",
//           "Regular: ₹15,999",
//           "To register: https://rzp.io/rzp/fDNN9HW",
//           "Contact: +91 6268244196, +91 8871317382",
//         ],
//       },
//     ],
//   },

  {
    id: "4",
    slug: "sumiran-forest-immersion-camp-2026",
    title: "Sumiran Forest Immersion Camp",
    shortDescription:
      "Residential summer camp (ages 10-16) with adventure, learning, and nature immersion in Sumiran Forest.",
    description:
      `A three-day, three-night residential camp designed for children to learn, explore, and grow in a living forest ecosystem.

Sumiran is a 300-acre man-made, living forest created with care and respect for nature. It is a learning ecosystem where children experience nature up close, sustainable living practices, and a slower, mindful way of life.

The camp blends adventure, hands-on learning, creative expression, and community living to build confidence, character, and connection with nature.`,
    images: ["/about/aboutHero.png", "/gallery/forestwalk.jpeg", "/gallery/stargazing.jpeg"],
    startDate: "2026-05-04",
    endDate: "2026-05-07",
    time: "3 days, 3 nights (multiple batches)",
    location: "Land's End - The Last Resort, Sumiran Forest, Near Bhopal",
    price: "INR 9,900 per participant",
    includes: [
      "Stay (air-conditioned shared dormitories)",
      "Food",
      "Expert sessions and workshops",
      "Adventure activities and group experiences",
    ],
    excludes: ["Travel to and from Sumiran Forest"],
    whoFor: [
      "Children ages 10-16",
      "Students seeking confidence, creativity, and nature connection",
      "Families looking for safe, supervised summer learning experiences",
    ],
    sections: [
      {
        title: "Why This Camp",
        paragraphs: [
          "In a fast-paced, screen-driven world, children often miss real-life experiences, confidence in expression, connection with nature, and opportunities to build character.",
          "This camp helps children become more aware, confident, creative, independent, and responsible.",
        ],
      },
      {
        title: "Adventure, Fun, and Play",
        bullets: [
          "Zipline (Day 1)",
          "Shooting activities (Day 2)",
          "Archery (Day 2)",
          "Mud baths (Day 2)",
          "Rural games and traditional sports (Day 3)",
          "Strategy games, team-building exercises, creative challenges",
          "Music, dance, open jamming, stargazing and storytelling",
        ],
      },
      {
        title: "Learning Experience",
        bullets: [
          "Public speaking and storytelling (evenings)",
          "Debates, podcasts, and live sessions",
          "Logical thinking and problem-solving",
          "Organic farming, forest development, and water conservation",
          "Gaushala and biogas production",
          "Yoga, meditation, and mindful living",
        ],
      },
      {
        title: "Nature Immersion",
        bullets: [
          "Guided forest walks and bird watching",
          "Understanding ecosystems and biodiversity",
          "Learning coexistence with wildlife",
          "Practical sustainability exposure and stargazing",
        ],
      },
      {
        title: "Hands-On Creation",
        paragraphs: [
          "Each participant will collect plant samples, learn about them, and create a personal herbarium as a meaningful takeaway.",
        ],
      },
      {
        title: "Stay and Living Experience",
        bullets: [
          "Air-conditioned shared dormitories",
          "Safe and supervised environment",
          "Community living that builds responsibility and independence",
        ],
      },
      {
        title: "Daily Routine Snapshot",
        bullets: [
          "Morning yoga, meditation, and nature walk",
          "Hands-on learning and farm activities",
          "Expert sessions and workshops",
          "Adventure sports and games",
          "Evening storytelling, music, and reflection",
        ],
      },
      {
        title: "Camp Dates (3 Days, 3 Nights)",
        bullets: [
          "4-7 May 2026",
          "7-10 May 2026",
          "11-14 May 2026",
          "14-17 May 2026",
          "25-28 May 2026",
          "28-31 May 2026",
          "1-4 June 2026",
          "4-7 June 2026",
        ],
      },
      {
        title: "Important Information",
        bullets: [
          "Parents/guardians drop participants on Day 1",
          "Pick-up on Day 4",
          "Limited seats per batch",
          "Registration link will be shared soon",
        ],
      },
    ],
  },
];

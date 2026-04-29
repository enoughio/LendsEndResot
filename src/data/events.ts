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
    title: "Sumiran Forest Residential Camp",
    shortDescription:
      "Residential summer camp (ages 10-16) with adventure, learning, and nature immersion in Sumiran Forest.",
    description:
      `A three-day, three-night residential camp designed for children to learn, explore, and grow in a living forest ecosystem.

Sumiran is a 300-acre man-made, living forest created with care and respect for nature. It is a learning ecosystem where children experience nature up close, sustainable living practices, and a slower, mindful way of life.

The camp blends adventure, hands-on learning, creative expression, and community living to build confidence, character, and connection with nature.`,
    images: ["/about/aboutHero.png", "/gallery/kids.jpeg", "/gallery/stargazing.jpeg"],
    startDate: "2026-05-04",
    endDate: "2026-05-07",
    time: "3 days, 3 nights (multiple batches)",
    location: "Land's End - The Last Resort, Sumiran Forest, Near Bhopal",
    price: "INR 9,900 per participant",
    registrationLink: "https://rzp.io/rzp/fnnrvFkZ",
    contact: ["+91 6268244196 ", "landsend.sumiran@gmail.com"],
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


  {
  id: "5",
  slug: "starry-nights-retreat-2026",
  title: "Starry Nights: Stargazing & Storytelling Retreat",
  shortDescription:
    "A weekend retreat of stargazing, storytelling, and forest immersion under the night sky.",
  description:
    `Step away from city lights and into a universe of stories and stars at Sumiran Forest.

This two-day retreat brings together the wonder of astronomy and the art of storytelling. Evenings are spent under open skies with expert stargazers from Astrophiles India Club, while days feature immersive storytelling sessions curated by Bharat Storytellers.

Whether you're a beginner or a passionate sky-watcher, this experience offers a rare chance to slow down, connect, and explore the cosmos in a deeply human way.`,
  images: ["/gallery/stargazing.jpeg", "/gallery/campfire.jpg"],
  startDate: "2026-05-02",
  endDate: "2026-05-03",
  time: "Weekend Retreat",
  location: "Land's End - The Last Resort, Sumiran Forest, Near Bhopal",
  price: "Contact for details",
  includes: [
    "Guided stargazing with telescopes",
    "Storytelling sessions",
    "Stay and meals",
    "Forest experience",
  ],
}, 

{
  id: "6",
  slug: "reiki-level-1-workshop-2026",
  title: "Reiki Level 1 Workshop",
  shortDescription:
    "Learn the foundations of Reiki healing with international Reiki Master Paula Horan.",
  description:
    `Join an intimate Level 1 Reiki certification workshop guided by internationally renowned Reiki Master Paula Horan.

Set in the peaceful environment of Sumiran Forest, this workshop introduces the core principles of Reiki — energy healing, balance, and self-awareness.

Participants will gain practical knowledge, attunement, and a deeper connection with their own healing capabilities.`,
  images: ["/gallery/workshop1.jpg", "/gallery/healing.jpg"],
  startDate: "2026-05-09",
  endDate: "2026-05-10",
  time: "09:00 AM — 05:00 PM",
  location: "Land's End - The Last Resort, Sumiran Forest, Near Bhopal",
  price: "Contact for details",
  includes: [
    "Level 1 Reiki certification",
    "Guided sessions by Paula Horan",
    "Stay and meals",
    "Workshop materials",
  ],
}, 

{
  id: "7",
  slug: "life-without-medicine-retreat-2026",
  title: "Life Without Medicine Retreat",
  shortDescription:
    "A 5-day holistic wellness retreat focused on natural healing and lifestyle transformation.",
  description:
    `Explore a natural and holistic approach to health at this immersive 5-day retreat in Sumiran Forest.

Through breathwork, yoga, mindfulness, and nature therapy, participants will learn how to reduce dependency on medication and build a sustainable, healthy lifestyle.

This retreat is ideal for those dealing with stress, lifestyle conditions, or seeking a deeper connection with their body and mind.`,
  images: ["/gallery/yoga.jpg", "/gallery/kids.jpeg"],
  startDate: "2026-05-20",
  endDate: "2026-05-24",
  time: "5 Days / 4 Nights",
  location: "Land's End - The Last Resort, Sumiran Forest, Near Bhopal",
  price: "Contact for details",
  includes: [
    "Holistic health sessions",
    "Yoga, breathwork, and meditation",
    "Nature therapy and forest walks",
    "Stay and therapeutic meals",
  ],
}, 

{
  id: "8",
  slug: "summer-camp-batch-1-2026",
  title: "Sumiran Forest Residential Summer Camp — Batch 1",
  shortDescription:
    "4-day residential forest camp for children (ages 10–16) with adventure, learning, and nature immersion.",
  description:
    `A transformative residential camp where children explore nature, build confidence, and develop life skills in a safe, immersive environment.

Set in a 300-acre living forest, this camp blends adventure activities, storytelling, creativity, and hands-on learning with sustainable living practices.

Children experience community living, outdoor exploration, and personal growth away from screens and city life.`,
  images: ["/gallery/kids.jpeg", "/gallery/campfire.jpg"],
  startDate: "2026-05-14",
  endDate: "2026-05-17",
  time: "4 Days / 3 Nights",
  location: "Land's End - The Last Resort, Sumiran Forest, Near Bhopal",
  price: "INR 9,900 per participant",
  includes: [
    "Stay (shared dormitories)",
    "Nutritious meals",
    "Adventure and learning activities",
    "Workshops and expert sessions",
  ],
  whoFor: [
    "Children aged 10–16",
    "Students interested in creativity, confidence, and nature",
  ],
}, 

{
  id: "9",
  slug: "summer-camp-batch-2-2026",
  title: "Sumiran Forest Residential Summer Camp — Batch 2",
  shortDescription:
    "5-day residential forest camp for children (ages 10–16) with adventure and learning.",
  description:
    "Same program as Batch 1 with extended duration and immersive activities in Sumiran Forest.",
  images: ["/gallery/kids.jpeg"],
  startDate: "2026-05-27",
  endDate: "2026-05-31",
  time: "5 Days / 4 Nights",
  location: "Land's End - The Last Resort, Sumiran Forest, Near Bhopal",
  price: "INR 9,900 per participant",
}, 


{
  id: "10",
  slug: "summer-camp-batch-3-2026",
  title: "Sumiran Forest Residential Summer Camp — Batch 3",
  shortDescription:
    "4-day residential forest camp for children (ages 10–16).",
  description:
    "Same program as previous batches with a focus on nature immersion, creativity, and life skills.",
  images: ["/gallery/kids.jpeg"],
  startDate: "2026-06-04",
  endDate: "2026-06-07",
  time: "4 Days / 3 Nights",
  location: "Land's End - The Last Resort, Sumiran Forest, Near Bhopal",
  price: "INR 9,900 per participant",
}


];

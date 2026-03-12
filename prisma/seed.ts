import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import type { ActivityStatus } from "../src/generated/prisma/enums";

type ActivitySeed = {
  name: string;
  duration: number;
  price: number;
  status: ActivityStatus;
};

type RoomTypeSeed = {
  name: string;
  capacity: number;
  bedType: string;
  description: string;
  basePrice: number;
  size_sqft: string;
  amenities: string[];
  totalRooms: number;
};

type VisitPackageSeed = {
  name: string;
  packageType: "FULL_DAY" | "HALF_DAY" | "SHORT_VISIT";
  duration: number;
  basePrice: number;
  maxActivity: number;
  maxGroupSize: number;
  timing: string;
  includes: string[];
  status: "ACTIVE" | "INACTIVE";
  image: string[];
  description: string;
};

type AdminSeed = {
  name: string;
  email: string;
  phone: string;
};

const activities: ActivitySeed[] = [
  { name: "Kayaking", duration: 1.5, price: 800, status: "ACTIVE" },
  { name: "Target Shooting", duration: 2.5, price: 1200, status: "ACTIVE" },
  { name: "Bird Watching", duration: 2, price: 500, status: "ACTIVE" },
  { name: "Jungle Trek", duration: 3, price: 800, status: "ACTIVE" },
  { name: "River Rafting", duration: 2, price: 1500, status: "ACTIVE" },
  { name: "Star Gazing", duration: 2, price: 1000, status: "ACTIVE" },
  { name: "Nature Photography", duration: 3, price: 700, status: "ACTIVE" },
  { name: "Campfire Experience", duration: 1.5, price: 600, status: "ACTIVE" },
  { name: "Wildlife Safari", duration: 2.5, price: 1200, status: "ACTIVE" },
  { name: "Rock Climbing", duration: 2, price: 1000, status: "ACTIVE" },
];

const roomTypes: RoomTypeSeed[] = [
  {
    name: "Deluxe Room",
    capacity: 2,
    bedType: "Queen Bed",
    description: "Cozy room with forest views and modern amenities",
    basePrice: 4999,
    size_sqft: "320",
    amenities: ["Queen Bed", "Private Bathroom", "AC", "Balcony"],
    totalRooms: 0,
  },
  {
    name: "Executive Rooms",
    capacity: 3,
    bedType: "King Bed",
    description: "Spacious suite with living area and premium furnishings",
    basePrice: 7999,
    size_sqft: "460",
    amenities: ["King Bed", "Living Area", "Jacuzzi", "Mini Bar", "Terrace"],
    totalRooms: 0,
  },
  {
    name: "Tower Room",
    capacity: 4,
    bedType: "2 Bedrooms",
    description: "Private villa nestled in the forest with exclusive amenities",
    basePrice: 12999,
    size_sqft: "700",
    amenities: ["2 Bedrooms", "Private Pool", "Kitchen", "Dining Area", "Garden"],
    totalRooms: 0,
  },
  {
    name: "Dorm Bed",
    capacity: 6,
    bedType: "3 Bedrooms",
    description: "Luxurious cottage with premium services and butler",
    basePrice: 18999,
    size_sqft: "1100",
    amenities: ["3 Bedrooms", "Private Pool", "Butler Service", "Home Theater", "BBQ Area"],
    totalRooms: 0,
  },
];

const visitPackages: VisitPackageSeed[] = [
  {
    name: "Full Day Visit at Sumiran",
    packageType: "FULL_DAY",
    duration: 9,
    basePrice: 2999,
    maxActivity: 2,
    maxGroupSize: 10,
    timing: "8-10 hours",
    includes: [
      "Choose any 2 activities from our list",
      "Dedicated forest guide included",
      "Full forest safari experience",
      "Meals and refreshments included",
    ],
    status: "ACTIVE",
    image: [
      "https://images.unsplash.com/photo-1751931817996-368c9ee352ee?auto=format&fit=crop&w=1080&q=80",
    ],
    description: "Full day adventure package at Sumiran with guided activities and meals.",
  },
  {
    name: "Half Day Visit at Sumiran",
    packageType: "HALF_DAY",
    duration: 4.5,
    basePrice: 1499,
    maxActivity: 1,
    maxGroupSize: 10,
    timing: "4-5 hours",
    includes: [
      "Choose any 1 activity from our list",
      "Activity guide included",
      "Light refreshments included",
    ],
    status: "ACTIVE",
    image: [
      "https://images.unsplash.com/photo-1537166947947-46e504aa0555?auto=format&fit=crop&w=1080&q=80",
    ],
    description: "Half day adventure package at Sumiran with one guided activity.",
  },
];

const admins: AdminSeed[] = [
  {
    name: "Aniket",
    email: "aniketjatav.dev@gmail.com",
    phone: "+919000000001",
  },
  {
    name: "Aviral",
    email: "aviralp@live.com",
    phone: "+919000000002",
  },
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    for (const activity of activities) {
      const existing = await prisma.activity.findFirst({
        where: { name: activity.name },
        select: { id: true },
      });

      if (existing) {
        await prisma.activity.update({
          where: { id: existing.id },
          data: activity,
        });
      } else {
        await prisma.activity.create({ data: activity });
      }
    }

    for (const roomType of roomTypes) {
      const existing = await prisma.roomType.findFirst({
        where: { name: roomType.name },
        select: { id: true },
      });

      if (existing) {
        await prisma.roomType.update({
          where: { id: existing.id },
          data: roomType,
        });
      } else {
        await prisma.roomType.create({ data: roomType });
      }
    }

    for (const visitPackage of visitPackages) {
      const existing = await prisma.visitPackage.findFirst({
        where: { name: visitPackage.name },
        select: { id: true },
      });

      if (existing) {
        await prisma.visitPackage.update({
          where: { id: existing.id },
          data: visitPackage,
        });
      } else {
        await prisma.visitPackage.create({ data: visitPackage });
      }
    }

    for (const admin of admins) {
      await prisma.user.upsert({
        where: { email: admin.email },
        update: {
          name: admin.name,
          role: "ADMIN",
          emailVerified: true,
          phoneVerified: true,
          phone: admin.phone,
        },
        create: {
          name: admin.name,
          email: admin.email,
          role: "ADMIN",
          // Password is required by schema, but OTP flow does not use password login.
          password: "otp-only-admin-account",
          phone: admin.phone,
          emailVerified: true,
          phoneVerified: true,
        },
      });
    }

    const [activityCount, roomTypeCount, packageCount, adminCount] = await Promise.all([
      prisma.activity.count(),
      prisma.roomType.count(),
      prisma.visitPackage.count(),
      prisma.user.count({ where: { role: "ADMIN" } }),
    ]);

    console.log("Seed completed.");
    console.log(`Activities: ${activityCount}`);
    console.log(`Room types: ${roomTypeCount}`);
    console.log(`Visit packages: ${packageCount}`);
    console.log(`Admins: ${adminCount}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});

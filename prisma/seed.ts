import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

type RoomTypeSeed = {
  match: string;
  name: string;
  capacity: number;
  baseOccupancy: number;
  extraPersonPrice: number;
  bedType: string;
  description: string;
  basePrice: number;
  breakfastOnlyPrice: number;
  breakfastPlusMealPrice: number;
  allMealsPrice: number;
  size_sqft: string;
  amenities: string[];
  isDormRoom: boolean;
};

type MealPlanSeed = {
  name: string;
  description: string;
};

type VisitPackageSeed = {
  packageType: "FULL_DAY" | "HALF_DAY" | "SHORT_VISIT";
  name: string;
  duration: number;
  basePrice: number;
  timing: string;
  description: string;
  includes: string[];
};

const roomTypes: RoomTypeSeed[] = [
  {
    match: "sangat",
    name: "Sangat",
    capacity: 12,
    baseOccupancy: 1,
    extraPersonPrice: 0,
    bedType: "Shared bunks",
    description: "Shared AC dormitory. Priced per person, per night.",
    basePrice: 1200,
    breakfastOnlyPrice: 1200,
    breakfastPlusMealPrice: 1600,
    allMealsPrice: 2000,
    size_sqft: "Shared",
    amenities: ["AC", "Shared dormitory"],
    isDormRoom: true,
  },
  {
    match: "nikunj",
    name: "Nikunj",
    capacity: 3,
    baseOccupancy: 2,
    extraPersonPrice: 1000,
    bedType: "Double bed",
    description: "AC double room, flower-themed. Rate is for two. Extra person ₹1,000 per night, with all meals.",
    basePrice: 3200,
    breakfastOnlyPrice: 3200,
    breakfastPlusMealPrice: 4000,
    allMealsPrice: 4800,
    size_sqft: "Double",
    amenities: ["AC", "Double room"],
    isDormRoom: false,
  },
  {
    match: "aranya",
    name: "Aranya",
    capacity: 3,
    baseOccupancy: 2,
    extraPersonPrice: 2000,
    bedType: "Double bed",
    description: "AC double room, forest-themed. Rate is for two. Extra person ₹2,000 per night, with all meals.",
    basePrice: 4200,
    breakfastOnlyPrice: 4200,
    breakfastPlusMealPrice: 5000,
    allMealsPrice: 5800,
    size_sqft: "Double",
    amenities: ["AC", "Double room"],
    isDormRoom: false,
  },
  {
    match: "vyom",
    name: "Vyom",
    capacity: 3,
    baseOccupancy: 2,
    extraPersonPrice: 2000,
    bedType: "Double bed",
    description: "AC tower room, the one with the view. Rate is for two. Extra person ₹2,000 per night, with all meals.",
    basePrice: 5200,
    breakfastOnlyPrice: 5200,
    breakfastPlusMealPrice: 6000,
    allMealsPrice: 6800,
    size_sqft: "Tower",
    amenities: ["AC", "Tower room"],
    isDormRoom: false,
  },
];

const mealPlans: MealPlanSeed[] = [
  {
    name: "Breakfast only",
    description: "Breakfast is included in the room or dorm nightly price for this column. It is not charged again per guest.",
  },
  {
    name: "Breakfast + one meal",
    description: "Breakfast and one meal are included in the room or dorm nightly price for this column. They are not charged again per guest.",
  },
  {
    name: "All meals",
    description: "All meals are included in the room or dorm nightly price for this column. They are not charged again per guest.",
  },
];

const visitPackages: VisitPackageSeed[] = [
  {
    packageType: "FULL_DAY",
    name: "Day-Long Retreat",
    duration: 8.5,
    basePrice: 1500,
    timing: "9:00 AM – 5:30 PM",
    description: "Breakfast on arrival · Lunch · Evening High Tea",
    includes: [
      "Guided Forest Walk",
      "Archery & Target Shooting",
      "Fun Games & Activities",
      "Storytelling Circle (groups of 10+)",
      "Lake-side Reflection",
      "Farm Visit",
      "Harvest Experience (in season)",
      "Boating, Kayaking & Zipline (at extra cost)",
    ],
  },
  {
    packageType: "HALF_DAY",
    name: "Half-Day Visit",
    duration: 4,
    basePrice: 1000,
    timing: "4 hours · morning or afternoon",
    description: "Lunch · Tea & Snacks (on arrival or departure)",
    includes: [
      "Guided Forest Walk",
      "Archery & Target Shooting",
      "Farm Visit",
      "Fun Games & Activities",
      "Optional Lake Visit",
    ],
  },
  {
    packageType: "SHORT_VISIT",
    name: "Short Visit",
    duration: 2,
    basePrice: 500,
    timing: "2 hours",
    description: "Tea and snacks are included. Buffet dining is available separately.",
    includes: ["90-minute Guided Forest Walk", "Farm Visit", "Tea & Snacks"],
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
    for (const roomType of roomTypes) {
      const existing = await prisma.roomType.findFirst({
        where: { name: { contains: roomType.match, mode: "insensitive" } },
        select: { id: true, capacity: true },
      });

      const data = {
        name: roomType.name,
        description: roomType.description,
        basePrice: roomType.basePrice,
        breakfastOnlyPrice: roomType.breakfastOnlyPrice,
        breakfastPlusMealPrice: roomType.breakfastPlusMealPrice,
        allMealsPrice: roomType.allMealsPrice,
        extraPersonPrice: roomType.extraPersonPrice,
        baseOccupancy: roomType.baseOccupancy,
        isDormRoom: roomType.isDormRoom,
        isSingleOccupancy: false,
        bedType: roomType.bedType,
        capacity: existing ? Math.max(existing.capacity, roomType.isDormRoom ? 8 : 3) : roomType.capacity,
      };

      if (existing) {
        await prisma.roomType.update({ where: { id: existing.id }, data });
      } else {
        await prisma.roomType.create({
          data: {
            ...data,
            capacity: roomType.capacity,
            size_sqft: roomType.size_sqft,
            amenities: roomType.amenities,
            totalRooms: 0,
          },
        });
      }
    }

    for (const mealPlan of mealPlans) {
      const existing = await prisma.mealPlan.findFirst({
        where: { name: { equals: mealPlan.name, mode: "insensitive" } },
        select: { id: true },
      });
      const data = {
        name: mealPlan.name,
        description: mealPlan.description,
        pricePerPerson: 0,
        isActive: true,
      };
      if (existing) {
        await prisma.mealPlan.update({ where: { id: existing.id }, data });
      } else {
        await prisma.mealPlan.create({ data });
      }
    }

    await prisma.mealPlan.updateMany({
      where: { name: { notIn: mealPlans.map((plan) => plan.name) } },
      data: { pricePerPerson: 0, isActive: false },
    });

    for (const visitPackage of visitPackages) {
      const existing = await prisma.visitPackage.findFirst({
        where: { packageType: visitPackage.packageType },
        select: { id: true, maxGroupSize: true },
      });
      const data = {
        name: visitPackage.name,
        duration: visitPackage.duration,
        basePrice: visitPackage.basePrice,
        timing: visitPackage.timing,
        description: visitPackage.description,
        includes: visitPackage.includes,
        minGroupSize: 4,
        maxGroupSize: Math.max(existing?.maxGroupSize ?? 0, 30),
        status: "ACTIVE" as const,
      };
      if (existing) {
        await prisma.visitPackage.update({ where: { id: existing.id }, data });
      } else {
        await prisma.visitPackage.create({
          data: {
            ...data,
            packageType: visitPackage.packageType,
            image: [],
          },
        });
      }
    }

    const [roomTypeCount, mealPlanCount, visitPackageCount] = await Promise.all([
      prisma.roomType.count(),
      prisma.mealPlan.count(),
      prisma.visitPackage.count(),
    ]);

    console.log("Seed completed.");
    console.log(`Room types: ${roomTypeCount}`);
    console.log(`Meal plans: ${mealPlanCount}`);
    console.log(`Visit packages: ${visitPackageCount}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});

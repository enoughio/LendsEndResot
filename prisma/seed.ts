import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

type RoomTypeSeed = {
  name: string;
  capacity: number;
  baseOccupancy: number;
  extraPersonPrice: number;
  bedType: string;
  description: string;
  basePrice: number;
  size_sqft: string;
  amenities: string[];
  totalRooms: number;
};

type MealPlanSeed = {
  name: string;
  description: string;
  pricePerPerson: number;
  isActive: boolean;
};


const roomTypes: RoomTypeSeed[] = [
  {
    name: "Deluxe Room",
    capacity: 2,
    baseOccupancy: 2,
    extraPersonPrice: 1000,
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
    baseOccupancy: 2,
    extraPersonPrice: 1200,
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
    baseOccupancy: 2,
    extraPersonPrice: 1500,
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
    baseOccupancy: 2,
    extraPersonPrice: 1800,
    bedType: "3 Bedrooms",
    description: "Luxurious cottage with premium services and butler",
    basePrice: 18999,
    size_sqft: "1100",
    amenities: ["3 Bedrooms", "Private Pool", "Butler Service", "Home Theater", "BBQ Area"],
    totalRooms: 0,
  },
];

const mealPlans: MealPlanSeed[] = [
  {
    name: "Organic Veg Meal Plan",
    description: "Breakfast, lunch, high tea, and dinner. Vegetarian, organic, and locally sourced.",
    pricePerPerson: 1000,
    isActive: true,
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

    for (const mealPlan of mealPlans) {
      const existing = await prisma.mealPlan.findFirst({
        where: { name: mealPlan.name },
        select: { id: true },
      });

      if (existing) {
        await prisma.mealPlan.update({
          where: { id: existing.id },
          data: mealPlan,
        });
      } else {
        await prisma.mealPlan.create({ data: mealPlan });
      }
    }

    const [roomTypeCount, mealPlanCount] = await Promise.all([
      prisma.roomType.count(),
      prisma.mealPlan.count(),
    ]);

    console.log("Seed completed.");
    console.log(`Room types: ${roomTypeCount}`);
    console.log(`Meal plans: ${mealPlanCount}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});

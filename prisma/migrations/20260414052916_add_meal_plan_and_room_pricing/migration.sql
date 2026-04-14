-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "extraGuestCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "extraGuestPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "mealPlanId" TEXT,
ADD COLUMN     "mealPlanName" TEXT,
ADD COLUMN     "mealPlanPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RoomType" ADD COLUMN     "baseOccupancy" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "extraPersonPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "pricePerPerson" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

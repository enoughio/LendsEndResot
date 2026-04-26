-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "guestList" JSONB,
ADD COLUMN     "roomsBooked" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "RoomType" ADD COLUMN     "isSingleOccupancy" BOOLEAN NOT NULL DEFAULT false;

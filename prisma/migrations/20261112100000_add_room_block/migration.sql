-- CreateEnum
CREATE TYPE "RoomBlockReason" AS ENUM ('RETREAT', 'GROUP_BOOKING', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "RoomBlock" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" "RoomBlockReason" NOT NULL,
    "note" TEXT,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RoomBlock_roomId_idx" ON "RoomBlock"("roomId");

-- CreateIndex
CREATE INDEX "RoomBlock_date_idx" ON "RoomBlock"("date");

-- CreateIndex
CREATE INDEX "RoomBlock_groupId_idx" ON "RoomBlock"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomBlock_roomId_date_key" ON "RoomBlock"("roomId", "date");

-- AddForeignKey
ALTER TABLE "RoomBlock" ADD CONSTRAINT "RoomBlock_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

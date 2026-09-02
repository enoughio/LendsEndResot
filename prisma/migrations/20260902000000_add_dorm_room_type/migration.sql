ALTER TABLE "RoomType" ADD COLUMN "isDormRoom" BOOLEAN NOT NULL DEFAULT false;

UPDATE "RoomType"
SET "isDormRoom" = true,
    "isSingleOccupancy" = false
WHERE LOWER("name") LIKE '%sangat%';
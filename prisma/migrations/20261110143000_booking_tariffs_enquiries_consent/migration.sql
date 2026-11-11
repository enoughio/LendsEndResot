-- Tariff columns, quoted amounts, enquiries, and house-rules consent.

ALTER TABLE "RoomType" ADD COLUMN "breakfastOnlyPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "RoomType" ADD COLUMN "breakfastPlusMealPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "RoomType" ADD COLUMN "allMealsPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;

ALTER TABLE "VisitPackage" ADD COLUMN "minGroupSize" INTEGER NOT NULL DEFAULT 4;

ALTER TABLE "Booking" ADD COLUMN "quotedRoomAmount" DOUBLE PRECISION;
ALTER TABLE "Booking" ADD COLUMN "quotedMealAmount" DOUBLE PRECISION;
ALTER TABLE "Booking" ADD COLUMN "quotedExtraGuestAmount" DOUBLE PRECISION;

CREATE TABLE "BookingEnquiry" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3) NOT NULL,
    "natureOfRetreat" TEXT,
    "expectedParticipants" INTEGER,
    "groupType" TEXT,
    "organization" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingEnquiry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HouseRulesConsent" (
    "id" TEXT NOT NULL,
    "signerName" TEXT NOT NULL,
    "signatureData" TEXT NOT NULL,
    "acceptedRuleIds" TEXT[],
    "exitPolicyAccepted" BOOLEAN NOT NULL,
    "purpose" TEXT NOT NULL,
    "bookingId" TEXT,
    "enquiryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HouseRulesConsent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "HouseRulesConsent_bookingId_key" ON "HouseRulesConsent"("bookingId");
CREATE UNIQUE INDEX "HouseRulesConsent_enquiryId_key" ON "HouseRulesConsent"("enquiryId");
CREATE INDEX "HouseRulesConsent_purpose_idx" ON "HouseRulesConsent"("purpose");
CREATE INDEX "HouseRulesConsent_createdAt_idx" ON "HouseRulesConsent"("createdAt");

CREATE INDEX "BookingEnquiry_kind_idx" ON "BookingEnquiry"("kind");
CREATE INDEX "BookingEnquiry_status_idx" ON "BookingEnquiry"("status");
CREATE INDEX "BookingEnquiry_createdAt_idx" ON "BookingEnquiry"("createdAt");

ALTER TABLE "HouseRulesConsent" ADD CONSTRAINT "HouseRulesConsent_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "HouseRulesConsent" ADD CONSTRAINT "HouseRulesConsent_enquiryId_fkey" FOREIGN KEY ("enquiryId") REFERENCES "BookingEnquiry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Stay tariffs. Match live room names without deleting other room types.
UPDATE "RoomType"
SET
    "name" = 'Sangat',
    "description" = 'Shared AC dormitory. Priced per person, per night.',
    "basePrice" = 1200,
    "breakfastOnlyPrice" = 1200,
    "breakfastPlusMealPrice" = 1600,
    "allMealsPrice" = 2000,
    "extraPersonPrice" = 0,
    "baseOccupancy" = 1,
    "isDormRoom" = true,
    "isSingleOccupancy" = false,
    "capacity" = GREATEST("capacity", 8)
WHERE "name" ILIKE '%sangat%';

UPDATE "RoomType"
SET
    "name" = 'Nikunj',
    "description" = 'AC double room, flower-themed. Rate is for two. Extra person ₹1,000 per night, with all meals.',
    "basePrice" = 3200,
    "breakfastOnlyPrice" = 3200,
    "breakfastPlusMealPrice" = 4000,
    "allMealsPrice" = 4800,
    "extraPersonPrice" = 1000,
    "baseOccupancy" = 2,
    "isDormRoom" = false,
    "isSingleOccupancy" = false,
    "capacity" = GREATEST("capacity", 3)
WHERE "name" ILIKE '%nikunj%';

UPDATE "RoomType"
SET
    "name" = 'Aranya',
    "description" = 'AC double room, forest-themed. Rate is for two. Extra person ₹2,000 per night, with all meals.',
    "basePrice" = 4200,
    "breakfastOnlyPrice" = 4200,
    "breakfastPlusMealPrice" = 5000,
    "allMealsPrice" = 5800,
    "extraPersonPrice" = 2000,
    "baseOccupancy" = 2,
    "isDormRoom" = false,
    "isSingleOccupancy" = false,
    "capacity" = GREATEST("capacity", 3)
WHERE "name" ILIKE '%aranya%';

UPDATE "RoomType"
SET
    "name" = 'Vyom',
    "description" = 'AC tower room, the one with the view. Rate is for two. Extra person ₹2,000 per night, with all meals.',
    "basePrice" = 5200,
    "breakfastOnlyPrice" = 5200,
    "breakfastPlusMealPrice" = 6000,
    "allMealsPrice" = 6800,
    "extraPersonPrice" = 2000,
    "baseOccupancy" = 2,
    "isDormRoom" = false,
    "isSingleOccupancy" = false,
    "capacity" = GREATEST("capacity", 3)
WHERE "name" ILIKE '%vyom%';

INSERT INTO "RoomType" (
    "id", "name", "capacity", "baseOccupancy", "bedType", "description", "basePrice",
    "extraPersonPrice", "breakfastOnlyPrice", "breakfastPlusMealPrice", "allMealsPrice",
    "size_sqft", "amenities", "totalRooms", "isSingleOccupancy", "isDormRoom"
)
SELECT
    'roomtype_sangat', 'Sangat', 12, 1, 'Shared bunks',
    'Shared AC dormitory. Priced per person, per night.',
    1200, 0, 1200, 1600, 2000, 'Shared',
    ARRAY['AC', 'Shared dormitory']::TEXT[], 0, false, true
WHERE NOT EXISTS (SELECT 1 FROM "RoomType" WHERE "name" ILIKE '%sangat%');

INSERT INTO "RoomType" (
    "id", "name", "capacity", "baseOccupancy", "bedType", "description", "basePrice",
    "extraPersonPrice", "breakfastOnlyPrice", "breakfastPlusMealPrice", "allMealsPrice",
    "size_sqft", "amenities", "totalRooms", "isSingleOccupancy", "isDormRoom"
)
SELECT
    'roomtype_nikunj', 'Nikunj', 3, 2, 'Double bed',
    'AC double room, flower-themed. Rate is for two. Extra person ₹1,000 per night, with all meals.',
    3200, 1000, 3200, 4000, 4800, 'Double',
    ARRAY['AC', 'Double room']::TEXT[], 0, false, false
WHERE NOT EXISTS (SELECT 1 FROM "RoomType" WHERE "name" ILIKE '%nikunj%');

INSERT INTO "RoomType" (
    "id", "name", "capacity", "baseOccupancy", "bedType", "description", "basePrice",
    "extraPersonPrice", "breakfastOnlyPrice", "breakfastPlusMealPrice", "allMealsPrice",
    "size_sqft", "amenities", "totalRooms", "isSingleOccupancy", "isDormRoom"
)
SELECT
    'roomtype_aranya', 'Aranya', 3, 2, 'Double bed',
    'AC double room, forest-themed. Rate is for two. Extra person ₹2,000 per night, with all meals.',
    4200, 2000, 4200, 5000, 5800, 'Double',
    ARRAY['AC', 'Double room']::TEXT[], 0, false, false
WHERE NOT EXISTS (SELECT 1 FROM "RoomType" WHERE "name" ILIKE '%aranya%');

INSERT INTO "RoomType" (
    "id", "name", "capacity", "baseOccupancy", "bedType", "description", "basePrice",
    "extraPersonPrice", "breakfastOnlyPrice", "breakfastPlusMealPrice", "allMealsPrice",
    "size_sqft", "amenities", "totalRooms", "isSingleOccupancy", "isDormRoom"
)
SELECT
    'roomtype_vyom', 'Vyom', 3, 2, 'Double bed',
    'AC tower room, the one with the view. Rate is for two. Extra person ₹2,000 per night, with all meals.',
    5200, 2000, 5200, 6000, 6800, 'Tower',
    ARRAY['AC', 'Tower room']::TEXT[], 0, false, false
WHERE NOT EXISTS (SELECT 1 FROM "RoomType" WHERE "name" ILIKE '%vyom%');

-- Meal plans are labels for the nightly column. Price stays 0 so it is not charged again.
UPDATE "MealPlan"
SET
    "name" = 'All meals',
    "description" = 'All meals are included in the room or dorm nightly price for this column. They are not charged again per guest.',
    "pricePerPerson" = 0,
    "isActive" = true,
    "updatedAt" = CURRENT_TIMESTAMP
WHERE LOWER("name") LIKE '%all meal%';

UPDATE "MealPlan"
SET
    "name" = 'Breakfast + one meal',
    "description" = 'Breakfast and one meal are included in the room or dorm nightly price for this column. They are not charged again per guest.',
    "pricePerPerson" = 0,
    "isActive" = true,
    "updatedAt" = CURRENT_TIMESTAMP
WHERE LOWER("name") LIKE '%one meal%'
   OR LOWER("name") LIKE '%breakfast +%'
   OR LOWER("name") LIKE '%breakfast plus%';

UPDATE "MealPlan"
SET
    "name" = 'Breakfast only',
    "description" = 'Breakfast is included in the room or dorm nightly price for this column. It is not charged again per guest.',
    "pricePerPerson" = 0,
    "isActive" = true,
    "updatedAt" = CURRENT_TIMESTAMP
WHERE LOWER("name") LIKE '%breakfast%'
  AND LOWER("name") NOT LIKE '%one%'
  AND LOWER("name") NOT LIKE '%all%'
  AND LOWER("name") NOT LIKE '%+%';

INSERT INTO "MealPlan" ("id", "name", "description", "pricePerPerson", "isActive", "createdAt", "updatedAt")
SELECT
    'meal_breakfast_only',
    'Breakfast only',
    'Breakfast is included in the room or dorm nightly price for this column. It is not charged again per guest.',
    0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "MealPlan" WHERE LOWER("name") = 'breakfast only');

INSERT INTO "MealPlan" ("id", "name", "description", "pricePerPerson", "isActive", "createdAt", "updatedAt")
SELECT
    'meal_breakfast_plus_one',
    'Breakfast + one meal',
    'Breakfast and one meal are included in the room or dorm nightly price for this column. They are not charged again per guest.',
    0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "MealPlan" WHERE LOWER("name") = 'breakfast + one meal');

INSERT INTO "MealPlan" ("id", "name", "description", "pricePerPerson", "isActive", "createdAt", "updatedAt")
SELECT
    'meal_all_meals',
    'All meals',
    'All meals are included in the room or dorm nightly price for this column. They are not charged again per guest.',
    0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "MealPlan" WHERE LOWER("name") = 'all meals');

UPDATE "MealPlan"
SET "pricePerPerson" = 0, "isActive" = false, "updatedAt" = CURRENT_TIMESTAMP
WHERE LOWER("name") NOT IN ('breakfast only', 'breakfast + one meal', 'all meals');

-- Day visits. Meals in the description are included in the per-person price.
UPDATE "VisitPackage"
SET
    "name" = 'Day-Long Retreat',
    "basePrice" = 1500,
    "duration" = 8.5,
    "timing" = '9:00 AM – 5:30 PM',
    "minGroupSize" = 4,
    "maxGroupSize" = GREATEST("maxGroupSize", 30),
    "includes" = ARRAY[
        'Guided Forest Walk',
        'Archery & Target Shooting',
        'Fun Games & Activities',
        'Storytelling Circle (groups of 10+)',
        'Lake-side Reflection',
        'Farm Visit',
        'Harvest Experience (in season)',
        'Boating, Kayaking & Zipline (at extra cost)'
    ]::TEXT[],
    "description" = 'Breakfast on arrival · Lunch · Evening High Tea',
    "status" = 'ACTIVE',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "packageType" = 'FULL_DAY';

UPDATE "VisitPackage"
SET
    "name" = 'Half-Day Visit',
    "basePrice" = 1000,
    "duration" = 4,
    "timing" = '4 hours · morning or afternoon',
    "minGroupSize" = 4,
    "maxGroupSize" = GREATEST("maxGroupSize", 30),
    "includes" = ARRAY[
        'Guided Forest Walk',
        'Archery & Target Shooting',
        'Farm Visit',
        'Fun Games & Activities',
        'Optional Lake Visit'
    ]::TEXT[],
    "description" = 'Lunch · Tea & Snacks (on arrival or departure)',
    "status" = 'ACTIVE',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "packageType" = 'HALF_DAY';

UPDATE "VisitPackage"
SET
    "name" = 'Short Visit',
    "basePrice" = 500,
    "duration" = 2,
    "timing" = '2 hours',
    "minGroupSize" = 4,
    "maxGroupSize" = GREATEST("maxGroupSize", 30),
    "includes" = ARRAY[
        '90-minute Guided Forest Walk',
        'Farm Visit',
        'Tea & Snacks'
    ]::TEXT[],
    "description" = 'À la carte dining available separately',
    "status" = 'ACTIVE',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "packageType" = 'SHORT_VISIT';

INSERT INTO "VisitPackage" (
    "id", "name", "packageType", "duration", "basePrice", "maxActivity", "maxGroupSize", "minGroupSize",
    "timing", "includes", "status", "image", "description", "createdAt", "updatedAt"
)
SELECT
    'visit_full_day', 'Day-Long Retreat', 'FULL_DAY', 8.5, 1500, 1, 30, 4,
    '9:00 AM – 5:30 PM',
    ARRAY[
        'Guided Forest Walk',
        'Archery & Target Shooting',
        'Fun Games & Activities',
        'Storytelling Circle (groups of 10+)',
        'Lake-side Reflection',
        'Farm Visit',
        'Harvest Experience (in season)',
        'Boating, Kayaking & Zipline (at extra cost)'
    ]::TEXT[],
    'ACTIVE', ARRAY[]::TEXT[],
    'Breakfast on arrival · Lunch · Evening High Tea',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "VisitPackage" WHERE "packageType" = 'FULL_DAY');

INSERT INTO "VisitPackage" (
    "id", "name", "packageType", "duration", "basePrice", "maxActivity", "maxGroupSize", "minGroupSize",
    "timing", "includes", "status", "image", "description", "createdAt", "updatedAt"
)
SELECT
    'visit_half_day', 'Half-Day Visit', 'HALF_DAY', 4, 1000, 1, 30, 4,
    '4 hours · morning or afternoon',
    ARRAY[
        'Guided Forest Walk',
        'Archery & Target Shooting',
        'Farm Visit',
        'Fun Games & Activities',
        'Optional Lake Visit'
    ]::TEXT[],
    'ACTIVE', ARRAY[]::TEXT[],
    'Lunch · Tea & Snacks (on arrival or departure)',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "VisitPackage" WHERE "packageType" = 'HALF_DAY');

INSERT INTO "VisitPackage" (
    "id", "name", "packageType", "duration", "basePrice", "maxActivity", "maxGroupSize", "minGroupSize",
    "timing", "includes", "status", "image", "description", "createdAt", "updatedAt"
)
SELECT
    'visit_short', 'Short Visit', 'SHORT_VISIT', 2, 500, 1, 30, 4,
    '2 hours',
    ARRAY[
        '90-minute Guided Forest Walk',
        'Farm Visit',
        'Tea & Snacks'
    ]::TEXT[],
    'ACTIVE', ARRAY[]::TEXT[],
    'À la carte dining available separately',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "VisitPackage" WHERE "packageType" = 'SHORT_VISIT');

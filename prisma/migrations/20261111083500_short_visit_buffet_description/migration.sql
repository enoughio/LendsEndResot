-- Short visits include tea and snacks. Buffet dining is offered separately.
UPDATE "VisitPackage"
SET
    "description" = 'Tea and snacks are included. Buffet dining is available separately.',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "packageType" = 'SHORT_VISIT'
  AND (
    "description" IS NULL
    OR "description" ILIKE '%la carte%'
  );

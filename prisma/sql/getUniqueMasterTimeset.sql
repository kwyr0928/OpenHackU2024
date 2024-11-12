SELECT DISTINCT ON ("TimeSets"."masterId")
  "TimeSets"."id",
  "TimeSets"."userId",
  "TimeSets"."name",
  "TimeSets"."time",
  "TimeSets"."masterId",
  "TimeSets"."created_at",
  "TimeSets"."updated_at",
  "WholeSets"."timeSetId"
  FROM "TimeSets"
  LEFT JOIN "WholeSets" ON "TimeSets"."id" = "WholeSets"."timeSetId"
  WHERE
    "TimeSets"."userId" = $1
    AND "WholeSets"."timeSetId" IS NULL
  ORDER BY "TimeSets"."masterId", "TimeSets"."created_at" DESC;

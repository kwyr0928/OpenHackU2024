SELECT DISTINCT ON ("master_id")
  "id",
  "master_id",
  "updated_at"
  FROM "TimeSets"
  WHERE
    "userId" = $1
  ORDER BY "master_id", "created_at" DESC;

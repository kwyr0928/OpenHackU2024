SELECT DISTINCT ON ("masterId")
  *
  FROM "TimeSets"
  WHERE
    "userId" = $1
  ORDER BY "masterId", "created_at" DESC;

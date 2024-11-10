SELECT DISTINCT ON ("master_id")
  "id",
  "master_id",
  "updated_at"
  FROM "Items"
  WHERE
    "userId" = $1 AND
    "itemType" = $2
  ORDER BY "master_id", "created_at" DESC;

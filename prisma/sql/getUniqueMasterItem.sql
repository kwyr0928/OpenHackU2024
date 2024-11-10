SELECT DISTINCT ON ("masterId")
  *
  FROM "Items"
  WHERE
    "userId" = $1 AND
    "itemType" = $2
  ORDER BY "masterId", "created_at" DESC;

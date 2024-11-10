-- scripts/custom-query.sql
SELECT DISTINCT ON ("masterId")
  *
FROM "Items"
WHERE
  "userId" = 'cm39uc7uv0003btvndmmqt346' AND
  "itemType" = 2
ORDER BY "masterId", "created_at" DESC;

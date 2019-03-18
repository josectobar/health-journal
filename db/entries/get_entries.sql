SELECT id, title, date, tags
FROM entries
WHERE user_id = ${user_id}
ORDER BY date DESC;
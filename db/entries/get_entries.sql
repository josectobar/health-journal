SELECT id, title, date
FROM entries
WHERE user_id = ${user_id}
ORDER BY date DESC;
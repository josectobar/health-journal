SELECT indicator_id, reading, date
FROM indicator_users 
WHERE user_id = ${user_id}
ORDER BY date ASC
SELECT entries.id, title, date
FROM entries
join users
on users.id = entries.user_id
WHERE user_id = ${user_id}
ORDER BY date DESC;
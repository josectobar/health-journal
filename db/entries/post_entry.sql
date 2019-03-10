INSERT INTO entries (user_id, title, content, date)
values(${user_id}, ${title}, ${content}, ${date});

SELECT id, title, date
FROM entries
WHERE user_id = ${user_id}
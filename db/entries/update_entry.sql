UPDATE entries
SET title = ${title},
    content = ${content},
    date = ${date}
WHERE id = ${id} AND user_id = ${user_id};

SELECT id, title, date
FROM entries
WHERE user_id = ${user_id}
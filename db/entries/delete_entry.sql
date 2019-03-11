DELETE FROM entries
WHERE id = ${id} AND user_id = ${user_id};

SELECT id, title, date
FROM entries
WHERE user_id = ${user_id}
SELECT title, content, date, tags
FROM entries
where id = ${id} AND user_id = ${user_id}
SELECT title, content, date 
FROM entries
where id = ${id} AND user_id = ${user_id}
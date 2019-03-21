INSERT into tags (id, text)
values (${id}, ${text});
where user_id = ${user_id} AND entry_id = ${entry_id}

SELECT id, text
FROM tags
where user_id = ${user_id} AND entry_id = ${entry_id}
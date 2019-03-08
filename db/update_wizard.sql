UPDATE users
set wizard = ${wizard}
where id = ${id}
returning wizard
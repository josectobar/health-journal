INSERT INTO users ( name, username, password, email )
VALUES( ${name}, ${username}, ${password}, ${email} )
returning id, username, name, email, wizard
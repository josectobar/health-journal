INSERT INTO users ( name, username, password )
VALUES( ${name}, ${username}, ${password} )
returning id, username, name
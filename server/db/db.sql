CREATE TABLE users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    pword VARCHAR(50) NOT NULL
);

INSERT INTO users (username, first_name, last_name, email, pword) values ('srentas1', 'Steven', 'Rentas', 'srentas1@depaul.edu', 'supersecretpassword');

SELECT * FROM users WHERE username='srentas1' AND pword='supersecretpassword';
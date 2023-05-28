CREATE TABLE IF NOT EXISTS users 
(
    id BIGSERIAL NOT NULL,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    pword VARCHAR(50) NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    foodPref TEXT[],

    CONSTRAINT users_pkey 
        PRIMARY KEY(id)
);
-----TEST SAMPLES------
INSERT INTO users (username, first_name, last_name, email, pword,isAdmin,foodPref) 
    values ('admin', 'Admin', 'Admin', 'admin@depaul.edu', 'supersecretpassword',false,'Vegan');

INSERT INTO users (username, first_name, last_name, email, pword,isAdmin) 
    values ('eaguir13', 'Eric', 'Aguirre', 'eaguir13@depaul.edu', 'password',true);

INSERT INTO users (username, first_name, last_name, email, pword,isAdmin) 
    values ('test123', 'Test', 'Test', 'Test@depaul.edu', 'p123',false);

--Shows the inventory of all users
CREATE TABLE IF NOT EXISTS inventory
(
	product_id         SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL,
    description     VARCHAR(50) NOT NULL,
    amount            INTEGER NOT NULL,
    date_added        VARCHAR(50) NOT NULL,
    expiry_date        VARCHAR(50) NOT NULL,
    units            VARCHAR(10) NOT NULL,

    CONSTRAINT id 
        FOREIGN KEY (user_id) 
        references public.users(id)
);
---------TEST SAMPLES-------
INSERT INTO inventory(user_id, description, amount, date_added, expiry_date, units) 
    values (1,'Banana',4,'5/17/2023','5/28/2023', 'each');
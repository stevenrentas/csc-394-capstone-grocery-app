CREATE TABLE IF NOT EXISTS inventory
(
	id 	BIGSERIAL NOT NULL,
	product_id 		INTEGER NOT NULL,
	category 		VARCHAR(50) NOT NULL,
	description		VARCHAR(50) NOT NULL,
	quantity		INTEGER NOT NULL,
	units			VARCHAR(10) NOT NULL,

	CONSTRAINT INVENTORY_PKEY PRIMARY KEY (description),

	CONSTRAINT id FOREIGN KEY (id) references public.users(id)
);
---------TEST SAMPLES-------
INSERT INTO inventory(id,product_id,category,description,quantity,units) 
	values (0, 1,'Fruit','Bannana',4,'units');

INSERT INTO inventory(id,product_id, category, description, quantity, units)
	VALUES (0, 2, 'Vegetable', 'Carrot', 4, 'units');
	
INSERT INTO inventory(id,product_id, category, description, quantity, units)
	VALUES (0, 3,'Fruit','Pear',3,'units');


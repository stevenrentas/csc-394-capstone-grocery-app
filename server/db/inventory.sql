--Shows the inventory of all users
CREATE TABLE IF NOT EXISTS inventory
(
	id 	INTEGER NOT NULL,
	product_id 		BIGSERIAL NOT NULL,
	category 		VARCHAR(50) NOT NULL,
	description		VARCHAR(50) NOT NULL,
	quantity		INTEGER NOT NULL,
	units			VARCHAR(10) NOT NULL,

	CONSTRAINT INVENTORY_PKEY 
		PRIMARY KEY (product_id),

	CONSTRAINT id 
		FOREIGN KEY (id) 
		references public.users(id)
);
---------TEST SAMPLES-------
INSERT INTO inventory(id, category,description,quantity,units) 
	values (1,'Fruit','Bannana',4,'units');

INSERT INTO inventory(id, category, description, quantity, units)
	VALUES (1,'Fruit', 'Strawberry', 4, 'cup');
	
INSERT INTO inventory(id, category, description, quantity, units)
	VALUES (1,'Dairy','Milk',1,'gallon');

INSERT INTO inventory(id, category,description,quantity,units) 
	values (2,'Fruit','Bannana',4,'units');

INSERT INTO inventory(id, category, description, quantity, units)
	VALUES (2,'Vegetable', 'Carrot', 4, 'units');
	
INSERT INTO inventory(id, category, description, quantity, units)
	VALUES (2,'Fruit','Pear',3,'units');

INSERT INTO inventory(id, category,description,quantity,units) 
	values (3,'Grain','White Rice',2,'cup');

INSERT INTO inventory(id, category, description, quantity, units)
	VALUES (3,'Poultry', 'Chicken Breast', 1, 'lb');
	
INSERT INTO inventory(id, category, description, quantity, units)
	VALUES (3,'Vegetable','Peas',1,'cup');

--To Show only user 3 inventory:
--SELECT * FROM inventory
--	WHERE id = 3

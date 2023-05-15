--this is were the ChatGPT dishes can be stored
CREATE TABLE IF NOT EXISTS dish
(
	description VARCHAR(50) NOT NULL,
	ing_list 	TEXT NOT NULL,	
	instruction TEXT NOT NULL,
	
	CONSTRAINT dish_desc_pkey
		PRIMARY KEY (description)

);
-------TEST SAMPLES-------
INSERT INTO dish(description, ing_list,instruction)
	values('Chicken Pot Pie','some list of ingredients here','step 1,step 2...');

INSERT INTO dish(description, ing_list,instruction)
	values('Chicken and Rice','some list of ingredients here','step 1,step 2...');

INSERT INTO dish(description, ing_list,instruction)
	values('Strawberry and Bannana Smoothie','some list of ingredients here','step 1,step 2...');

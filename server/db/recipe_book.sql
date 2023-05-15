--table that shows possible recipes that the user can create. 
--So if we create a page that the user can see a list of possible recipes
--to choose from, this info is shown.

CREATE TABLE IF NOT EXISTS recipe_book
(
	description VARCHAR(50) NOT NULL UNIQUE,
	calories 	INTEGER NOT NULL,
	is_saved	BOOLEAN,

	
	CONSTRAINT recipe_book_description_fkey 
		FOREIGN KEY (description) 
		REFERENCES public.dish(description),

);
-------TEST SAMPLES-------
INSERT INTO recipe_book(description, calories, is_saved)
	VALUES('Chicken Pot Pie', 450, true );

INSERT INTO recipe_book(description, calories, is_saved)
	values('Chicken and Rice', 500, true);

INSERT INTO recipe_book(description, calories, is_saved)
	values('Strawberry and Bannana Smoothie', 375, true);

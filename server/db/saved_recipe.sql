CREATE TABLE IF NOT EXISTS saved_recipe
(
	id			BIGSERIAL NOT NULL,
	description	VARCHAR(50) NOT NULL,

	CONSTRAINT saved_recipe_description_fkey 
		FOREIGN KEY (description) 
		REFERENCES public.recipe_book(description),

	CONSTRAINT saved_recipe_id_fkey 
		FOREIGN KEY (id) 
		REFERENCES public.users(id) 
);

------TEST SAMPLES-----
INSERT INTO saved_recipe(id, description) 
	VALUES (3,'Chicken and Rice');

INSERT INTO saved_recipe(id, description) 
	VALUES (1,'Strawberry and Bannana Smoothie');

INSERT INTO saved_recipe(id, description) 
	VALUES (3,'Chicken Pot Pie');
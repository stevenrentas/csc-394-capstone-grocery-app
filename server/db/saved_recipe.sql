CREATE TABLE IF NOT EXISTS saved_recipe
(
	id			BIGSERIAL NOT NULL,
	meal_id		INTEGER NOT NULL,
	description	VARCHAR(50) NOT NULL,

	CONSTRAINT saved_recipe_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES public.recipe_book(meal_id),
	CONSTRAINT saved_recipe_id_fkey FOREIGN KEY (id) REFERENCES public.users(id) 
);

------TEST SAMPLES-----
INSERT INTO saved_recipe(id,meal_id, description) VALUES (0,1,'Chicken and Rice');
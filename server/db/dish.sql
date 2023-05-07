CREATE TABLE IF NOT EXISTS dish
(
	meal_id		INTEGER NOT NULL,
	ing_list 	VARCHAR(100) NOT NULL,
	instruction VARCHAR(100) NOT NULL,

	CONSTRAINT dish_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES public.recipe_book(meal_id)
	
);
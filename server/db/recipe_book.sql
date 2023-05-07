--table that shows possible recipes that the user can create.

CREATE TABLE IF NOT EXISTS recipe_book
(
	description VARCHAR(50) NOT NULL,
	meal_id 	INTEGER NOT NULL,
	image_link	VARCHAR(100),
	calories 	INTEGER NOT NULL,
	is_saved	BOOLEAN,

	CONSTRAINT recipe_book_description_fkey FOREIGN KEY (description) REFERENCES public.inventory(description),
	CONSTRAINT meal_id_pkey PRIMARY KEY (meal_id)
);


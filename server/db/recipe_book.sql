CREATE TABLE IF NOT EXISTS recipe_book (
    id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    ingredients JSONB NOT NULL,
    instructions JSONB NOT NULL,
	date_added VARCHAR(50) NOT NULL,
	missing_ingredients TEXT[]
);

INSERT INTO recipe_book (user_id, title, ingredients, instructions, date_added, missing_ingredients)
VALUES (
	1,
    'Asian Chicken Stir-Fry',
    '[
        {"amount": 1, "denomination": "lb", "name": "Chicken Brest", "preparation": "Sliced"},
        {"amount": 2, "denomination": "", "name": "Carrots", "preparation": "Sliced"},
        {"amount": 2, "denomination": "", "name": "Broccoli Rabe", "preparation": "Chopped"},
        {"amount": 1, "denomination": "lb", "name": "Beef", "preparation": "Sliced"}
    ]',
    '[
        "Heat oil in a large pan or wok over medium-high heat.",
        "Add the sliced chicken breast and beef to the pan and stir-fry until cooked through.",
        "Remove the chicken breast and beef from the pan and set aside.",
        "In the same pan, add the sliced carrots and chopped broccoli rabe. Stir-fry for a few minutes until slightly tender.",
        "Return the chicken breast and beef to the pan and stir to combine with the vegetables.",
        "Add your favorite Asian sauce and stir to coat the ingredients.",
        "Cook for an additional 1-2 minutes, until everything is heated through.",
        "Serve the Asian chicken stir-fry hot with steamed rice or noodles."
    ]',
	'5/23/2023',
	array['Broccoli Rabe', 'Beef']
);
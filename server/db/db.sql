CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >=1 and price_range <=5)
);

INSERT INTO restaurants (name, location, price_range) values ('wendys', 'miami', 5);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restauraunt_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating >=1 and rating <=5)
);

INSERT INTO reviews (restauraunt_id, name, review, rating) values (1, 'carl', 'restauraunt was awesome', 5);
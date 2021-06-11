CREATE DATABASE api;

CREATE TABLE books (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(200),
    isbn VARCHAR(17),
    author VARCHAR(200)
);

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    password VARCHAR(200) NOT NULL,
    UNIQUE (email)
);

CREATE TABLE borrowed_books (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    book_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    date_of_rental DATE NOT NULL DEFAULT CURRENT_DATE,
    date_of_return DATE DEFAULT NULL,
    -- date_of_return DATE NOT NULL DEFAULT CURRENT_DATE  + interval '1 week',
    returned BOOLEAN DEFAULT FALSE
);
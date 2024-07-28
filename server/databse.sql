CREATE DATABASE pertodo;

CREATE TABLE user_info(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_info(id) ON DELETE CASCADE, 
    description VARCHAR(200) NOT NULL
);

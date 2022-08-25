-- USERS
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(250) NOT NULL UNIQUE,
    password_digest VARCHAR(500) NOT NULL,
    email VARCHAR(100)NOT NULL UNIQUE
);



-- ENTRIES 
DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
    id serial PRIMARY KEY,
    user_id INT NOT NULL,
    sleep_entry BOOLEAN,
    exercise_entry BOOLEAN, 
    water_entry INT,
    smoking_entry INT,
    money_entry INT,
    date_entry DATE DEFAULT NOW()
);



--TRACKING
DROP TABLE IF EXISTS tracking;

CREATE TABLE tracking (
    id serial PRIMARY KEY,
    user_id INT NOT NULL,
    sleep_track BOOLEAN,
    sleep_goal INT,
    exercise_track BOOLEAN,
    exercise_goal INT,
    exercise_freq VARCHAR(30),
    water_track BOOLEAN,
    water_goal INT,
    smoking_track BOOLEAN,
    smoking_goal INT,
    money_track BOOLEAN,
    money_goal INT,
    money_begin_date date,
    money_end_date date
);
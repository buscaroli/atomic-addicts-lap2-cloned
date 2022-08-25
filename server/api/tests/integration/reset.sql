TRUNCATE users, entries, tracking RESTART IDENTITY;

-- USERS
INSERT INTO users (id, username, password_digest, email) 
VALUES
    (1, 'tinab123', '$2a$10$sosndSuA2qyqsvbV.BwjxucwERZSZsSbJtzmcHg2vJ8LR7o6xpK2e', 'tinab123@gmail.com'),
    (2, 'leo123', 'xxxxx', 'leo12@gmail.com'),
    (3, 'pati123', 'xxxxx', 'pati123@gmail.com'),
    (4, 'igormirowski', 'xxxxx', 'igor@gmail.com');


-- ENTRIES

INSERT INTO entries  (user_id, sleep_entry, exercise_entry, water_entry, smoking_entry, money_entry, date_entry) 
VALUES
    (1, true, true, 8, 8, 1, '2022-06-06'),
    (2, false, true, 5, 8, 3, '2022-06-07'),
    (3, false, false, 6, 21, 5, '2022-06-08'),
    (1, true, false, 9, 8, 1, '2022-06-09'),
    (1, false, true, 8, 13, 1, '2022-06-10'),
    (1, true, true, 8, 8, 1, '2022-06-11'),
    (1, false, true, 4, 11, 3, '2022-06-12'),
    (1, true, false, 9, 8, 1, '2022-06-13'),
    (1, false, true, 6, 13, 3, '2022-06-14'),
    (1, true, true, 7, 8, 1, '2022-06-15'),
    (1, true, true, 6, 8, 1, '2022-06-16'),
    (1, true, false, 8, 13, 3, '2022-06-17'),
    (1, true, true, 8, 8, 1, '2022-06-18'),
    (1, true, true, 8, 8, 1, '2022-06-19'),
    (1, true, false, 9, 8, 3, '2022-06-20'),
    (1, true, true, 8, 8, 2, '2022-06-21'),
    (1, true, true, 6, 13, 1, '2022-06-22'),
    (1, true, true, 8, 8, 3, '2022-06-23'),
    (1, true, false, 8, 11, 1, '2022-06-24'),
    (1, false, true, 4, 8, 1, '2022-06-25'),
    (1, true, true, 8, 8, 3, '2022-06-26'),
    (1, true, false, 9, 13, 2, '2022-06-27'),
    (1, false, true, 8, 6, 1, '2022-06-28'),
    (1, true, true, 10, 11, 1, '2022-06-29'),
    (1, true, false, 8, 8, 1, '2022-06-30'),
    (1, false, false, 8, 6, 3, '2022-07-01'),
    (1, true, false, 4, 7, 1, '2022-07-02'),
    (1, true, true, 3, 5, 1, '2022-07-03'),
    (1, true, true, 8, 8, 1, '2022-07-04'),
    (1, true, false, 8, 6, 0, '2022-07-05'),
    (1, true, true, 2, 10, 1, '2022-07-06'),
    (1, true, true, 6, 8, 1, '2022-07-07'),
    (1, true, true, 8, 8, 1, '2022-07-08');
    


-- TRACKING

INSERT INTO tracking  ( user_id, sleep_track, sleep_goal, exercise_track, exercise_goal, exercise_freq, water_track, water_goal, smoking_track, smoking_goal, money_track, money_goal, money_begin_date, money_end_date) 
VALUES
    (1, true, 8, true, 4, 'week', true, 6, true, 8, true, 4, '2022-06-06','2022-07-06'),
    (2, false, 7, true, 3, 'week',  true, 6, true, 8, true, 4, '2022-06-06','2022-07-06'),
    (3, false, 6, false, 2, 'day', true, 6, false, 1, false, 4, '2022-06-06','2022-07-06');
-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS ecowarriors;
CREATE DATABASE ecowarriors;
USE ecowarriors;

CREATE TABLE `users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) DEFAULT NULL,
  `email` VARCHAR(45) DEFAULT NULL,
  `password` VARCHAR(200) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `user_stats`(
  `stats_id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `user_score` INT(11) DEFAULT NULL,
  `user_level` INT NOT NULL,
  `profile_img` VARCHAR(450) DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `admin` (
  `admin_id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) DEFAULT NULL UNIQUE,
  `email` VARCHAR(45) DEFAULT NULL UNIQUE,
  `password` VARCHAR(200) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `event_organizer` (
  `organizer_id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) DEFAULT NULL UNIQUE,
  `email` VARCHAR(45) DEFAULT NULL UNIQUE,
  `password` VARCHAR(200) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `posts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_title` VARCHAR(100) DEFAULT NULL,
  `post_description` VARCHAR(2000) DEFAULT NULL,
  `likes` INT(11) DEFAULT NULL,
  `username` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_id_UNIQUE` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


CREATE TABLE `post_images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(45) DEFAULT NULL,
  `post_id` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


CREATE TABLE `comments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) DEFAULT NULL,
  `comment` VARCHAR(1500) DEFAULT NULL,
  `post_id` INT(11) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id_UNIQUE` (`id`),
  FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


-- Create tags later
-- CREATE TABLE `tags` ()

CREATE TABLE `top10` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `position` INT(11) DEFAULT NULL,
  `user_id` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Added TASKS

CREATE TABLE `tasks`(
  `task_id` INT(11) NOT NULL AUTO_INCREMENT,
  `task_title` VARCHAR(100) NOT NULL,
  `task_description` VARCHAR(1000) NOT NULL,
  `completed` BOOLEAN,
  `active` BOOLEAN,
  `points` INT(11) NOT NULL,
  `level` INT NOT NULL CHECK (level BETWEEN 1 AND 3),
  `user_id` INT(11) DEFAULT NULL,
  PRIMARY KEY(`task_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;



-- ENGINE means the data handeling engine. (Note, This is not important)
-- CHARSET means the the used set of charachters for table content
-- COLLATE determines the alphabetical order of table content

-- TESTS

INSERT INTO users (user_id, username, email, password) 
  VALUES 
  (1, 'testi', 'testi@example.com', 'testi'),
  (2, 'oppilas', 'o@example.com', 'salasana123');

-- Test User with task

INSERT INTO tasks (task_title, task_description, completed, active, points, level, user_id) 
VALUES 
  ('Kerää roskia', 'Kerää roskia puistosta ja lajittele asianmukaisesti', FALSE, TRUE, 50, 1, 1),
  ('Säästä sähköä tunnin ajan', 'Laita sähkölaitteet kiinni tunniksi', FALSE, FALSE, 50, 2, 2);

SELECT 
users.username,
tasks.task_title,
tasks.task_description,
tasks.active,
tasks.level,
tasks.points,
tasks.completed
FROM tasks
JOIN users ON users.user_id = tasks.user_id;
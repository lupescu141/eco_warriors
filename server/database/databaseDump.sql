-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS ecowarriors;
CREATE DATABASE ecowarriors;
USE ecowarriors;

CREATE TABLE `users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
  `username` VARCHAR(45) DEFAULT NULL UNIQUE,
  `email` VARCHAR(45) DEFAULT NULL UNIQUE,
  `password` VARCHAR(200) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  `post_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `post_title` VARCHAR(100) DEFAULT NULL,
  `post_description` VARCHAR(2000) DEFAULT NULL,
  `likes` INT(11) DEFAULT NULL,
  `filename` VARCHAR(255) DEFAULT NULL,
  `filetype` VARCHAR(45) DEFAULT NULL,
  `filesize` INT(11) DEFAULT NULL,
  `thumbnail` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- was not a good solution
/* CREATE TABLE `post_media` (
  `file_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
  `post_id` INT(11) DEFAULT NULL,
  `filename` VARCHAR(255) DEFAULT NULL,
  `filetype` VARCHAR(45) DEFAULT NULL,
  `filesize` INT(11) DEFAULT NULL,
  `thumbnail` VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci; */


CREATE TABLE `comments` (
  `comment_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT(11) DEFAULT NULL UNIQUE,
  `comment` VARCHAR(1500) DEFAULT NULL,
  `post_id` INT(11) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `Likes` (
  `like_id` INT(11) NOT NULL PRIMARY KEY,
  `post_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `tags` (
  `tag_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `tag_name` VARCHAR(45)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `post_tags` (
  `post_id` INT(11) NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`post_id`, `tag_id`),
  FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `top10` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
  `position` INT(11) DEFAULT NULL,
  `user_id` INT(11) DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Added TASKS

CREATE TABLE `tasks`(
  `task_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `task_title` VARCHAR(100) NOT NULL,
  `task_description` VARCHAR(1000) NOT NULL,
  `points` INT(11) NOT NULL DEFAULT 0,
  `level` INT NOT NULL CHECK (level BETWEEN 1 AND 3)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- TASK w User liitäntätaulukko WIP

CREATE TABLE `user_task` (
  `task_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `completed` BOOLEAN,
  `active` BOOLEAN,
  PRIMARY KEY (user_id, task_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE
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

-- INSERT INTO tasks (task_title, task_description, completed, active, points, level, user_id) 
-- VALUES 
--   ('Kerää roskia', 'Kerää roskia puistosta ja lajittele asianmukaisesti', FALSE, TRUE, 50, 1, 1),
--   ('Säästä sähköä tunnin ajan', 'Laita sähkölaitteet kiinni tunniksi', FALSE, FALSE, 50, 2, 1);

INSERT INTO tasks (task_id, task_title, task_description, points, level) 
VALUES 
  (1, 'Siivoa puisto', 'Puhdista ja siisti lähialueen puisto.', 10, 2),
  (2, 'Lajittele roskat', 'Lajittele kierrätykseen menevät roskat oikein.', 5, 1),
  (3, 'Osallistua tapahtumaan', 'Osallistu ympäristötapahtumaan ja auta sen järjestämisessä.', 20, 3);

INSERT INTO user_task (user_id, task_id, completed, active)
VALUES 
  (1, 1, TRUE, TRUE),
  (1, 2, FALSE, TRUE),
  (2, 3, TRUE, TRUE),
  (2, 2, FALSE, TRUE);


INSERT INTO posts (user_id, post_title, post_description, filename)
VALUES
(1, 'Puisto siivottu', 'Kävin siivoamassa läheisen puiston kokonaan eilen illalla', 'Puisto.png'),
(1, 'Puisto siivottu', 'Kävin siivoamassa läheisen puiston kokonaan eilen illalla','tapahtuma kuva.png'),
(2, 'Täällä tapahtumass tänään', 'Tsekkasin tän päivän tapahtuman. Ihan hyvä ja rento meininki tääl','tapahtuma kuva.png');

INSERT INTO tags (tag_name)
VALUES
('Testi tag'),
('Siivoa puisto'),
('Osallistuminen tapahtumaan');

INSERT INTO post_tags (post_id, tag_id)
VALUES
(1,2),
(3,2),
(3,3);

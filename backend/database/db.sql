-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS EcoWarriorsDB;
CREATE DATABASE EcoWarriorsDB;
USE EcoWarriorsDB;

-- Create the tables

CREATE TABLE UserLevels (
    level_id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(50) NOT NULL
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_level_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(level_id)
);
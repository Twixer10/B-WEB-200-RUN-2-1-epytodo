CREATE USER `user`@`localhost` IDENTIFIED BY 'user';
GRANT ALL PRIVILEGES ON `user` .* TO `user`@`localhost`;
FLUSH PRIVILEGES;

DROP DATABASE IF EXISTS `epytodo`;

CREATE DATABASE IF NOT EXISTS `epytodo`;

USE `epytodo`;

DROP TABLE IF EXISTS user;

CREATE TABLE user (
    `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `firstname` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL
);

DROP DATABASE IF EXISTS `todo`;

CREATE TABLE `todo` (
    `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL UNIQUE,
    `description` varchar(500) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `due_time` TIMESTAMP NOT NULL,
    `user_id` INT UNSIGNED,
    `status` varchar(255) DEFAULT 'not started'
);
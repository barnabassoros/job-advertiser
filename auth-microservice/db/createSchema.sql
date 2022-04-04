CREATE DATABASE `auth`;

USE auth;

CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `githubId` VARCHAR(191) NOT NULL,
    `githubName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

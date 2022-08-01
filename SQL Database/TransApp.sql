CREATE DATABASE IF NOT EXISTS `transapp` /*!40100 COLLATE 'utf8mb4_general_ci' */;
USE `transapp`;
CREATE TABLE IF NOT EXISTS transactions (
	`ID` INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`title` VARCHAR(250) NOT NULL,
	`amount` VARCHAR(20) NOT NULL,
	`entryType` VARCHAR(3) NOT NULL,
	`date` VARCHAR(30) NOT NULL,	
	`displayed` VARCHAR (1) NOT NULL DEFAULT 'Y'
);
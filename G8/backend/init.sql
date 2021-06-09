DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hash` varchar(255) NOT NULL,
  `sarif_filename` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hash_UNIQUE` (`hash`)
)
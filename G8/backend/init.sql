DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(255) DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  `sarif_filename` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hash_UNIQUE` (`hash`)
)
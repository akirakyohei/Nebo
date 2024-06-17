/*
 Navicat Premium Data Transfer

 Source Server         : do_an
 Source Server Type    : MariaDB
 Source Server Version : 101107
 Source Host           : localhost:3306
 Source Schema         : reportdb

 Target Server Type    : MariaDB
 Target Server Version : 101107
 File Encoding         : 65001

 Date: 17/06/2024 15:02:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dim_datetimes
-- ----------------------------
DROP TABLE IF EXISTS `dim_datetimes`;
CREATE TABLE `dim_datetimes`  (
  `date_key` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` timestamp NULL DEFAULT NULL,
  `hour` int(11) NULL DEFAULT NULL,
  `day_of_month` int(11) NULL DEFAULT NULL,
  `day_of_week` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `day_of_year` int(11) NULL DEFAULT NULL,
  `first_hour_of_day` timestamp NULL DEFAULT NULL,
  `first_day_of_week` timestamp NULL DEFAULT NULL,
  `first_day_of_month` timestamp NULL DEFAULT NULL,
  `first_day_of_year` timestamp NULL DEFAULT NULL,
  `month_of_year` int(11) NULL DEFAULT NULL,
  `year` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`date_key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dim_datetimes
-- ----------------------------
INSERT INTO `dim_datetimes` VALUES (1, '2024-06-13 22:00:00', 5, 14, 'friday', 166, '2024-06-13 17:00:00', '2024-06-09 17:00:00', '2024-05-31 17:00:00', '2023-12-31 17:00:00', 6, 2024);
INSERT INTO `dim_datetimes` VALUES (2, '2024-06-14 06:00:00', 13, 14, 'friday', 166, '2024-06-13 17:00:00', '2024-06-09 17:00:00', '2024-05-31 17:00:00', '2023-12-31 17:00:00', 6, 2024);
INSERT INTO `dim_datetimes` VALUES (3, '2024-06-13 23:00:00', 6, 14, 'friday', 166, '2024-06-13 17:00:00', '2024-06-09 17:00:00', '2024-05-31 17:00:00', '2023-12-31 17:00:00', 6, 2024);
INSERT INTO `dim_datetimes` VALUES (4, '2024-06-14 00:00:00', 7, 14, 'friday', 166, '2024-06-13 17:00:00', '2024-06-09 17:00:00', '2024-05-31 17:00:00', '2023-12-31 17:00:00', 6, 2024);
INSERT INTO `dim_datetimes` VALUES (5, '2024-06-14 07:00:00', 14, 14, 'friday', 166, '2024-06-13 17:00:00', '2024-06-09 17:00:00', '2024-05-31 17:00:00', '2023-12-31 17:00:00', 6, 2024);
INSERT INTO `dim_datetimes` VALUES (6, '2024-06-14 01:00:00', 8, 14, 'friday', 166, '2024-06-13 17:00:00', '2024-06-09 17:00:00', '2024-05-31 17:00:00', '2023-12-31 17:00:00', 6, 2024);

-- ----------------------------
-- Table structure for dim_paper_types
-- ----------------------------
DROP TABLE IF EXISTS `dim_paper_types`;
CREATE TABLE `dim_paper_types`  (
  `paper_type_key` int(11) NOT NULL,
  `paper_type_id` int(11) NOT NULL,
  `name` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `width` int(11) NULL DEFAULT NULL,
  `unit_of_width` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `height` int(11) NULL DEFAULT NULL,
  `unit_of_height` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`paper_type_key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dim_paper_types
-- ----------------------------
INSERT INTO `dim_paper_types` VALUES (0, 0, 'Tùy chỉnh', NULL, NULL, NULL, NULL, 'Tùy chỉnh chiều rộng chiều cao');
INSERT INTO `dim_paper_types` VALUES (1, 1, 'A3 (297mm x 420mm)', 297, 'mm', 420, 'mm', NULL);
INSERT INTO `dim_paper_types` VALUES (2, 2, 'A4 (210mm x 297mm)', 210, 'mm', 297, 'mm', NULL);
INSERT INTO `dim_paper_types` VALUES (3, 3, 'A5 (148mm x 210mm)', 148, 'mm', 210, 'mm', NULL);
INSERT INTO `dim_paper_types` VALUES (4, 4, 'A6 (105mm x 148mm)', 105, 'mm', 148, 'mm', NULL);
INSERT INTO `dim_paper_types` VALUES (5, 5, 'Thư (8.5in x 11in)', 9, 'in', 11, 'in', NULL);

-- ----------------------------
-- Table structure for dim_templates
-- ----------------------------
DROP TABLE IF EXISTS `dim_templates`;
CREATE TABLE `dim_templates`  (
  `template_key` bigint(20) NOT NULL AUTO_INCREMENT,
  `template_id` bigint(20) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `user_key` bigint(20) NULL DEFAULT NULL,
  `paper_type_key` int(11) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`template_key`) USING BTREE,
  INDEX `user_key`(`user_key`) USING BTREE,
  INDEX `paper_type_key`(`paper_type_key`) USING BTREE,
  CONSTRAINT `dim_templates_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `dim_users` (`user_key`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `dim_templates_ibfk_2` FOREIGN KEY (`paper_type_key`) REFERENCES `dim_paper_types` (`paper_type_key`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `dim_templates_ibfk_3` FOREIGN KEY (`paper_type_key`) REFERENCES `dim_paper_types` (`paper_type_key`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4207 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dim_templates
-- ----------------------------
INSERT INTO `dim_templates` VALUES (4193, 16, 'Mẫu mặc địnhguygvjh', 1, 1, NULL, '2024-06-14 01:09:45');
INSERT INTO `dim_templates` VALUES (4194, 41, 'Mẫu mặc định', 1, 2, '2024-06-14 06:47:55', '2024-06-14 06:47:55');
INSERT INTO `dim_templates` VALUES (4195, 18, 'Mẫu mặc định', 1, 2, NULL, '2024-06-14 01:24:53');
INSERT INTO `dim_templates` VALUES (4196, 42, 'Mẫu mặc định', 1, 2, '2024-06-14 07:21:33', '2024-06-14 07:21:33');
INSERT INTO `dim_templates` VALUES (4197, 21, NULL, 1, 0, NULL, NULL);
INSERT INTO `dim_templates` VALUES (4198, 27, NULL, 1, 0, NULL, NULL);
INSERT INTO `dim_templates` VALUES (4199, 20, NULL, 1, 0, NULL, NULL);
INSERT INTO `dim_templates` VALUES (4200, 19, NULL, 1, 0, NULL, NULL);
INSERT INTO `dim_templates` VALUES (4201, 43, 'Mẫu mặc định', 1, 2, '2024-06-14 07:55:38', '2024-06-14 07:55:38');
INSERT INTO `dim_templates` VALUES (4202, 44, 'Mẫu mặc định', 1, 2, '2024-06-14 07:57:58', '2024-06-14 07:57:58');
INSERT INTO `dim_templates` VALUES (4203, 45, 'Mẫu mặc định', 1, 2, '2024-06-14 07:58:52', '2024-06-14 07:58:52');
INSERT INTO `dim_templates` VALUES (4204, 46, 'Mẫu mặc định', 1, 2, '2024-06-14 07:59:50', '2024-06-14 07:59:50');
INSERT INTO `dim_templates` VALUES (4205, 47, 'Mẫu mặc định', 1, 1, '2024-06-14 01:05:17', '2024-06-14 01:05:17');
INSERT INTO `dim_templates` VALUES (4206, 23, 'Mẫu mặc địnhdfgdfg', 1, 2, NULL, '2024-06-14 01:13:33');

-- ----------------------------
-- Table structure for dim_users
-- ----------------------------
DROP TABLE IF EXISTS `dim_users`;
CREATE TABLE `dim_users`  (
  `user_key` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `image_url` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dim_users
-- ----------------------------
INSERT INTO `dim_users` VALUES (1, 11, 'djskjbnffdfdf', 'dsdsfdf', NULL);
INSERT INTO `dim_users` VALUES (2, 16, 'fdfd', 'dfdf', NULL);
INSERT INTO `dim_users` VALUES (3, 14, 'fds', NULL, NULL);

-- ----------------------------
-- Table structure for fact_aggregates
-- ----------------------------
DROP TABLE IF EXISTS `fact_aggregates`;
CREATE TABLE `fact_aggregates`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_key` bigint(20) NOT NULL,
  `total_data` bigint(20) NOT NULL,
  `total_template` bigint(20) NOT NULL,
  `total_used_template` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_key`(`user_key`) USING BTREE,
  CONSTRAINT `fact_aggregates_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `dim_users` (`user_key`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fact_aggregates
-- ----------------------------
INSERT INTO `fact_aggregates` VALUES (1, 2, 0, 0, 0);
INSERT INTO `fact_aggregates` VALUES (2, 1, 157323, 2, 1);

-- ----------------------------
-- Table structure for fact_sessions
-- ----------------------------
DROP TABLE IF EXISTS `fact_sessions`;
CREATE TABLE `fact_sessions`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_key` bigint(20) NOT NULL,
  `ip_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_agent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_key`(`user_key`) USING BTREE,
  CONSTRAINT `fact_sessions_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `dim_users` (`user_key`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fact_sessions
-- ----------------------------
INSERT INTO `fact_sessions` VALUES (1, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', '2024-06-06 15:25:00');
INSERT INTO `fact_sessions` VALUES (2, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', '2024-06-06 17:14:20');
INSERT INTO `fact_sessions` VALUES (3, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', '2024-06-06 17:16:01');
INSERT INTO `fact_sessions` VALUES (4, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', '2024-06-06 18:06:58');
INSERT INTO `fact_sessions` VALUES (5, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', '2024-06-06 18:07:54');
INSERT INTO `fact_sessions` VALUES (6, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', '2024-06-08 03:50:16');
INSERT INTO `fact_sessions` VALUES (7, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', '2024-06-10 08:45:43');
INSERT INTO `fact_sessions` VALUES (8, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', '2024-06-10 20:34:07');
INSERT INTO `fact_sessions` VALUES (9, 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', '2024-06-10 20:35:42');
INSERT INTO `fact_sessions` VALUES (10, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', '2024-06-12 02:56:42');
INSERT INTO `fact_sessions` VALUES (11, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', '2024-06-13 04:27:54');
INSERT INTO `fact_sessions` VALUES (12, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-14 09:48:06');
INSERT INTO `fact_sessions` VALUES (13, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-14 14:12:25');
INSERT INTO `fact_sessions` VALUES (14, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-14 15:09:32');
INSERT INTO `fact_sessions` VALUES (15, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-14 15:21:11');
INSERT INTO `fact_sessions` VALUES (16, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-14 15:40:53');
INSERT INTO `fact_sessions` VALUES (17, 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-14 15:42:52');

-- ----------------------------
-- Table structure for fact_used_paper_types
-- ----------------------------
DROP TABLE IF EXISTS `fact_used_paper_types`;
CREATE TABLE `fact_used_paper_types`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_key` bigint(20) NOT NULL,
  `paper_type_key` int(11) NULL DEFAULT NULL,
  `date_key` bigint(20) NULL DEFAULT NULL,
  `total_used` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_key`(`user_key`) USING BTREE,
  INDEX `paper_type_key`(`paper_type_key`) USING BTREE,
  INDEX `date_key`(`date_key`) USING BTREE,
  CONSTRAINT `fact_used_paper_types_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `dim_users` (`user_key`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fact_used_paper_types_ibfk_2` FOREIGN KEY (`paper_type_key`) REFERENCES `dim_paper_types` (`paper_type_key`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fact_used_paper_types_ibfk_3` FOREIGN KEY (`date_key`) REFERENCES `dim_datetimes` (`date_key`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fact_used_paper_types
-- ----------------------------
INSERT INTO `fact_used_paper_types` VALUES (1, 1, 2, 2, 1);
INSERT INTO `fact_used_paper_types` VALUES (2, 1, 2, 5, 5);
INSERT INTO `fact_used_paper_types` VALUES (3, 1, 1, 6, 1);

-- ----------------------------
-- Table structure for fact_used_templates
-- ----------------------------
DROP TABLE IF EXISTS `fact_used_templates`;
CREATE TABLE `fact_used_templates`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_key` bigint(20) NOT NULL,
  `template_key` bigint(20) NULL DEFAULT NULL,
  `date_key` bigint(20) NULL DEFAULT NULL,
  `total_used` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_key`(`user_key`) USING BTREE,
  INDEX `template_key`(`template_key`) USING BTREE,
  INDEX `date_key`(`date_key`) USING BTREE,
  CONSTRAINT `fact_used_templates_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `dim_users` (`user_key`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fact_used_templates_ibfk_2` FOREIGN KEY (`template_key`) REFERENCES `dim_templates` (`template_key`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fact_used_templates_ibfk_3` FOREIGN KEY (`date_key`) REFERENCES `dim_datetimes` (`date_key`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fact_used_templates
-- ----------------------------
INSERT INTO `fact_used_templates` VALUES (1, 1, 4193, 1, 2);
INSERT INTO `fact_used_templates` VALUES (2, 1, 4193, 3, 2);
INSERT INTO `fact_used_templates` VALUES (3, 1, 4193, 4, 4);

SET FOREIGN_KEY_CHECKS = 1;

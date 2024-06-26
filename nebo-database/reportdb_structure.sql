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
 
 Date: 26/06/2024 22:43:40
 */
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for dim_datetimes
-- ----------------------------
DROP TABLE IF EXISTS `dim_datetimes`;
CREATE TABLE `dim_datetimes` (
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
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for dim_paper_types
-- ----------------------------
DROP TABLE IF EXISTS `dim_paper_types`;
CREATE TABLE `dim_paper_types` (
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
-- Table structure for dim_templates
-- ----------------------------
DROP TABLE IF EXISTS `dim_templates`;
CREATE TABLE `dim_templates` (
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
) ENGINE = InnoDB AUTO_INCREMENT = 4242 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for dim_users
-- ----------------------------
DROP TABLE IF EXISTS `dim_users`;
CREATE TABLE `dim_users` (
  `user_key` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `image_url` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for fact_aggregates
-- ----------------------------
DROP TABLE IF EXISTS `fact_aggregates`;
CREATE TABLE `fact_aggregates` (
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
-- Table structure for fact_sessions
-- ----------------------------
DROP TABLE IF EXISTS `fact_sessions`;
CREATE TABLE `fact_sessions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_key` bigint(20) NOT NULL,
  `ip_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_agent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_key`(`user_key`) USING BTREE,
  CONSTRAINT `fact_sessions_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `dim_users` (`user_key`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for fact_used_paper_types
-- ----------------------------
DROP TABLE IF EXISTS `fact_used_paper_types`;
CREATE TABLE `fact_used_paper_types` (
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
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for fact_used_templates
-- ----------------------------
DROP TABLE IF EXISTS `fact_used_templates`;
CREATE TABLE `fact_used_templates` (
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
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
SET FOREIGN_KEY_CHECKS = 1;
INSERT INTO `dim_paper_types`
VALUES (
    0,
    0,
    'Tùy chỉnh',
    NULL,
    NULL,
    NULL,
    NULL,
    'Tùy chỉnh chiều rộng chiều cao'
  );
INSERT INTO `dim_paper_types`
VALUES (
    1,
    1,
    'A3 (297mm x 420mm)',
    297,
    'mm',
    420,
    'mm',
    NULL
  );
INSERT INTO `dim_paper_types`
VALUES (
    2,
    2,
    'A4 (210mm x 297mm)',
    210,
    'mm',
    297,
    'mm',
    NULL
  );
INSERT INTO `dim_paper_types`
VALUES (
    3,
    3,
    'A5 (148mm x 210mm)',
    148,
    'mm',
    210,
    'mm',
    NULL
  );
INSERT INTO `dim_paper_types`
VALUES (
    4,
    4,
    'A6 (105mm x 148mm)',
    105,
    'mm',
    148,
    'mm',
    NULL
  );
INSERT INTO `dim_paper_types`
VALUES (
    5,
    5,
    'Thư (8.5in x 11in)',
    9,
    'in',
    11,
    'in',
    NULL
  );
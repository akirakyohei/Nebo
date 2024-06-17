/*
 Navicat Premium Data Transfer

 Source Server         : do_an
 Source Server Type    : MariaDB
 Source Server Version : 101107
 Source Host           : localhost:3306
 Source Schema         : tenantdb

 Target Server Type    : MariaDB
 Target Server Version : 101107
 File Encoding         : 65001

 Date: 17/06/2024 15:02:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for app_clients
-- ----------------------------
DROP TABLE IF EXISTS `app_clients`;
CREATE TABLE `app_clients`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `prefix` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `access_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `scopes` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` tinyint(1) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of app_clients
-- ----------------------------
INSERT INTO `app_clients` VALUES (1, 11, 'uygu', '87c146', '87c14669-749a-4524-bf7e-d6e88e361f28', NULL, 1, '2024-05-29 19:33:15', '2024-05-29 19:33:15');
INSERT INTO `app_clients` VALUES (2, 11, 'fdf', '115173', '11517368-4e42-4545-a4e0-c1c1b575efcc', NULL, 1, '2024-05-29 19:33:48', '2024-05-29 19:33:48');
INSERT INTO `app_clients` VALUES (3, 11, 'fdgfdg', 'dd97d1', 'dd97d1d6-c0e9-442a-8678-f9c21783836c', NULL, 1, '2024-05-29 19:41:24', '2024-05-29 19:41:24');
INSERT INTO `app_clients` VALUES (4, 11, 'fdgfdg', '70d31e', '70d31e19-8056-4b15-99b0-ae0300068dab', NULL, 1, '2024-05-29 19:41:26', '2024-05-29 19:41:26');
INSERT INTO `app_clients` VALUES (5, 11, 'gfg', '318adb', '318adb54-fe12-4ead-8791-5712b56855de', NULL, 1, '2024-05-29 19:41:27', '2024-05-29 19:41:27');
INSERT INTO `app_clients` VALUES (6, 11, 'gcvcv', '6b27bf', '6b27bfd6-3709-4934-9d36-d33a150fb561', NULL, 1, '2024-05-29 19:41:28', '2024-05-29 19:41:28');
INSERT INTO `app_clients` VALUES (7, 11, 'gfggfgfgt', '2a0175', '2a0175db-545a-4821-bd80-1d1ef88d93c8', NULL, 1, '2024-05-29 19:41:28', '2024-05-29 19:46:05');
INSERT INTO `app_clients` VALUES (8, 11, 'fdfd', '31ba23', '31ba23f0-816a-49eb-bda8-fb409391aecc', NULL, 1, '2024-05-29 19:41:28', '2024-05-29 19:41:28');
INSERT INTO `app_clients` VALUES (9, 11, 'fdfdsdsd', 'e0f827', 'e0f827da-24a4-44ed-8d54-943e7af92da0', NULL, 1, '2024-06-06 18:08:43', '2024-06-06 18:08:53');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `expired_date` timestamp NULL DEFAULT NULL,
  `token` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ip_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_agent` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_refresh_tokens_users`(`user_id`) USING BTREE,
  CONSTRAINT `FK_refresh_tokens_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 153 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES (133, 11, '482d1d48-c46e-4b60-9f97-1c0f2a7dbe4b', '2024-06-15 09:48:06', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkanNramJuZmZkZmRmIGRzZHNmZGYiLCJpYXQiOjE3MTgzNjc2NTIsImV4cCI6MTcxODQ1NDA1MiwiaWQiOjExLCJmaXJzdE5hbWUiOiJkanNramJuZmZkZmRmIiwibGFzdE5hbWUiOiJkc2RzZmRmIiwicGVybWlzc2lvbnMiOiIifQ.LcxLHwlbpsJa5RC1kN7ytIJPG-liodnmhJIS2Q6kjVim0ZUp0_KYO3jjuz1-qk0K5RhyBGDwmJPgQquTqlKNsg', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-14 09:48:06');
INSERT INTO `sessions` VALUES (134, 11, '8432f065-8625-4685-83c3-7f6f0f512038', '2024-06-15 14:12:25', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkanNramJuZmZkZmRmIGRzZHNmZGYiLCJpYXQiOjE3MTgzNzcyNDAsImV4cCI6MTcxODQ2MzY0MCwiaWQiOjExLCJmaXJzdE5hbWUiOiJkanNramJuZmZkZmRmIiwibGFzdE5hbWUiOiJkc2RzZmRmIiwicGVybWlzc2lvbnMiOiIifQ.0El6rUbKesbXwrLWGhtV4KEaDcMSHrqB7Po8jd4dq3PBXMC3Rx1NOtR5_Hn9y09ZOp8c9l604CTB1Yff_yyOdA', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-14 14:12:25');
INSERT INTO `sessions` VALUES (135, 11, '24ed3a09-0fb6-483a-bdf9-fe7203c31b57', '2024-06-15 15:09:32', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkanNramJuZmZkZmRmIGRzZHNmZGYiLCJpYXQiOjE3MTgzNzg0NDgsImV4cCI6MTcxODQ2NDg0OCwiaWQiOjExLCJmaXJzdE5hbWUiOiJkanNramJuZmZkZmRmIiwibGFzdE5hbWUiOiJkc2RzZmRmIiwicGVybWlzc2lvbnMiOiIifQ.RwHowhcq0Gw3Aa96YmkHQOTw-k4I74nAcfq6nNHXLhJ95ZEU9D5Awj4rLJxdl_RBfSnCPbec2vt_XE4zqnOxsA', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-14 15:09:32');
INSERT INTO `sessions` VALUES (140, 11, 'bc87f713-d36d-433e-9617-2849f3365de2', '2024-06-15 15:58:36', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkanNramJuZmZkZmRmIGRzZHNmZGYiLCJpYXQiOjE3MTgzODA3MTUsImV4cCI6MTcxODQ2NzExNSwiaWQiOjExLCJmaXJzdE5hbWUiOiJkanNramJuZmZkZmRmIiwibGFzdE5hbWUiOiJkc2RzZmRmIiwicGVybWlzc2lvbnMiOiIifQ.LoUyF-q8msO7TrRe82ah4U66g-k-NsZfMgWF9Yppt-lgUUyEs6NgP8aN-JphAtdjUIyR4xASvzMHhheJ-TxUWQ', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-14 15:58:36');
INSERT INTO `sessions` VALUES (151, 11, '689f85ae-6536-42c4-ab54-0b0c722d6ed7', '2024-06-15 16:19:41', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkanNramJuZmZkZmRmIGRzZHNmZGYiLCJpYXQiOjE3MTgzODIwNjEsImV4cCI6MTcxODQ2ODQ2MSwiaWQiOjExLCJmaXJzdE5hbWUiOiJkanNramJuZmZkZmRmIiwibGFzdE5hbWUiOiJkc2RzZmRmIiwicGVybWlzc2lvbnMiOiIifQ.ElIPWLHrH3W52D9-6_LfhBGkjagjP78FnlXO54pQ7xDoygR39lAofq3R6PIsmqkKke8T5ObG1jFH0RzckJaWDA', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-14 16:19:41');
INSERT INTO `sessions` VALUES (152, 11, '6e397de6-1de1-43d9-b48b-6549987ebe26', '2024-06-18 07:39:24', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkanNramJuZmZkZmRmIGRzZHNmZGYiLCJpYXQiOjE3MTg2MTExOTAsImV4cCI6MTcxODY5NzU5MCwiaWQiOjExLCJmaXJzdE5hbWUiOiJkanNramJuZmZkZmRmIiwibGFzdE5hbWUiOiJkc2RzZmRmIiwicGVybWlzc2lvbnMiOiIifQ.qAfmjQ42bE6tvBr8n2T1gKHR1I8sEuyddphp6G-mMQDOdg6H7Hn3EzEXUZ_Msa9wE2P74kQHQzabYXp1-6AIBw', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '2024-06-17 07:39:24');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `avatar_id` int(11) NULL DEFAULT NULL,
  `avatar_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `permissions` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` tinyint(1) NULL DEFAULT NULL,
  `provider` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `provider_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (11, 'djskjbnffdfdf', 'dsdsfdf', 'test@gmail.com', NULL, 23, '100/000/011/avatar/31eb8ea6-0813-4f2b-ade5-dd7e63a20ae3_avatar.png', NULL, '$2a$10$JBD6a34ySrINatOB.trQp.wJUAy.5/k24ukP2/kVxduCwvFo5n5L.', 1, 'local', NULL, '2024-05-15 00:50:26', '2024-06-06 18:07:26');
INSERT INTO `users` VALUES (12, 'Dong', '', NULL, '09948554545', NULL, NULL, NULL, '$2a$10$7WRXJ5gAnNUqsgej4rwDHO8AUi0C94EyRyJy32ImJ7wz4yLHVg52C', 0, 'local', NULL, '2024-05-17 11:56:15', '2024-05-17 11:56:15');
INSERT INTO `users` VALUES (13, 'Dong', '', NULL, '05485874554', NULL, NULL, NULL, '$2a$10$wtL.8ywIyPUTcC4TWxUChu5W3K9njVH9U70b94UTkIHPOFhZ9mPly', 0, 'local', NULL, '2024-05-17 11:58:58', '2024-05-17 11:58:58');
INSERT INTO `users` VALUES (14, 'fds', NULL, 'huydong.hoanam@gmail.com', '0489584578', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocJH2gavniuoOEyCxfjaMQYPuv1SvkuIIDuvYD9mMiBD52i0H5k=s96-c', NULL, NULL, 0, 'google', '100451249144088390959', '2024-06-04 06:50:36', '2024-06-04 08:12:20');
INSERT INTO `users` VALUES (15, 'fdf', NULL, 'huykaidong@gmail.com', NULL, NULL, NULL, NULL, NULL, 0, 'facebook', '1144465100090197', '2024-06-04 07:38:03', '2024-06-04 07:38:03');
INSERT INTO `users` VALUES (16, 'fdfd', 'dfdf', 'test1@gmail.com', NULL, NULL, NULL, NULL, '$2a$10$Rq3Gu2VMMnbF3TG6G/.0ae5tNTMYLBgAEgbTRG9Tid4oY1gjwvQH2', 0, 'local', NULL, '2024-06-10 20:35:42', '2024-06-10 20:35:42');

SET FOREIGN_KEY_CHECKS = 1;

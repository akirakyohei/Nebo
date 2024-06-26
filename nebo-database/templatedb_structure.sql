/*
 Navicat Premium Data Transfer
 
 Source Server         : do_an
 Source Server Type    : MariaDB
 Source Server Version : 101107
 Source Host           : localhost:3306
 Source Schema         : templatedb
 
 Target Server Type    : MariaDB
 Target Server Version : 101107
 File Encoding         : 65001
 
 Date: 26/06/2024 22:43:29
 */
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for app_permissions
-- ----------------------------
DROP TABLE IF EXISTS `app_permissions`;
CREATE TABLE `app_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NULL DEFAULT NULL,
  `app_id` bigint(20) NULL DEFAULT NULL,
  `template_ids` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`, `app_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  FULLTEXT INDEX `name`(`name`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for file_datas
-- ----------------------------
DROP TABLE IF EXISTS `file_datas`;
CREATE TABLE `file_datas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `file_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `key` varchar(2000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `extension` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `system` tinyint(1) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  FULLTEXT INDEX `file_name`(`file_name`)
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for paper_types
-- ----------------------------
DROP TABLE IF EXISTS `paper_types`;
CREATE TABLE `paper_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `width` int(11) NULL DEFAULT NULL,
  `unit_of_width` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `height` int(11) NULL DEFAULT NULL,
  `unit_of_height` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for print_logs
-- ----------------------------
DROP TABLE IF EXISTS `print_logs`;
CREATE TABLE `print_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NULL DEFAULT NULL,
  `actor_id` bigint(20) NULL DEFAULT NULL,
  `template_id` bigint(20) NULL DEFAULT NULL,
  `paper_type_id` int(11) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `template_id`(`template_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 80 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for template_options
-- ----------------------------
DROP TABLE IF EXISTS `template_options`;
CREATE TABLE `template_options` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NULL DEFAULT NULL,
  `format` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `height` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `width` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `landscape` tinyint(1) NULL DEFAULT NULL,
  `margin` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`, `id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 103 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for templates
-- ----------------------------
DROP TABLE IF EXISTS `templates`;
CREATE TABLE `templates` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `paper_type_id` int(11) NOT NULL,
  `category_ids` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `assets` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `components` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `css` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `styles` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `html` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `field_schema` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `size` bigint(20) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `shared_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'only_you',
  `active` tinyint(1) NULL DEFAULT NULL,
  `thumbnail_image_id` bigint(20) NULL DEFAULT NULL,
  `option_id` bigint(20) NULL DEFAULT NULL,
  `test_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `paper_type_id`(`paper_type_id`) USING BTREE,
  INDEX `templates_ibfk_2`(`option_id`) USING BTREE,
  FULLTEXT INDEX `name`(`name`),
  CONSTRAINT `templates_ibfk_1` FOREIGN KEY (`paper_type_id`) REFERENCES `paper_types` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `templates_ibfk_2` FOREIGN KEY (`option_id`) REFERENCES `template_options` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 99 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
-- ----------------------------
-- Table structure for user_permissions
-- ----------------------------
DROP TABLE IF EXISTS `user_permissions`;
CREATE TABLE `user_permissions` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `template_id` bigint(11) NULL DEFAULT NULL,
  `owner_user_id` bigint(11) NULL DEFAULT NULL,
  `shared_user_id` bigint(11) NULL DEFAULT NULL,
  `permissions` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `template_id`(`template_id`) USING BTREE,
  INDEX `shared_user_id`(`shared_user_id`, `template_id`) USING BTREE,
  INDEX `shared_user_id_2`(`shared_user_id`, `template_id`) USING BTREE,
  INDEX `owner_user_id`(`owner_user_id`, `template_id`) USING BTREE,
  CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
SET FOREIGN_KEY_CHECKS = 1;
INSERT INTO `paper_types`
VALUES (
    0,
    'Tùy chỉnh',
    NULL,
    NULL,
    NULL,
    NULL,
    'Tùy chỉnh chiều rộng chiều cao'
  );
INSERT INTO `paper_types`
VALUES (
    1,
    'A3 (297mm x 420mm)',
    297,
    'mm',
    420,
    'mm',
    NULL
  );
INSERT INTO `paper_types`
VALUES (
    2,
    'A4 (210mm x 297mm)',
    210,
    'mm',
    297,
    'mm',
    NULL
  );
INSERT INTO `paper_types`
VALUES (
    3,
    'A5 (148mm x 210mm)',
    148,
    'mm',
    210,
    'mm',
    NULL
  );
INSERT INTO `paper_types`
VALUES (
    4,
    'A6 (105mm x 148mm)',
    105,
    'mm',
    148,
    'mm',
    NULL
  );
INSERT INTO `paper_types`
VALUES (5, 'Thư (8.5in x 11in)', 9, 'in', 11, 'in', NULL);
INSERT INTO `templates`
VALUES (
    6,
    1,
    'Mẫu mặc định fdfdf',
    1,
    '',
    '[]',
    '[{\"type\":\"text\",\"content\":\"Insert your text here\",\"attributes\":{\"id\":\"iggz\"}},{\"type\":\"text\",\"content\":\"<p>dskjbdsd</p>\\n\",\"attributes\":{\"id\":\"iv1x\"}},{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"ioha9\"}},{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"iumh\"}},{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"iosis\"}},{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"i3pl\"}},{\"type\":\"text\",\"content\":\"Insert your text here\",\"attributes\":{\"id\":\"ilu8\"}},{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"ilzf\"}},{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"ioes\"}},{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"idci\"}},{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"ictn\"}}]',
    'body { margin: 0px 0px 0px 0px;}#iggz{padding:10px;}#iv1x{padding:10px;}#idci{padding:10px;}#ictn{padding:10px;}#ilzf{padding:10px;}#ioes{padding:10px;}#ilu8{padding:10px;}#i3pl{padding:10px;}#iumh{padding:10px;}#iosis{padding:10px;}#ioha9{padding:10px;}',
    '[{\"selectors\":[\"#iggz\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#iv1x\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#idci\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#ictn\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#ilzf\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#ioes\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#ilu8\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#i3pl\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#iumh\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#iosis\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#ioha9\"],\"style\":{\"padding\":\"10px\"}}]',
    '<body><div id=\"iggz\">Insert your text here</div><div id=\"iv1x\"><p>dskjbdsd</p>\n</div><div id=\"ioha9\"><p>Insert your text here</p>\n</div><div id=\"iumh\"><p>Insert your text here</p>\n</div><div id=\"iosis\"><p>Insert your text here</p>\n</div><div id=\"i3pl\"><p>Insert your text here</p>\n</div><div id=\"ilu8\">Insert your text here</div><div id=\"ilzf\"><p>Insert your text here</p>\n</div><div id=\"ioes\"><p>Insert your text here</p>\n</div><div id=\"idci\"><p>Insert your text here</p>\n</div><div id=\"ictn\"><p>Insert your text here</p>\n</div></body>',
    NULL,
    536,
    NULL,
    NULL,
    'only_you',
    0,
    0,
    12,
    1,
    NULL
  );
INSERT INTO `templates`
VALUES (
    7,
    1,
    'Mẫu mặc định',
    2,
    '',
    '[]',
    '[{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"i9cr\"}},{\"name\":\"Row\",\"droppable\":\".gjs-cell\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1},\"classes\":[{\"name\":\"gjs-row\",\"private\":1}],\"components\":[{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]},{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]},{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]}]},{\"name\":\"Row\",\"droppable\":\".gjs-cell\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1},\"classes\":[{\"name\":\"gjs-row\",\"private\":1}],\"attributes\":{\"id\":\"iyuh\"},\"components\":[{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]}]},{\"name\":\"Row\",\"droppable\":\".gjs-cell\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1},\"classes\":[{\"name\":\"gjs-row\",\"private\":1}],\"attributes\":{\"id\":\"iq2ik\"},\"components\":[{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}],\"attributes\":{\"id\":\"iynes\"}},{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]}]},{\"name\":\"Row\",\"droppable\":\".gjs-cell\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1},\"classes\":[{\"name\":\"gjs-row\",\"private\":1}],\"attributes\":{\"id\":\"i0vk6\"},\"components\":[{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]},{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]}]},{\"name\":\"Row\",\"droppable\":\".gjs-cell\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1},\"classes\":[{\"name\":\"gjs-row\",\"private\":1}],\"attributes\":{\"id\":\"i1c22\"},\"components\":[{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]},{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]}]},{\"name\":\"Row\",\"droppable\":\".gjs-cell\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1},\"classes\":[{\"name\":\"gjs-row\",\"private\":1}],\"attributes\":{\"id\":\"iplsj\"},\"components\":[{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]},{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]}]},{\"name\":\"Row\",\"droppable\":\".gjs-cell\",\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1},\"classes\":[{\"name\":\"gjs-row\",\"private\":1}],\"attributes\":{\"id\":\"ii5qq\"},\"components\":[{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]},{\"name\":\"Cell\",\"draggable\":\".gjs-row\",\"stylable-require\":[\"flex-basis\"],\"unstylable\":[\"width\"],\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":0,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.2,\"keyWidth\":\"flex-basis\"},\"classes\":[{\"name\":\"gjs-cell\",\"private\":1}]}]},{\"type\":\"text\",\"content\":\"Insert your text here\",\"attributes\":{\"id\":\"id2t1\"}},{\"type\":\"image\",\"resizable\":{\"ratioDefault\":1},\"attributes\":{\"id\":\"iu3sd\",\"src\":\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+\"}},{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"i34fj\"}},{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"i3hf\"}},{\"type\":\"text\",\"content\":\"<p>Insert your text here</p>\\n\",\"attributes\":{\"id\":\"is26\"}}]',
    'body { margin: 3mm 1mm 1mm 1mm;}#i34fj{padding:10px;}#id2t1{padding:10px;}#iu3sd{color:black;}',
    '[{\"selectors\":[\"#i34fj\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#id2t1\"],\"style\":{\"padding\":\"10px\"}},{\"selectors\":[\"#iu3sd\"],\"style\":{\"color\":\"black\"}}]',
    '<body id=\"igfo\"><div id=\"i9cr\"><p>Insert your text here</p>\n</div><div class=\"gjs-row\"><div class=\"gjs-cell\"></div><div class=\"gjs-cell\"></div><div class=\"gjs-cell\"></div></div><div id=\"iyuh\" class=\"gjs-row\"><div class=\"gjs-cell\"></div></div><div id=\"iq2ik\" class=\"gjs-row\"><div id=\"iynes\" class=\"gjs-cell\"></div><div class=\"gjs-cell\"></div></div><div id=\"i0vk6\" class=\"gjs-row\"><div class=\"gjs-cell\"></div><div class=\"gjs-cell\"></div></div><div id=\"i1c22\" class=\"gjs-row\"><div class=\"gjs-cell\"></div><div class=\"gjs-cell\"></div></div><div id=\"iplsj\" class=\"gjs-row\"><div class=\"gjs-cell\"></div><div class=\"gjs-cell\"></div></div><div id=\"ii5qq\" class=\"gjs-row\"><div class=\"gjs-cell\"></div><div class=\"gjs-cell\"></div></div><div id=\"id2t1\">Insert your text here</div><img id=\"iu3sd\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+\"/><div id=\"i34fj\"><p>Insert your text here</p>\n</div><div id=\"i3hf\"><p>Insert your text here</p>\n</div><div id=\"is26\"><p>Insert your text here</p>\n</div></body>',
    NULL,
    1338,
    NULL,
    NULL,
    'only_you',
    0,
    0,
    0,
    19,
    NULL
  );
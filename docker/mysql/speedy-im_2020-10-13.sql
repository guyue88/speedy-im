# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.49)
# Database: speedy-im
# Generation Time: 2020-10-13 09:20:45 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group`;

CREATE TABLE `group` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) DEFAULT NULL,
  `intrduce` text COMMENT '群介绍',
  `limit` int(5) NOT NULL DEFAULT '100' COMMENT '群上限',
  `create_uid` bigint(20) NOT NULL COMMENT '创建人',
  `create_time` bigint(20) NOT NULL,
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;

INSERT INTO `group` (`id`, `name`, `avatar`, `intrduce`, `limit`, `create_uid`, `create_time`, `status`)
VALUES
	(1000,'测试一群','https://im.wangcai.me/speedy_avatar_7.jpg','测试一群',100,1000,1591349594288,1);

/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table message
# ------------------------------------------------------------

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `dist_id` bigint(20) NOT NULL COMMENT '群聊是id是群的id',
  `dist_type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1 - 私聊 2 - 群聊',
  `is_received` tinyint(2) NOT NULL DEFAULT '0' COMMENT '对方是否收到',
  `is_sent` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否已经发送给对方',
  `type` varchar(20) NOT NULL DEFAULT 'text' COMMENT 'text,audio,image,video',
  `content` text NOT NULL COMMENT '内容或者地址',
  `create_time` bigint(20) NOT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;

INSERT INTO `message` (`id`, `user_id`, `dist_id`, `dist_type`, `is_received`, `is_sent`, `type`, `content`, `create_time`, `status`)
VALUES
	(1,1000,1001,1,0,0,'text','你好',1591349594288,1),
	(2,1000,1002,1,0,0,'text','你也好',1591349594288,1),
	(3,1000,1001,1,0,0,'text','在吗？',1591355800809,1),
	(4,1001,1000,1,0,1,'text','你好',1591349594288,1),
	(5,1002,1000,1,0,1,'text','你好',1591349594288,1),
	(6,1003,1000,1,0,1,'text','你好',1591349594288,1);

/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table relation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `relation`;

CREATE TABLE `relation` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) NOT NULL,
  `friend_id` bigint(20) NOT NULL,
  `remark` varchar(255) NOT NULL DEFAULT '',
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '0 - 删除 1 - 正常 2 - 拉黑',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `relation` WRITE;
/*!40000 ALTER TABLE `relation` DISABLE KEYS */;

INSERT INTO `relation` (`id`, `uid`, `friend_id`, `remark`, `status`)
VALUES
	(1,1000,1001,'',1),
	(2,1000,1002,'',1),
	(3,1000,1003,'',1),
	(4,1001,1000,'',1),
	(5,1002,1000,'',1),
	(6,1003,1000,'',1);

/*!40000 ALTER TABLE `relation` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;

INSERT INTO `role` (`id`, `name`, `status`)
VALUES
	(1000,'管理员',1);

/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL DEFAULT '',
  `mobile` bigint(11) NOT NULL,
  `password` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) DEFAULT '',
  `sex` tinyint(3) NOT NULL DEFAULT '2' COMMENT '0 - 男 1 - 女 2 - 未知',
  `token` varchar(255) DEFAULT NULL,
  `client_id` varchar(255) DEFAULT NULL COMMENT 'socket_id',
  `client_type` varchar(50) DEFAULT NULL COMMENT 'android/ios',
  `create_time` bigint(20) NOT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `nickname`, `mobile`, `password`, `avatar`, `sex`, `token`, `client_id`, `client_type`, `create_time`, `status`)
VALUES
	(1000,'罗老魔',13600000000,'81c4369bea82d8daafd75818497dc962033a1dcc','https://im.wangcai.me/speedy_avatar_6.jpg',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEwMDAsImlhdCI6MTYwMjU3OTg3NiwiZXhwIjoxNjAzMTg0Njc2fQ.KMXlQ6YRfcsBzQsni5Ys1DTz4JpYT2xhlzYVCP6Vrdk','/chat#mWc6dtgBeRrnBebDAAAD','android',1591349594288,1),
	(1001,'小七',13600000001,'81c4369bea82d8daafd75818497dc962033a1dcc','https://im.wangcai.me/speedy_avatar_1.jpg',1,NULL,NULL,NULL,1591349594288,1),
	(1002,'小白',13600000002,'81c4369bea82d8daafd75818497dc962033a1dcc','https://im.wangcai.me/speedy_avatar_2.jpg',1,NULL,NULL,NULL,1591349594288,1),
	(1003,'小青',13600000003,'81c4369bea82d8daafd75818497dc962033a1dcc','https://im.wangcai.me/speedy_avatar_3.jpg',1,NULL,NULL,NULL,1591349594288,1);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_group`;

CREATE TABLE `user_group` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) NOT NULL,
  `group_id` bigint(20) NOT NULL,
  `remark` varchar(255) DEFAULT NULL COMMENT '群备注，别名',
  `role_id` int(11) DEFAULT NULL COMMENT '群角色',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;

INSERT INTO `user_group` (`id`, `uid`, `group_id`, `remark`, `role_id`, `status`)
VALUES
	(1000,1000,1000,NULL,1000,1);

/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table view_user_friends
# ------------------------------------------------------------

DROP VIEW IF EXISTS `view_user_friends`;

CREATE TABLE `view_user_friends` (
   `id` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0',
   `uid` BIGINT(20) NOT NULL,
   `friend_id` BIGINT(20) NOT NULL,
   `remark` VARCHAR(255) NOT NULL DEFAULT '',
   `nickname` VARCHAR(255) NOT NULL DEFAULT '',
   `mobile` BIGINT(11) NOT NULL,
   `avatar` VARCHAR(255) NULL DEFAULT '',
   `sex` TINYINT(3) NOT NULL DEFAULT '2',
   `client_id` VARCHAR(255) NULL DEFAULT NULL,
   `client_type` VARCHAR(50) NULL DEFAULT NULL,
   `create_time` BIGINT(20) NOT NULL,
   `status` INT(2) NOT NULL DEFAULT '1'
) ENGINE=MyISAM;



# Dump of table view_user_group
# ------------------------------------------------------------

DROP VIEW IF EXISTS `view_user_group`;

CREATE TABLE `view_user_group` (
   `uid` BIGINT(20) NOT NULL,
   `user_group_remark` VARCHAR(255) NULL DEFAULT NULL,
   `user_group_status` TINYINT(4) NOT NULL DEFAULT '1',
   `group_id` BIGINT(20) NOT NULL,
   `name` VARCHAR(255) NULL DEFAULT '',
   `avatar` VARCHAR(255) NULL DEFAULT NULL,
   `intrduce` TEXT NULL DEFAULT NULL,
   `limit` INT(5) NULL DEFAULT '100',
   `group_status` INT(2) NULL DEFAULT '1',
   `create_time` BIGINT(20) NULL DEFAULT NULL,
   `role_name` VARCHAR(255) NULL DEFAULT '',
   `role_id` INT(11) NULL DEFAULT NULL,
   `role_status` TINYINT(4) NULL DEFAULT '1'
) ENGINE=MyISAM;





# Replace placeholder table for view_user_friends with correct view syntax
# ------------------------------------------------------------

DROP TABLE `view_user_friends`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_user_friends`
AS SELECT
   `R`.`id` AS `id`,
   `R`.`uid` AS `uid`,
   `R`.`friend_id` AS `friend_id`,
   `R`.`remark` AS `remark`,
   `U`.`nickname` AS `nickname`,
   `U`.`mobile` AS `mobile`,
   `U`.`avatar` AS `avatar`,
   `U`.`sex` AS `sex`,
   `U`.`client_id` AS `client_id`,
   `U`.`client_type` AS `client_type`,
   `U`.`create_time` AS `create_time`,
   `R`.`status` AS `status`
FROM (`user` `U` join `relation` `R` on((`U`.`id` = `R`.`friend_id`)));


# Replace placeholder table for view_user_group with correct view syntax
# ------------------------------------------------------------

DROP TABLE `view_user_group`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_user_group`
AS SELECT
   `u`.`uid` AS `uid`,
   `u`.`remark` AS `user_group_remark`,
   `u`.`status` AS `user_group_status`,
   `u`.`group_id` AS `group_id`,
   `a`.`name` AS `name`,
   `a`.`avatar` AS `avatar`,
   `a`.`intrduce` AS `intrduce`,
   `a`.`limit` AS `limit`,
   `a`.`status` AS `group_status`,
   `a`.`create_time` AS `create_time`,
   `b`.`name` AS `role_name`,
   `u`.`role_id` AS `role_id`,
   `b`.`status` AS `role_status`
FROM ((`user_group` `u` left join `group` `a` on((`u`.`group_id` = `a`.`id`))) left join `role` `b` on((`u`.`role_id` = `b`.`id`)));

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: speedy-im
-- ------------------------------------------------------
-- Server version	5.6.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1000,'测试一群','https://im.wangcai.me/speedy_avatar_7.jpg','测试一群',100,1000,1591349594288,1);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,1000,1001,1,0,0,'text','你好',1591349594288,1),(2,1000,1002,1,0,0,'text','你也好',1591349594288,1),(3,1000,1001,1,0,0,'text','在吗？',1591355800809,1);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relation`
--

DROP TABLE IF EXISTS `relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `relation` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) NOT NULL,
  `friend_id` bigint(20) NOT NULL,
  `remark` varchar(255) NOT NULL DEFAULT '',
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '0 - 删除 1 - 正常 2 - 拉黑',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relation`
--

LOCK TABLES `relation` WRITE;
/*!40000 ALTER TABLE `relation` DISABLE KEYS */;
INSERT INTO `relation` VALUES (1,1000,1001,'',1),(2,1000,1002,'',1),(3,1000,1003,'',1),(4,1001,1000,'',1),(5,1002,1000,'',1),(6,1003,1000,'',1);
/*!40000 ALTER TABLE `relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1000,'罗老魔',13600000000,'81c4369bea82d8daafd75818497dc962033a1dcc','https://im.wangcai.me/speedy_avatar_6.jpg',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEwMDAsImlhdCI6MTU5MTM1Nzk2MywiZXhwIjoxNTkxOTYyNzYzfQ.l20ikahdqTQho_sP7yCEv6WUaviM7pBGxRapf258VQc',NULL,'android',1591349594288,1),(1001,'小七',13600000001,'81c4369bea82d8daafd75818497dc962033a1dcc','https://im.wangcai.me/speedy_avatar_1.jpg',1,NULL,NULL,NULL,1591349594288,1),(1002,'小白',13600000002,'81c4369bea82d8daafd75818497dc962033a1dcc','https://im.wangcai.me/speedy_avatar_2.jpg',1,NULL,NULL,NULL,1591349594288,1),(1003,'小青',13600000003,'81c4369bea82d8daafd75818497dc962033a1dcc','https://im.wangcai.me/speedy_avatar_3.jpg',1,NULL,NULL,NULL,1591349594288,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_group` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` bigint(20) NOT NULL,
  `remark` varchar(255) DEFAULT NULL COMMENT '群备注，别名',
  `nick_name` varchar(255) DEFAULT NULL COMMENT '群昵称',
  `role_id` int(11) DEFAULT NULL COMMENT '群角色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_user_friends`
--

DROP TABLE IF EXISTS `view_user_friends`;
/*!50001 DROP VIEW IF EXISTS `view_user_friends`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `view_user_friends` AS SELECT 
 1 AS `uid`,
 1 AS `friend_id`,
 1 AS `remark`,
 1 AS `status`,
 1 AS `friend_name`,
 1 AS `friend_mobile`,
 1 AS `friend_avatar`,
 1 AS `friend_sex`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_user_friends`
--

/*!50001 DROP VIEW IF EXISTS `view_user_friends`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_user_friends` AS select `R`.`uid` AS `uid`,`R`.`friend_id` AS `friend_id`,`R`.`remark` AS `remark`,`R`.`status` AS `status`,`U`.`nickname` AS `friend_name`,`U`.`mobile` AS `friend_mobile`,`U`.`avatar` AS `friend_avatar`,`U`.`sex` AS `friend_sex` from (`user` `U` join `relation` `R` on((`U`.`id` = `R`.`friend_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-05 20:00:49

CREATE DATABASE  IF NOT EXISTS `TaskBee` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `TaskBee`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: TaskBee
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Follow_Up_Info`
--

DROP TABLE IF EXISTS `Follow_Up_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Follow_Up_Info` (
  `follow_up_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `poster_id` int(11) DEFAULT NULL,
  `index` int(11) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `post_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`follow_up_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Follow_Up_Info`
--

LOCK TABLES `Follow_Up_Info` WRITE;
/*!40000 ALTER TABLE `Follow_Up_Info` DISABLE KEYS */;
/*!40000 ALTER TABLE `Follow_Up_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post_Info`
--

DROP TABLE IF EXISTS `Post_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post_Info` (
  `post_id` int(11) NOT NULL,
  `posted_id` int(11) DEFAULT NULL,
  `post_time` timestamp NULL DEFAULT NULL,
  `post_title` varchar(200) DEFAULT NULL,
  `post_content` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post_Info`
--

LOCK TABLES `Post_Info` WRITE;
/*!40000 ALTER TABLE `Post_Info` DISABLE KEYS */;
/*!40000 ALTER TABLE `Post_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post_Tag`
--

DROP TABLE IF EXISTS `Post_Tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post_Tag` (
  `post_id` int(11) NOT NULL,
  `topic_tag_id` int(11) NOT NULL,
  PRIMARY KEY (`post_id`,`topic_tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post_Tag`
--

LOCK TABLES `Post_Tag` WRITE;
/*!40000 ALTER TABLE `Post_Tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `Post_Tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Skill_Tag`
--

DROP TABLE IF EXISTS `Skill_Tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Skill_Tag` (
  `skill_tag_id` int(11) NOT NULL,
  `skill` varchar(45) DEFAULT NULL,
  `skill_description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`skill_tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Skill_Tag`
--

LOCK TABLES `Skill_Tag` WRITE;
/*!40000 ALTER TABLE `Skill_Tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `Skill_Tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Task_Info`
--

DROP TABLE IF EXISTS `Task_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Task_Info` (
  `task_id` int(11) NOT NULL,
  `task_poster_id` int(11) DEFAULT NULL,
  `is_taken` tinyint(4) DEFAULT NULL,
  `is_completed` tinyint(4) DEFAULT NULL,
  `task_title` varchar(200) DEFAULT NULL,
  `task_content` varchar(1000) DEFAULT NULL,
  `location` geometry DEFAULT NULL,
  `post_time` timestamp NULL DEFAULT NULL,
  `taken_time` timestamp NULL DEFAULT NULL,
  `completed_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Task_Info`
--

LOCK TABLES `Task_Info` WRITE;
/*!40000 ALTER TABLE `Task_Info` DISABLE KEYS */;
/*!40000 ALTER TABLE `Task_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Task_Tag`
--

DROP TABLE IF EXISTS `Task_Tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Task_Tag` (
  `task_id` int(11) NOT NULL,
  `skill_tag_id` int(11) NOT NULL,
  PRIMARY KEY (`task_id`,`skill_tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Task_Tag`
--

LOCK TABLES `Task_Tag` WRITE;
/*!40000 ALTER TABLE `Task_Tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `Task_Tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Topic_Tag`
--

DROP TABLE IF EXISTS `Topic_Tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Topic_Tag` (
  `topic_tag_id` int(11) NOT NULL,
  `topic` varchar(45) DEFAULT NULL,
  `topic_description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`topic_tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Topic_Tag`
--

LOCK TABLES `Topic_Tag` WRITE;
/*!40000 ALTER TABLE `Topic_Tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `Topic_Tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Follow_Up`
--

DROP TABLE IF EXISTS `User_Follow_Up`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Follow_Up` (
  `follow_up_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`follow_up_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Follow_Up`
--

LOCK TABLES `User_Follow_Up` WRITE;
/*!40000 ALTER TABLE `User_Follow_Up` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Follow_Up` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Info`
--

DROP TABLE IF EXISTS `User_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Info` (
  `username` varchar(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(32) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `money` decimal(32,0) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Info`
--

LOCK TABLES `User_Info` WRITE;
/*!40000 ALTER TABLE `User_Info` DISABLE KEYS */;
INSERT INTO `User_Info` VALUES ('haolin','123@gmail','123456','2018-03-25 03:01:57',1,0),('Stephen','Stephen@gmail.com','123','2018-03-25 04:00:00',2,0),('123','123@gmail.com','123','2018-03-25 04:00:00',3,0),('321','321@gmail.com','321','2018-03-25 04:00:00',4,0);
/*!40000 ALTER TABLE `User_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Post`
--

DROP TABLE IF EXISTS `User_Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Post` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Post`
--

LOCK TABLES `User_Post` WRITE;
/*!40000 ALTER TABLE `User_Post` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Tag`
--

DROP TABLE IF EXISTS `User_Tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Tag` (
  `user_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Tag`
--

LOCK TABLES `User_Tag` WRITE;
/*!40000 ALTER TABLE `User_Tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Task_Post`
--

DROP TABLE IF EXISTS `User_Task_Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Task_Post` (
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`task_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Task_Post`
--

LOCK TABLES `User_Task_Post` WRITE;
/*!40000 ALTER TABLE `User_Task_Post` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Task_Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Task_Serve`
--

DROP TABLE IF EXISTS `User_Task_Serve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Task_Serve` (
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `poster_id` int(11) NOT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Task_Serve`
--

LOCK TABLES `User_Task_Serve` WRITE;
/*!40000 ALTER TABLE `User_Task_Serve` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Task_Serve` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_queue`
--

DROP TABLE IF EXISTS `message_queue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message_queue` (
  `send_user` varchar(45) NOT NULL,
  `receive_user` varchar(45) NOT NULL,
  `content` varchar(200) DEFAULT NULL,
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `send_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_queue`
--

LOCK TABLES `message_queue` WRITE;
/*!40000 ALTER TABLE `message_queue` DISABLE KEYS */;
/*!40000 ALTER TABLE `message_queue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-25  0:45:52

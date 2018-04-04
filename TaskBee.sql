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
-- Table structure for table `Friend_List`
--

DROP TABLE IF EXISTS `Friend_List`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Friend_List` (
  `user_name` varchar(20) NOT NULL,
  `friend_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Friend_List`
--

LOCK TABLES `Friend_List` WRITE;
/*!40000 ALTER TABLE `Friend_List` DISABLE KEYS */;
/*!40000 ALTER TABLE `Friend_List` ENABLE KEYS */;
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
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `poster_name` varchar(20) DEFAULT NULL,
  `is_taken` tinyint(4) DEFAULT '0',
  `is_completed` tinyint(4) DEFAULT '0',
  `description` varchar(500) DEFAULT NULL,
  `location` geometry DEFAULT NULL,
  `taken_time` timestamp NULL DEFAULT NULL,
  `completed_time` timestamp NULL DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  `img_url0` varchar(60) DEFAULT NULL,
  `img_url1` varchar(60) DEFAULT NULL,
  `img_url2` varchar(60) DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Task_Info`
--

LOCK TABLES `Task_Info` WRITE;
/*!40000 ALTER TABLE `Task_Info` DISABLE KEYS */;
INSERT INTO `Task_Info` VALUES (57,'Alice',0,0,'Hi, I’m Alice!',NULL,NULL,NULL,0,'/images/57_0.JPG',NULL,NULL,'2018-03-26 04:00:00','2018-03-26 04:00:00'),(58,'Bob',0,0,'Can some body teach me photography? ',NULL,NULL,NULL,100,'/images/58_0.JPG','/images/58_1.JPG',NULL,'2018-03-26 04:00:00','2018-03-26 04:00:00'),(59,'Bob',0,0,'Hello just say hi',NULL,NULL,NULL,10,'/images/59_0.JPG','/images/59_1.JPG','/images/59_2.JPG','2018-03-26 04:00:00','2018-03-30 04:00:00');
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
  `tag` varchar(20) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Task_Tag`
--

LOCK TABLES `Task_Tag` WRITE;
/*!40000 ALTER TABLE `Task_Tag` DISABLE KEYS */;
INSERT INTO `Task_Tag` VALUES (50,'undergraduate',74),(50,'graduate',75),(50,'sport',76),(50,'art',77),(50,'others',78),(51,'undergraduate',79),(51,'graduate',80),(51,'sport',81),(51,'art',82),(51,'others',83),(52,'undergraduate',84),(52,'graduate',85),(52,'sport',86),(52,'art',87),(52,'others',88),(53,'undergraduate',89),(53,'graduate',90),(53,'sport',91),(53,'art',92),(53,'others',93),(54,'undergraduate',94),(54,'graduate',95),(54,'sport',96),(54,'art',97),(54,'others',98),(55,'undergraduate',99),(55,'graduate',100),(55,'sport',101),(55,'art',102),(55,'others',103),(56,'undergraduate',104),(56,'graduate',105),(56,'sport',106),(56,'art',107),(56,'others',108),(57,'undergraduate',109),(57,'graduate',110),(57,'sport',111),(57,'art',112),(57,'others',113),(58,'undergraduate',114),(58,'graduate',115),(58,'sport',116),(58,'art',117),(58,'others',118),(59,'graduate',119),(59,'art',120),(59,'others',121);
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
  `img_url` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Info`
--

LOCK TABLES `User_Info` WRITE;
/*!40000 ALTER TABLE `User_Info` DISABLE KEYS */;
INSERT INTO `User_Info` VALUES ('haolin','123@gmail','123456','2018-03-25 03:01:57',1,0,NULL),('Stephen','Stephen@gmail.com','123','2018-03-25 04:00:00',2,0,NULL),('123','123@gmail.com','123','2018-03-25 04:00:00',3,0,NULL),('321','321@gmail.com','321','2018-03-25 04:00:00',4,0,NULL),('Alice','Alice@yale.edu','123','2018-03-26 04:00:00',5,0,'/images/5.JPG'),('Bob','Bob@yale.edu','123','2018-03-26 04:00:00',6,0,'/images/6.JPG');
/*!40000 ALTER TABLE `User_Info` ENABLE KEYS */;
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
-- Table structure for table `User_Task_Serve`
--

DROP TABLE IF EXISTS `User_Task_Serve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Task_Serve` (
  `task_id` int(11) NOT NULL,
  `taker_name` varchar(20) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_queue`
--

LOCK TABLES `message_queue` WRITE;
/*!40000 ALTER TABLE `message_queue` DISABLE KEYS */;
INSERT INTO `message_queue` VALUES ('Bob','Alice','Cool',28,'2018-03-26 10:31:32'),('Bob','Alice','Niu',29,'2018-03-26 10:31:37');
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

-- Dump completed on 2018-04-03 19:39:13

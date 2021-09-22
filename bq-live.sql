-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bikequiz
-- ------------------------------------------------------
-- Server version	5.7.32-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `highscores`
--

DROP TABLE IF EXISTS `highscores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `highscores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) DEFAULT NULL,
  `totalscore` int(11) DEFAULT NULL,
  `club100` tinyint(1) DEFAULT '0',
  `club100num` int(11) DEFAULT NULL,
  `scoredate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `highscores`
--

LOCK TABLES `highscores` WRITE;
/*!40000 ALTER TABLE `highscores` DISABLE KEYS */;
INSERT INTO `highscores` VALUES (4,'Stefan Turner',200,0,NULL,'2021-09-13 19:33:17'),(5,'Ryan Sathoff',150,0,NULL,'2021-09-13 19:33:17'),(7,'Test',410,0,5,'2021-09-13 22:43:31'),(8,'Lucas',490,0,5,'2021-09-13 23:34:40'),(21,'Go',500,0,6,'2021-09-19 17:06:05'),(22,'Go2',1925,0,6,'2021-09-19 17:07:01'),(23,'Lucas Mace',2450,0,6,'2021-09-19 17:10:47'),(24,'Garbitch',1300,0,6,'2021-09-19 18:27:49'),(25,'Jim Person Face',2425,0,6,'2021-09-21 21:32:28'),(26,'ButtFace',3350,0,12,'2021-09-21 23:29:55');
/*!40000 ALTER TABLE `highscores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parts`
--

DROP TABLE IF EXISTS `parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `win` varchar(64) DEFAULT NULL,
  `lose1` varchar(64) DEFAULT NULL,
  `lose2` varchar(64) DEFAULT NULL,
  `lose3` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parts`
--

LOCK TABLES `parts` WRITE;
/*!40000 ALTER TABLE `parts` DISABLE KEYS */;
INSERT INTO `parts` VALUES (1,'SPD Cleat Spacer','Front Derailleur Spacer','Campagnolo Dropout Spacer','FSA Aero Bar Shim'),(2,'Shimano Olive','Magura Olive','Campagnolo Olive','FSA Olive'),(3,'STI Band Clamp Bolt','Sram Direct Mount Brake Lever Bolt','Fender Stay Bolt','Quill Bolt'),(4,'Shimano Slotted Shift Ferrule','Jagwire Slotted Brake Ferrule','Sram Slotted Shift Ferrule','Sram Slotted Brake Ferrule'),(5,'Magura Bleed Tool','Shimano Bleed Block','Jagwire Bleed Tool','Shimano E-Tube Tool'),(6,'Rotor Lock Washer','Rotor Shim','Flat Brake Shim','Spoke Washer'),(7,'Cannondale Lefty Spindle','Campagnolo Ultra Torque Axle','Wheels Manufacturing Bearing Guide','Chris King Coaster Brake Axle'),(8,'Sram Front Derailleur Shim','Shimano Front Derailleur Shim','Di2 Frame Plug','EPS Frame Plug'),(9,'Shimano Cable Port Cover','Microshift Cable Port Cover','Sram Cable Port Cover','Sram Bleed Cover'),(10,'Park Tool Truing Stand Arm Cap','Var Truing Stand Arm Cap','Unior Truing Stand Arm Cap','Shimano Brake Lever Packaging'),(11,'Shimano Front Derailleur Link Cover','Cervelo Front Derailleur Frame Cable Guide','Pinarello Front Derailleur Frame Cable Guide','Sram Power Meter Magnet'),(12,'Shimano Front Derailleur Converter','Shimano Bleed Stop','Quarq Power Meter Plug','Garmin Power Meter Plug');
/*!40000 ALTER TABLE `parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `part_id` int(11) NOT NULL,
  `filename` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (1,1,'PXL_20210908_211730084'),(2,1,'PXL_20210908_211745660'),(3,2,'PXL_20210913_182204073'),(4,2,'PXL_20210913_182156223'),(5,4,'PXL_20210913_182118531'),(6,4,'PXL_20210913_182105933'),(7,3,'PXL_20210913_181827778'),(8,3,'PXL_20210913_181835533'),(9,5,'PXL_20210913_182000923'),(10,5,'PXL_20210913_181950881'),(11,6,'PXL_20210913_181901791'),(12,6,'PXL_20210913_181928888'),(13,7,'PXL_20210914_161634020'),(14,7,'PXL_20210914_161644588'),(15,8,'PXL_20210914_233628067'),(16,8,'PXL_20210914_233638321'),(17,9,'PXL_20210914_233720046'),(18,9,'PXL_20210914_233743288'),(19,10,'PXL_20210914_234016348'),(20,10,'PXL_20210914_234027632'),(21,11,'PXL_20210914_234102079'),(22,11,'PXL_20210914_234052477'),(23,12,'PXL_20210914_234219730'),(24,12,'PXL_20210914_234230262');
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wrong`
--

DROP TABLE IF EXISTS `wrong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wrong` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lose` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wrong`
--

LOCK TABLES `wrong` WRITE;
/*!40000 ALTER TABLE `wrong` DISABLE KEYS */;
/*!40000 ALTER TABLE `wrong` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-22  0:13:34

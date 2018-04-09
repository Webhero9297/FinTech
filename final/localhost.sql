-- phpMyAdmin SQL Dump
-- version 3.1.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 31, 2009 at 10:51 AM
-- Server version: 5.1.30
-- PHP Version: 5.2.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `stock`
--

-- --------------------------------------------------------

--
-- Table structure for table `main`
--

CREATE TABLE IF NOT EXISTS `main` (
  `tid` varchar(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `main`
--


-- --------------------------------------------------------

--
-- Table structure for table `share`
--

CREATE TABLE IF NOT EXISTS `share` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `flag` tinyint(1) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `share`
--

INSERT INTO `share` (`id`, `name`, `flag`, `price`) VALUES
(501, 'Airtel', 0, 396),
(503, 'Dell', 0, 902),
(504, 'compaq', 0, 751),
(505, 'Samsung', 0, 507),
(506, 'Nokia', 0, 360),
(507, 'google', 0, 903),
(508, 'yahoo', 0, 601);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `name` varchar(10) NOT NULL,
  `pass` varchar(10) NOT NULL,
  `cash` int(11) NOT NULL DEFAULT '5000',
  `worth` int(11) NOT NULL DEFAULT '5000',
  `email` varchar(20) NOT NULL,
  `cart` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

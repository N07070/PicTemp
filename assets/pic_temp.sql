-- phpMyAdmin SQL Dump
-- version 4.2.12deb2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 13 Août 2015 à 19:58
-- Version du serveur :  5.6.25-0ubuntu0.15.04.1
-- Version de PHP :  5.6.4-4ubuntu6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `pic_temp`
--

-- --------------------------------------------------------

--
-- Structure de la table `pic_temp_images`
--

CREATE TABLE IF NOT EXISTS `pic_temp_images` (
`image_id` int(11) NOT NULL,
  `image_filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `image_user_origin` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `image_age` int(11) DEFAULT NULL,
  `image_destination_flow` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pic_temp_users`
--

CREATE TABLE IF NOT EXISTS `pic_temp_users` (
`user_id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` text,
  `user_creation_date` date DEFAULT NULL,
  `user_username` varchar(255) DEFAULT NULL,
  `user_is_moderator` tinyint(1) NOT NULL DEFAULT '0',
  `user_subscribed_flows` text CHARACTER SET utf8 COLLATE utf8_bin,
  `user_moderator_of` text CHARACTER SET utf8 COLLATE utf8_bin,
  `user_is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `user_is_premium` tinyint(1) NOT NULL DEFAULT '0',
  `user_age` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `pic_temp_users`
--

INSERT INTO `pic_temp_users` (`user_id`, `user_email`, `user_password`, `user_creation_date`, `user_username`, `user_is_moderator`, `user_subscribed_flows`, `user_moderator_of`, `user_is_admin`, `user_is_premium`, `user_age`) VALUES
(1, 'first_user@example.com', '$2a$10$rjA/qfNys8S4ean/zuWKPu7.vrb8leDxd8Ma6RvIAqcmjfGPhC20K', '0000-00-00', 'TheFirstUser', 0, 'default', NULL, 0, 0, 42),
(2, 'hello@example.com', '$2a$10$J0dPvGx/XPzrilN8Tfq1VO3/3R47E2ykbKfI3UAS.kNC5b8y5zxs2', '2015-07-30', 'HelloWorld', 0, 'default', NULL, 0, 0, 44),
(3, 'nduiezu@fdizfj.comdez', '$2a$11$rkOPPkOUMGWqkCkQPwh3h.9JqEe2mN1jwNK8OXfajKRiIsSpjZVhW', '2015-07-31', 'dejzoi21768741098', 0, 'default', NULL, 0, 0, 77);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `pic_temp_images`
--
ALTER TABLE `pic_temp_images`
 ADD PRIMARY KEY (`image_id`);

--
-- Index pour la table `pic_temp_users`
--
ALTER TABLE `pic_temp_users`
 ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `pic_temp_images`
--
ALTER TABLE `pic_temp_images`
MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `pic_temp_users`
--
ALTER TABLE `pic_temp_users`
MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

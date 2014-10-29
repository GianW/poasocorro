-- phpMyAdmin SQL Dump
-- version 2.11.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 22, 2014 at 02:53 PM
-- Server version: 5.0.24
-- PHP Version: 5.2.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `poasocorro`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_convenio`
--

CREATE TABLE IF NOT EXISTS `tb_convenio` (
  `cod_convenio` int(10) unsigned NOT NULL auto_increment,
  `nome` varchar(20) NOT NULL,
  `telefone` varchar(10) default NULL,
  `site` varchar(120) default NULL,
  PRIMARY KEY  (`cod_convenio`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `tb_convenio`
--


-- --------------------------------------------------------

--
-- Table structure for table `tb_especialidades`
--

CREATE TABLE IF NOT EXISTS `tb_especialidades` (
  `cod_especialidade` int(10) unsigned NOT NULL auto_increment,
  `nome_especialidade` varchar(50) NOT NULL,
  `desc_especialidade` varchar(200) default NULL,
  PRIMARY KEY  (`cod_especialidade`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tb_especialidades`
--

INSERT INTO `tb_especialidades` (`cod_especialidade`, `nome_especialidade`, `desc_especialidade`) VALUES
(1, 'traumatologia', NULL),
(2, 'cardiologia', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_estabelecimento`
--

CREATE TABLE IF NOT EXISTS `tb_estabelecimento` (
  `cod_estab` int(10) unsigned NOT NULL auto_increment,
  `nome` varchar(100) NOT NULL,
  `tipo` varchar(10) default NULL,
  `adm` varchar(20) default NULL,
  `telefone` char(10) default NULL,
  `site` varchar(120) default NULL,
  `latitude` char(20) default NULL,
  `longitude` char(20) default NULL,
  `endereco` varchar(100) default NULL,
  PRIMARY KEY  (`cod_estab`),
  KEY `cod_estab` (`cod_estab`),
  KEY `tipo` (`tipo`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

--
-- Dumping data for table `tb_estabelecimento`
--

INSERT INTO `tb_estabelecimento` (`cod_estab`, `nome`, `tipo`, `adm`, `telefone`, `site`, `latitude`, `longitude`, `endereco`) VALUES
(1, 'Pronto Socorro', 'Hospital', 'Público', '3289-7999', NULL, '-30.0370276', '-51.2092421', 'Largo Teodoro Herzl, sn'),
(2, 'Independência', 'Hospital', 'Público|Privado', '3383-5600', NULL, '-30.0623002', '-51.1492512', 'Av. Antônio de Carvalho, 450'),
(3, 'Hospital de Clínicas', 'Hospital', 'Público|Privado', '3316-8000', 'www.hcpa.ufrgs.br', '-30.0400789', '-51.208049', 'Rua Ramiro Barcelos, 2.350'),
(4, 'Santa Casa', 'Hospital', 'Público|Privado', '32148361', 'http://www.santacasa.org.br/pt', '-30.0303269', '-51.2226358', 'Rua Professor Annes Dias, 295'),
(5, 'Hospital São lucas da PUCRS', 'Hospital', 'Público | Privado', '3320-3000', 'https://www.hospitalsaolucas.pucrs.br/portal/index.php', '-30.0550035', '-51.1694245', 'Avenida Ipiranga, 6.690'),
(6, 'Cristo Redentor', 'Hospital', NULL, NULL, NULL, '-30.0104597', '-51.1593152', NULL),
(7, 'Hospital Materno Infantil Presidente Vargas', 'Hospital', 'Público', '3289-3000', 'http://www.portoalegre.rs.gov.br/hmipv/', '-30.0296398', '-51.2156198', 'Av. Independência, n° 661'),
(8, 'Hospital Banco de olhos', 'Hospital', 'Público|Privado', '3347-2122', 'http://www.hospitalbancodeolhos.org.br/', '-30.0220263', '-51.1538171', 'Rua Eng. Walter Boehl, 285'),
(9, 'Hospital Beneficiência Portuguesa', 'Hospital', 'Privado', '3023-9000', 'http://beneficenciaportuguesa.org.br/', '-30.0293574', '-51.2189892', 'Independência, 270'),
(10, 'Hospital Espírita', 'Hospital', 'Privado', '3318-5700', 'http://www.hepa.org.br/br', '-30.0864569', '-51.2069831', 'Praça Simões Lopes Neto, 175'),
(11, 'Instituto de cardiologia', 'Hospital', 'Públio|Privado', '3230-3600 ', 'http://www.cardnet.tche.br/', '-30.0487431', '-51.2087834', 'Avenida Princesa Isabel, 395'),
(12, 'Hospital Parque Belém', 'Hospital', 'Privado', '3318-4555', 'http://www.hospitalparquebelem.com.br/site/', '-30.1077549', '-51.1733413', 'Avenida Professor Oscar Pereira, 8.300'),
(13, 'Hospital Psiquiátrico São Pedro', 'Hospital', 'Público', '3339-2111', 'http://www.saude.rs.gov.br/hospitais/hospital_sao_pedro.php', '-30.0610072', '-51.1900253', 'Avenida Bento Gonçalves, 2.460'),
(14, 'Hospital Sanatório Partenon', 'Hospital', 'Público', '3336-5200', 'http://www.saude.rs.gov.br/conteudo/639/?Hospital_Sanat%C3%B3rio_Partenon_(HSP)', '-30.0645438', '-51.1831167', 'Avenida Bento Gonçalves, 3.222'),
(15, 'Hospital Santa Rita', 'Hospital', 'Público|Privado', '3224-7733 ', 'http://www.santacasa.tche.br/santa-rita', '-30.0310895', '-51.2197695', 'Rua Sarmento Leite, 187'),
(16, 'Hospital Vila Nova', 'Hospital', 'Público|Privado', '3246-5022', 'http://institucionalhospitalvilanova.blogspot.com.br', '-30.119043', '-51.207252', 'Rua Catarino Andreatta, 155'),
(17, 'Hospital Conceição', 'Hospital', 'Púublico', '3357-2000', 'http://www.ghc.com.br/default.asp?idmenu=unidades_hnsc', '-30.0173077', '-51.159092', 'Av, Francisco Trein, 596 '),
(18, 'Hospital Fêmina', 'Hospital', 'Público', '3311-9898', 'http://www.femina.com.br', '-30.0289203', '-51.2073632', 'Rua Mostardeiro, 17'),
(19, 'Hospital Divina Providência', 'Hospital', 'Privado', '3320-6000', 'http://www.divinaprovidencia.org.br', '-30.0847556', '-51.1893695', 'Rua da Gruta, 145'),
(20, 'Pronto Atendimento Cruzeiro do Sul', 'PA', 'Público', '3289-4016', NULL, '-30.0701159', '-51.2164781', 'Rua Professor Manoel Lobato, 151 - Santa Tereza'),
(21, 'Centro de Saúde Bom Jesus', 'CS', 'Público', '3338-5388', NULL, '-30.0434226', '-51.1538356', 'Rua Bom Jesus, 410 - Bom Jesus'),
(22, 'Pronto Atendimento Lomba do Pinheiro', 'PA', 'Público', NULL, NULL, '-30.0889648', '-51.1323598', 'Est João de Oliveira Remião, 5.120 Lomba do Pinheiro'),
(23, 'Pronto Atendimento Restinga', 'PA', 'Público', '3250-1411', NULL, '-30.1487762', '-51.1452578', 'Rua Álvaro Difini, sn'),
(24, 'Unidade de Pronto Atendimento Moacyr Scliar', 'PA', 'Público', '3368-1619', NULL, '-30.010184', '-51.146085', 'Avenida Assis Brasil, 3968-4100 - Passo D''areia'),
(25, 'UBS Santa Cecília', 'UBS', 'Público', '3331-4058', NULL, '-30.0386517', '-51.2050017', 'R. São Manoel, 543'),
(26, 'UBS Chácara da Fumaça', 'UBS', 'Público', '3386-1166', NULL, '-30.0306417', '-51.1124323', 'Estrada Martim Félix Berta, 2.432 - Rubem Berta'),
(27, 'UBS Morro Santana', 'UBS', 'Público', '3387-8838', NULL, '-30.038599', '-51.126939', 'Rua Marieta Menna Barreto, 210 - Morro Santana'),
(28, 'ESF  Beco dos Coqueiros', 'ESF', 'Público', '3340-2267', 'http://www2.portoalegre.rs.gov.br/sms/default.php?reg=1&p_secao=838', '-30.0228972', '-51.1229096', 'Rua Jardim Vitória, 35 - Passo das Pedras'),
(29, 'ESF  Esperança Cordeiro', 'ESF', 'Público', '3368-8041', 'http://www2.portoalegre.rs.gov.br/sms/default.php?reg=20&p_secao=838', '-30.0080778', '-51.1232599', 'Avenida Homero Guerreiro, 553 - Sarandi'),
(30, 'Centro de Saúde IAPI', 'CS', 'Público', '3289-3400', 'http://www2.portoalegre.rs.gov.br/sms/default.php?reg=3&p_secao=840', '-30.0146979', '-51.1782322', 'Rua Três de Abril, 90 - Passo D''areia'),
(31, 'Centro de Saúde Modelo', 'CS', 'Público', '3289-2555', 'http://www2.portoalegre.rs.gov.br/sms/default.php?reg=4&p_secao=834', '-30.0431841', '-51.2140614', 'Avenida Jerônimo de Ornelas, 55 - Santana'),
(32, 'Centro de Saúde Santa Marta', 'AEM', 'Público', '3228-2670', 'http://www2.portoalegre.rs.gov.br/sms/default.php?reg=5&p_secao=834', '-30.0294961', '-51.2318332', 'Rua Capitão Montanha, 27 - Centro Historico'),
(33, 'Centro de Atenção Psicossocial - Casa Harmonia', 'AEM', 'Público', '3289-2692', 'http://www2.portoalegre.rs.gov.br/sms/default.php?reg=2&p_secao=834', '-30.0352938', '-51.222668', 'Avenida Loureiro da Silva, 1995 - Cidade Baixa'),
(34, 'Serviço de Doenças Renais', 'AEC', 'Público', '3246-7670', NULL, '-30.1190335', '-51.2071668', 'Rua Catarino Andreata, 155 - Vila Nova'),
(35, 'Centro de Fisioterapia Ltda', 'AEC', 'Público', '3228-3292', '', '-30.0264511', '-51.2225319', 'Praça Osvaldo Cruz, 15 - salas 1206 e 1209 - Centro');

-- --------------------------------------------------------

--
-- Table structure for table `tb_estab_convenio`
--

CREATE TABLE IF NOT EXISTS `tb_estab_convenio` (
  `tb_estabelecimento_cod_estab` int(10) unsigned NOT NULL,
  `tb_convenio_cod_convenio` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`tb_estabelecimento_cod_estab`,`tb_convenio_cod_convenio`),
  KEY `tb_estabelecimento_has_tb_convenio_FKIndex1` (`tb_estabelecimento_cod_estab`),
  KEY `tb_estabelecimento_has_tb_convenio_FKIndex2` (`tb_convenio_cod_convenio`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_estab_convenio`
--


-- --------------------------------------------------------

--
-- Table structure for table `tb_estab_espec`
--

CREATE TABLE IF NOT EXISTS `tb_estab_espec` (
  `tb_estabelecimento_cod_estab` int(10) unsigned NOT NULL,
  `tb_especialidades_cod_especialidade` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`tb_estabelecimento_cod_estab`,`tb_especialidades_cod_especialidade`),
  KEY `tb_estabelecimento_has_tb_especialidades_FKIndex1` (`tb_estabelecimento_cod_estab`),
  KEY `tb_estabelecimento_has_tb_especialidades_FKIndex2` (`tb_especialidades_cod_especialidade`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_estab_espec`
--

INSERT INTO `tb_estab_espec` (`tb_estabelecimento_cod_estab`, `tb_especialidades_cod_especialidade`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(9, 1),
(12, 1),
(19, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_tipo`
--

CREATE TABLE IF NOT EXISTS `tb_tipo` (
  `cod_estab` int(10) unsigned NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `decricao` varchar(100) default NULL,
  UNIQUE KEY `cod_estab` (`cod_estab`,`tipo`),
  KEY `tipo` (`tipo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_tipo`
--

INSERT INTO `tb_tipo` (`cod_estab`, `tipo`, `decricao`) VALUES
(7, 'PA', NULL),
(1, 'PA', NULL),
(6, 'PA', NULL),
(17, 'PA', NULL),
(3, 'PA', NULL),
(18, 'PA', NULL),
(5, 'PA', NULL),
(12, 'PA', NULL),
(4, 'PA', NULL),
(20, 'PA', NULL),
(21, 'PA', NULL),
(22, 'PA', NULL),
(23, 'PA', NULL),
(24, 'PA', NULL),
(1, 'HOSP', NULL),
(2, 'HOSP', NULL),
(3, 'HOSP', NULL),
(4, 'HOSP', NULL),
(5, 'HOSP', NULL),
(6, 'HOSP', NULL),
(7, 'HOSP', NULL),
(8, 'HOSP', NULL),
(9, 'HOSP', NULL),
(10, 'HOSP', NULL),
(11, 'HOSP', NULL),
(12, 'HOSP', NULL),
(13, 'HOSP', NULL),
(14, 'HOSP', NULL),
(15, 'HOSP', NULL),
(16, 'HOSP', NULL),
(17, 'HOSP', NULL),
(18, 'HOSP', NULL),
(19, 'HOSP', NULL),
(25, 'UBS', NULL),
(26, 'UBS', NULL),
(27, 'UBS', NULL),
(28, 'ESF', NULL),
(29, 'ESF', NULL),
(30, 'CS', NULL),
(31, 'CS', NULL),
(32, 'AEM', NULL),
(33, 'AEM', NULL),
(34, 'AEC', NULL),
(35, 'AEC', NULL);

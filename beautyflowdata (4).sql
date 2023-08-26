-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Tempo de geração: 26/08/2023 às 20:53
-- Versão do servidor: 8.0.33
-- Versão do PHP: 8.1.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `beautyflowdata`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agenda`
--

CREATE TABLE `agenda` (
  `age_codigo` int NOT NULL,
  `age_horario` datetime DEFAULT NULL,
  `age_horarioTermino` datetime NOT NULL,
  `usu_codigo` int NOT NULL,
  `cli_codigo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `agenda`
--

INSERT INTO `agenda` (`age_codigo`, `age_horario`, `age_horarioTermino`, `usu_codigo`, `cli_codigo`) VALUES
(1, '2000-02-02 00:00:00', '2000-03-02 00:00:00', 1, 1),
(22, '2023-08-30 12:00:00', '2023-08-30 15:00:00', 3, 3),
(28, '2023-08-30 10:09:00', '2023-08-30 12:00:00', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `agenda_servico`
--

CREATE TABLE `agenda_servico` (
  `age_codigo` int NOT NULL,
  `ser_codigo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `agenda_servico`
--

INSERT INTO `agenda_servico` (`age_codigo`, `ser_codigo`) VALUES
(28, 8);

-- --------------------------------------------------------

--
-- Estrutura para tabela `cliente`
--

CREATE TABLE `cliente` (
  `cli_codigo` int NOT NULL,
  `cli_nome` varchar(45) DEFAULT NULL,
  `cli_telefone` varchar(14) DEFAULT NULL,
  `usu_codigo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `cliente`
--

INSERT INTO `cliente` (`cli_codigo`, `cli_nome`, `cli_telefone`, `usu_codigo`) VALUES
(1, 'Arthur', '(12)40821-4981', 1),
(2, 'Pedro', '(14)15918-2933', 1),
(3, 'Isabela', '(21)41245-1241', 3),
(4, 'Arthur', '(21)40912-0491', 3),
(5, 'Fabio', '(55)55555-4536', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `despesa`
--

CREATE TABLE `despesa` (
  `des_codigo` int NOT NULL,
  `des_descricao` varchar(45) DEFAULT NULL,
  `des_valor` double DEFAULT NULL,
  `des_data` varchar(45) DEFAULT NULL,
  `usu_codigo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `despesa`
--

INSERT INTO `despesa` (`des_codigo`, `des_descricao`, `des_valor`, `des_data`, `usu_codigo`) VALUES
(1, 'Agua', 30, '2023-08-17', 1),
(2, 'Energia', 304, '2023-08-18', 1),
(3, 'Batata', 10.2, '2023-08-18', 1),
(4, 'Tintas', 4560, '2024-02-28', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `pro_codigo` int NOT NULL,
  `pro_nome` varchar(45) DEFAULT NULL,
  `pro_categoria` varchar(25) DEFAULT NULL,
  `pro_preco` double DEFAULT NULL,
  `pro_quantidade` int DEFAULT NULL,
  `pro_descricao` varchar(90) DEFAULT NULL,
  `usu_codigo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `servico`
--

CREATE TABLE `servico` (
  `ser_codigo` int NOT NULL,
  `ser_nome` varchar(90) DEFAULT NULL,
  `ser_preco` double DEFAULT NULL,
  `ser_descricao` varchar(255) DEFAULT NULL,
  `usu_codigo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `servico`
--

INSERT INTO `servico` (`ser_codigo`, `ser_nome`, `ser_preco`, `ser_descricao`, `usu_codigo`) VALUES
(3, 'Pintura', 123, 'Printura', 1),
(4, 'Corte de cabelo', 20, 'corte', 1),
(7, 'A', 23, 'A', 1),
(8, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 1, '1', 1),
(9, 'Corte de cabelo', 123, '1', 3),
(10, 'Unha', 10.5, 'Unha', 1),
(11, 'Unhas', 10.6, '1', 1),
(12, 'Luzes', 200.4, 'Luzes\n', 1),
(13, 'T', 10, 'a', 1),
(14, 'Batata', 124, 'a', 1),
(15, 'ba', 523, 'a', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `usu_codigo` int NOT NULL,
  `usu_nomeSalao` varchar(45) NOT NULL,
  `usu_nome` varchar(45) DEFAULT NULL,
  `usu_email` varchar(55) DEFAULT NULL,
  `usu_senha` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`usu_codigo`, `usu_nomeSalao`, `usu_nome`, `usu_email`, `usu_senha`) VALUES
(1, 'AAA', 'Arthur', 'zenaboa7@gmail.com', '$2b$10$1KTBkeuoYoUOMAfHRnOF8OzqGdZpam9Zk9KFQiv1ngsRpEySZadky'),
(2, 'jhowCortes', 'Jhowzzin', 'jhowziin@gmail.com', '$2b$10$/2QH736ZjWZyg.QXH5Tsmu9Wha10Hi1W432g6XUrZqhcycsc672.K'),
(3, '123', 'arthur', 'arthur@gmail.com', '$2b$10$kEyeVUtqYzS2IFHw6oOVpOngQk5sJwxj4GaX33VZdBo2Rs61QNzES');

-- --------------------------------------------------------

--
-- Estrutura para tabela `venda`
--

CREATE TABLE `venda` (
  `ven_codigo` int NOT NULL,
  `cli_codigo` int NOT NULL,
  `usu_codigo` int NOT NULL,
  `ven_data` date NOT NULL,
  `ven_valorTotal` double DEFAULT NULL,
  `ven_formaPagamento` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `venda`
--

INSERT INTO `venda` (`ven_codigo`, `cli_codigo`, `usu_codigo`, `ven_data`, `ven_valorTotal`, `ven_formaPagamento`) VALUES
(1, 1, 1, '2023-07-26', 143, 'cartao'),
(2, 1, 1, '2023-07-26', 143, 'cartao'),
(3, 1, 1, '2023-07-26', 143, 'cartao'),
(4, 1, 1, '2023-07-26', 143, 'cartao'),
(5, 1, 1, '2023-07-26', 143, 'cartao'),
(6, 1, 1, '2023-07-26', 143, 'cartao'),
(7, 1, 1, '2023-07-26', 143, 'cartao'),
(8, 1, 1, '2023-07-26', 143, 'cartao'),
(9, 1, 1, '2023-07-26', 143, 'cartao'),
(10, 1, 1, '2023-07-26', 143, 'dinheiro'),
(11, 1, 1, '2023-07-26', 0, 'pix'),
(12, 2, 1, '2023-07-26', 143, 'pix'),
(13, 1, 1, '2023-07-26', 143, 'dinheiro'),
(14, 1, 1, '2023-07-26', 123, 'pix'),
(15, 1, 1, '2023-07-26', 20, 'pix'),
(16, 1, 1, '2023-07-26', 20, 'pix'),
(17, 1, 1, '2023-07-26', 20, 'dinheiro'),
(18, 1, 1, '2023-07-26', 143, 'outros'),
(19, 1, 1, '2023-07-26', 20, 'dinheiro'),
(20, 1, 1, '2023-07-26', 20, 'dinheiro'),
(21, 2, 1, '2023-07-26', 123, 'dinheiro'),
(22, 1, 1, '2023-07-30', 156, 'dinheiro'),
(23, 1, 1, '2023-07-30', 20, 'outros'),
(24, 1, 1, '2023-06-23', 210, 'cartao'),
(25, 1, 1, '2023-05-23', 210, 'cartao'),
(26, 1, 1, '2023-06-23', 210, 'cartao'),
(27, 1, 1, '2023-02-23', 210, 'cartao'),
(28, 1, 1, '2023-02-23', 210, 'cartao'),
(29, 1, 1, '2023-06-23', 210, 'cartao'),
(30, 1, 1, '2023-05-23', 210, 'cartao'),
(31, 1, 1, '2023-06-23', 210, 'cartao'),
(32, 1, 1, '2023-02-23', 210, 'cartao'),
(33, 1, 1, '2023-02-23', 210, 'cartao'),
(34, 1, 1, '2023-08-02', 1, 'cartao'),
(35, 1, 1, '2023-08-03', 20, 'cartao'),
(36, 1, 1, '2023-08-03', 1124, 'dinheiro'),
(37, 4, 3, '2023-08-19', 133, 'pix'),
(38, 2, 1, '2023-08-19', 166, 'dinheiro'),
(39, 2, 1, '2023-08-19', 20, 'outros'),
(40, 1, 1, '2023-08-19', 20, 'outros'),
(41, 1, 1, '2023-08-19', 10.6, 'outros'),
(42, 1, 1, '2023-08-19', 34.95, 'dinheiro'),
(43, 2, 1, '2023-08-25', 10265.5, 'dinheiro'),
(44, 1, 1, '2023-08-25', 23, 'pix'),
(45, 1, 1, '2023-08-25', 23, 'pix'),
(46, 1, 1, '2022-06-20', 200.5, 'dinheiro'),
(47, 1, 1, '2022-06-20', 200.5, 'dinheiro'),
(48, 1, 1, '2022-06-20', 200.5, 'dinheiro'),
(49, 1, 1, '2022-06-20', 200.5, 'dinheiro'),
(50, 1, 1, '2022-06-20', 200.5, 'dinheiro'),
(51, 1, 1, '2022-06-20', 200.5, 'dinheiro'),
(52, 1, 1, '2022-06-20', 200.5, 'dinheiro'),
(53, 1, 1, '2022-06-20', 200.5, 'dinheiro'),
(54, 1, 1, '2022-06-20', 200.5, 'dinheiro');

-- --------------------------------------------------------

--
-- Estrutura para tabela `venda_servico`
--

CREATE TABLE `venda_servico` (
  `ven_codigo` int NOT NULL,
  `ser_codigo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `venda_servico`
--

INSERT INTO `venda_servico` (`ven_codigo`, `ser_codigo`) VALUES
(12, 3),
(12, 4),
(13, 3),
(13, 4),
(14, 3),
(15, 4),
(16, 4),
(17, 4),
(18, 3),
(18, 4),
(19, 4),
(20, 4),
(21, 3),
(22, 3),
(22, 4),
(22, 7),
(23, 4),
(24, 3),
(24, 4),
(25, 3),
(26, 4),
(27, 4),
(28, 3),
(29, 3),
(30, 3),
(30, 4),
(31, 3),
(34, 8),
(35, 4),
(36, 3),
(36, 8),
(37, 9),
(38, 3),
(38, 4),
(38, 7),
(39, 4),
(40, 4),
(41, 11),
(42, 7),
(42, 11),
(43, 4),
(43, 7),
(43, 8),
(43, 10),
(43, 11),
(43, 12),
(44, 7),
(45, 7),
(46, 4),
(47, 3),
(48, 3),
(49, 8),
(50, 4),
(51, 4),
(52, 4),
(53, 7),
(54, 7);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`age_codigo`),
  ADD KEY `fk_agenda_usuario2_idx` (`usu_codigo`),
  ADD KEY `fk_agenda_cliente1_idx` (`cli_codigo`);

--
-- Índices de tabela `agenda_servico`
--
ALTER TABLE `agenda_servico`
  ADD PRIMARY KEY (`age_codigo`,`ser_codigo`),
  ADD KEY `fk_agenda_has_servico_servico1_idx` (`ser_codigo`),
  ADD KEY `fk_agenda_has_servico_agenda1_idx` (`age_codigo`);

--
-- Índices de tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`cli_codigo`),
  ADD KEY `fk_cliente_usuario_idx` (`usu_codigo`);

--
-- Índices de tabela `despesa`
--
ALTER TABLE `despesa`
  ADD PRIMARY KEY (`des_codigo`),
  ADD KEY `fk_despesa_usuario1_idx` (`usu_codigo`);

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`pro_codigo`),
  ADD KEY `fk_produto_usuario1_idx` (`usu_codigo`);

--
-- Índices de tabela `servico`
--
ALTER TABLE `servico`
  ADD PRIMARY KEY (`ser_codigo`),
  ADD KEY `fk_servico_usuario1_idx` (`usu_codigo`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usu_codigo`);

--
-- Índices de tabela `venda`
--
ALTER TABLE `venda`
  ADD PRIMARY KEY (`ven_codigo`),
  ADD KEY `fk_cliente_has_servico_cliente1_idx` (`cli_codigo`),
  ADD KEY `fk_agenda_usuario1_idx` (`usu_codigo`);

--
-- Índices de tabela `venda_servico`
--
ALTER TABLE `venda_servico`
  ADD PRIMARY KEY (`ser_codigo`,`ven_codigo`),
  ADD KEY `ven_codigo` (`ven_codigo`),
  ADD KEY `ser_codigo` (`ser_codigo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agenda`
--
ALTER TABLE `agenda`
  MODIFY `age_codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `cli_codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `despesa`
--
ALTER TABLE `despesa`
  MODIFY `des_codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `pro_codigo` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `servico`
--
ALTER TABLE `servico`
  MODIFY `ser_codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usu_codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `venda`
--
ALTER TABLE `venda`
  MODIFY `ven_codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `fk_agenda_cliente1` FOREIGN KEY (`cli_codigo`) REFERENCES `cliente` (`cli_codigo`),
  ADD CONSTRAINT `fk_agenda_usuario2` FOREIGN KEY (`usu_codigo`) REFERENCES `usuario` (`usu_codigo`);

--
-- Restrições para tabelas `agenda_servico`
--
ALTER TABLE `agenda_servico`
  ADD CONSTRAINT `fk_agenda_has_servico_agenda1` FOREIGN KEY (`age_codigo`) REFERENCES `agenda` (`age_codigo`),
  ADD CONSTRAINT `fk_agenda_has_servico_servico1` FOREIGN KEY (`ser_codigo`) REFERENCES `servico` (`ser_codigo`);

--
-- Restrições para tabelas `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_cliente_usuario` FOREIGN KEY (`usu_codigo`) REFERENCES `usuario` (`usu_codigo`);

--
-- Restrições para tabelas `despesa`
--
ALTER TABLE `despesa`
  ADD CONSTRAINT `fk_despesa_usuario1` FOREIGN KEY (`usu_codigo`) REFERENCES `usuario` (`usu_codigo`);

--
-- Restrições para tabelas `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `fk_produto_usuario1` FOREIGN KEY (`usu_codigo`) REFERENCES `usuario` (`usu_codigo`);

--
-- Restrições para tabelas `servico`
--
ALTER TABLE `servico`
  ADD CONSTRAINT `fk_servico_usuario1` FOREIGN KEY (`usu_codigo`) REFERENCES `usuario` (`usu_codigo`);

--
-- Restrições para tabelas `venda`
--
ALTER TABLE `venda`
  ADD CONSTRAINT `fk_agenda_usuario1` FOREIGN KEY (`usu_codigo`) REFERENCES `usuario` (`usu_codigo`),
  ADD CONSTRAINT `fk_cliente_has_servico_cliente1` FOREIGN KEY (`cli_codigo`) REFERENCES `cliente` (`cli_codigo`);

--
-- Restrições para tabelas `venda_servico`
--
ALTER TABLE `venda_servico`
  ADD CONSTRAINT `venda_servico_ibfk_1` FOREIGN KEY (`ser_codigo`) REFERENCES `servico` (`ser_codigo`),
  ADD CONSTRAINT `venda_servico_ibfk_2` FOREIGN KEY (`ven_codigo`) REFERENCES `venda` (`ven_codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

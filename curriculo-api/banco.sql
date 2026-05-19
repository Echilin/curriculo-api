-- RODE ISSO NO SQL EDITOR DO NEONDB

CREATE TABLE pessoas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  telefone VARCHAR(20),
  linkedin VARCHAR(100),
  resumo TEXT
);

CREATE TABLE experiencias (
  id SERIAL PRIMARY KEY,
  pessoa_id INT REFERENCES pessoas(id) ON DELETE CASCADE,
  empresa VARCHAR(100),
  cargo VARCHAR(100),
  inicio DATE,
  fim DATE,
  descricao TEXT
);

CREATE TABLE formacoes (
  id SERIAL PRIMARY KEY,
  pessoa_id INT REFERENCES pessoas(id) ON DELETE CASCADE,
  instituicao VARCHAR(100),
  curso VARCHAR(100),
  nivel VARCHAR(50),
  inicio DATE,
  fim DATE
);

CREATE TABLE habilidades (
  id SERIAL PRIMARY KEY,
  pessoa_id INT REFERENCES pessoas(id) ON DELETE CASCADE,
  nome VARCHAR(100),
  nivel VARCHAR(50)
);

-- Pessoa 1
INSERT INTO pessoas(nome,email,telefone,linkedin,resumo) VALUES
('Ana Silva','ana@email.com','81999990001','linkedin.com/in/ana','Desenvolvedora fullstack com 3 anos de experiência.');

-- Pessoa 2
INSERT INTO pessoas(nome,email,telefone,linkedin,resumo) VALUES
('Carlos Souza','carlos@email.com','81999990002','linkedin.com/in/carlos','Engenheiro de software focado em backend e cloud.');

-- Experiências
INSERT INTO experiencias(pessoa_id,empresa,cargo,inicio,fim,descricao) VALUES
(1,'TechCorp','Dev Frontend','2021-01-01','2023-06-01','Desenvolveu interfaces React.'),
(2,'CloudSys','Backend Dev','2020-03-01',NULL,'Atua com APIs em Node e AWS.');

-- Formações
INSERT INTO formacoes(pessoa_id,instituicao,curso,nivel,inicio,fim) VALUES
(1,'UFPE','Sistemas de Informação','Graduação','2017-01-01','2021-12-01'),
(2,'CESAR School','Engenharia de Software','Graduação','2016-01-01','2020-12-01');

-- Habilidades
INSERT INTO habilidades(pessoa_id,nome,nivel) VALUES
(1,'React','Avançado'),
(1,'Node.js','Intermediário'),
(2,'Node.js','Avançado'),
(2,'AWS','Intermediário');

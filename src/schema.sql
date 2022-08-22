--CREATE DATABASE [[<dbname>]];

CREATE TABLE IF NOT EXISTS alunos (
	ID SERIAL PRIMARY KEY,
  	nome TEXT,
  	situacao TEXT,
  	observacao TEXT,
  	serie INTEGER,
  	turma TEXT,
	modalidade TEXT  
);

CREATE TABLE IF NOT EXISTS admin (
  ID SERIAL PRIMARY KEY,
  	nome TEXT NOT NULL,
  	email TEXT NOT NULL UNIQUE,
    cargo TEXT NOT NULL,
  	senha TEXT NOT NULL
);

ALTER TABLE alunos
ADD COLUMN turno TEXT NOT NULL 
CHECK(turno IN ('matutino', 'vespertino', 'noturno'));

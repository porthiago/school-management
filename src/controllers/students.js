const express = require('express');
const knex = require('../config/connection');

const index = async (req, res) => {
  const { serie, situacao, modalidade, nome, id } = req.query;

  try {
    if (serie) {
      const students = await knex('alunos')
        .where('serie', serie)
        .select('*')
        .orderBy('serie')
        .orderBy('nome');

      if (students.length === 0) {
        return res.status(404).json({ message: 'Nenhum aluno encontrado' });
      }

      if (situacao) {
        const students = await knex('alunos')
          .where('serie', serie)
          .whereILike('situacao', situacao)
          .select('*')
          .orderBy('nome');

        if (students.length === 0) {
          return res.status(404).json({ message: 'Nenhum aluno encontrado' });
        }

        return res.json({ alunos: students, total: students.length });
      }

      return res.json({ alunos: students, total: students.length });
    }

    if (modalidade && !serie) {
      if (situacao) {
        const students = await knex('alunos')
          .whereILike('modalidade', modalidade)
          .whereILike('situacao', situacao)
          .select('*')
          .orderBy('serie')
          .orderBy('nome');

        if (students.length === 0) {
          return res.status(404).json({ message: 'Nenhum aluno encontrado' });
        }

        return res.json({ alunos: students, total: students.length });
      }

      const students = await knex('alunos')
        .whereILike('modalidade', modalidade)
        .select('*')
        .orderBy('serie')
        .orderBy('nome');
      if (students.length === 0) {
        return res.status(404).json({ message: 'Nenhum aluno encontrado' });
      }

      return res.json({ alunos: students, total: students.length });
    }

    if (situacao) {
      const students = await knex('alunos')
        .whereILike('situacao', situacao)
        .select('*')
        .orderBy('serie')
        .orderBy('nome');
      if (students.length === 0) {
        return res.status(404).json({ message: 'Nenhum aluno encontrado' });
      }

      return res.json({ alunos: students, total: students.length });
    }

    const students = await knex('alunos')
      .select('*')
      .orderBy('serie')
      .orderBy('nome');

    if (students.length === 0) {
      return res.status(404).json({ message: 'Nenhum aluno encontrado' });
    }

    if (nome || id) {
      const students = await knex('alunos')
        .whereILike('nome', nome)
        .select('*')
        .orderBy('serie')
        .orderBy('nome');
      if (students.length === 0) {
        return res.status(404).json({ message: 'Nenhum aluno encontrado' });
      }
      console.log(id);

      if (id) {
        const students = await knex('alunos')
          .where('id', id)
          .select('*')
          .orderBy('serie')
          .orderBy('nome');
        if (students.length === 0) {
          return res.status(404).json({ message: 'Nenhum aluno encontrado' });
        }
      }

      return res.json({ alunos: students, total: students.length });
    }

    return res.json({ alunos: students, total: students.length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  const { nome, situacao, observacao, serie, turma, modalidade } = req.body;

  const knexInsert = await knex('alunos')
    .insert({ nome, situacao, observacao, serie, turma, modalidade })
    .returning('*');

  return res.json(knexInsert);
};

module.exports = {
  index,
  create
};

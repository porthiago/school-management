const express = require('express');
const knex = require('../config/connection');
const { studentsSchema } = require('../validations/studentsSchema');

const index = async (req, res) => {
  let { serie, situacao, modalidade, nome, id, turma } = req.query;

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

      if (turma) {
        const students = await knex('alunos')
          .where('serie', serie)
          .whereILike('turma', turma)
          .select('*')
          .orderBy('serie')
          .orderBy('nome');

        if (students.length === 0) {
          return res.status(404).json({ message: 'Nenhum aluno encontrado' });
        }

        if (situacao) {
          const currentStudents = [];

          for (const student of students) {
            if (student.situacao.toUpperCase() === situacao.toUpperCase()) {
              currentStudents.push(student);
            }
          }

          if (currentStudents.length === 0) {
            return res
              .status(404)
              .json({ messagem: 'Nenhum aluno encontrado' });
          }

          return res.json({
            alunos: currentStudents,
            total: currentStudents.length
          });
        }

        return res.json({ alunos: students, total: students.length });
      }

      if (situacao) {
        const students = await knex('alunos')
          .where('serie', serie)
          .whereILike('situacao', situacao)
          .select('*')
          .orderBy('nome');

        if (students.length === 0) {
          return res.status(404).json({ messagem: 'Nenhum aluno encontrado' });
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
    return res.status(500).json({ messagem: error.message });
  }
};

const create = async (req, res) => {
  const { nome, situacao, observacao, serie, turma, modalidade } = req.body;

  try {
    await studentsSchema.validate(req.body);

    const studentData = await knex('alunos')
      .insert({ nome, situacao, observacao, serie, turma, modalidade })
      .returning('*');

    if (studentData.length === 0) {
      return res.status(400).json({
        message: 'Ocorreu um erro ao inserir o aluno no banco de dados.'
      });
    }

    return res.json({
      messagem: 'Aluno Cadastrado com Sucesso.',
      aluno: studentData[0]
    });
  } catch (error) {
    return res.status(500).json({ messagem: error.message });
  }
};

const update = async (req, res) => {
  const { nome, situacao, observacao, serie, turma, modalidade } = req.body;
  const { id } = req.params;
  try {
    await studentsSchema.validate(req.body);

    const student = await knex('alunos').where('id', id);

    if (student.length === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    const students = await knex('alunos');

    if (nome !== student[0].nome) {
      for (const student of students) {
        if (student.nome === nome) {
          return res
            .status(400)
            .json({ message: `Aluno já cadastrado para o id ${student.id}.` });
        }
      }
    }

    const studentData = await knex('alunos')
      .where('id', id)
      .update({ nome, situacao, observacao, serie, turma, modalidade })
      .returning('*');

    if (studentData.length === 0) {
      return res.status(400).json({
        message: 'Ocorreu um erro ao atualizar o aluno no banco de dados.'
      });
    }

    return res.json({
      messagem: 'Aluno Atualizado com Sucesso.',
      aluno: studentData[0]
    });
  } catch (error) {
    return res.status(500).json({ messagem: error.message });
  }
};

module.exports = {
  index,
  create,
  update
};

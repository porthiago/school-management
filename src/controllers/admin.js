const knex = require('../config/connection');
const bcrypt = require('bcrypt');
const { adminSchema } = require('../validations/adminSchema');

const create = async (req, res) => {
  const { nome, email, cargo, senha } = req.body;

  try {
    await adminSchema.validate(req.body);

    const admin = await knex('admin').where('email', email).first();

    if (admin) {
      return res.status(401).json({ messagem: 'Email já cadastrado!' });
    }

    const hash = await bcrypt.hash(senha, 10);

    const createdAdmin = await knex('admin')
      .insert({
        nome,
        email,
        cargo,
        senha: hash
      })
      .returning('*');

    return res.json({
      messagem: 'Usuário cadastrado com sucesso',
      administrador: createdAdmin
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { create };

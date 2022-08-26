const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../config/connection');

const login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await knex('admin').where('email', email).first();

  if (!user) {
    return res.status(401).json({ message: 'Email ou senha inválida!' });
  }
  const isPasswordValid = await bcrypt.compare(senha, user.senha);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Email ou senha inválida' });
  }
  const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '8h' });

  const { senha: __, ...userData } = user;

  return res.json({ userData, token });
};

module.exports = { login };

require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ messagem: 'Token não encontrado!' });
    }

    const token = authorization.replace('Bearer ', '').trim();

    if (!token) {
      return res.status(401).json({ message: 'Nenhum token fornecido' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.status(500).json({ messagem: error.message });
  }
};

module.exports = verifyToken;

const express = require('express');
const students = require('../controllers/students');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

router.use(verifyToken);

router.get('/', students.index);
router.post('/', students.create);
router.put('/:id', students.update);

module.exports = router;

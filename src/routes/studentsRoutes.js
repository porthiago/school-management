const express = require('express');
const students = require('../controllers/students');

const router = express.Router();

router.get('/', students.index);
router.post('/', students.create);

module.exports = router;


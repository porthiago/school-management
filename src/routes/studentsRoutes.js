const express = require('express');
const students = require('../controllers/students');

const router = express.Router();

router.get('/', students.create);

module.exports = router;


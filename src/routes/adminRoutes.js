const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');
const verifyToken = require('../middlewares/auth');

router.use(verifyToken);

router.post('/', admin.create);

module.exports = router;

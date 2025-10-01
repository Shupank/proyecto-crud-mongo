const express = require('express');
const router = express.Router();
const { create, login } = require('../controllers/userController');

// Públicas
router.post('/register', create);
router.post('/login', login);

module.exports = router;
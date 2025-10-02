// src/routes/userRoute.js

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Si después querés agregar rutas protegidas:
// router.get('/profile', verifyToken, profileController);

module.exports = router;

const express = require('express');
const router = express.Router();
const { create, getAll, getById, update, remove } = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');

// Rutas públicas: solo GET
router.get('/', getAll);
router.get('/:id', getById);

// Rutas protegidas: POST, PUT, DELETE
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);

module.exports = router;
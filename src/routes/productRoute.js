const express = require('express');
const router = express.Router();
const { create, getAll, getById, update, remove } = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', getAll);
router.get('/:id', getById);

router.post('/', verifyToken, create);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);

module.exports = router;
const categoryService = require('../services/categoryService');

const create = async (req, res) => {
  try {
    const category = await categoryService.create(req.body);
    res.status(201).json({ message: 'Categoría creada', data: category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAll();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const category = await categoryService.getById(req.params.id);
    res.status(200).json({ data: category });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const category = await categoryService.update(req.params.id, req.body);
    res.status(200).json({ message: 'Categoría actualizada', data: category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await categoryService.delete(req.params.id);
    res.status(200).json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { create, getAll, getById, update, remove };
const productService = require('../services/productService');

const create = async (req, res) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json({ message: 'Producto creado', data: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const products = await productService.getAll();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.id);
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    res.status(200).json({ message: 'Producto actualizado', data: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await productService.delete(req.params.id);
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { create, getAll, getById, update, remove };
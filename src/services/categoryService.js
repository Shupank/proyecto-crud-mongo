const Category = require('../models/categoryModel');
const AppError = require('../utils/AppError');

const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new AppError('Categoría no encontrada', 404);
  return category;
};

const createCategory = async (data) => {
  try {
    const category = new Category(data);
    return await category.save();
  } catch (err) {
    if (err.code === 11000) throw new AppError('La categoría ya existe', 400);
    throw err;
  }
};

const updateCategory = async (id, data) => {
  const updated = await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!updated) throw new AppError('Categoría no encontrada', 404);
  return updated;
};

const deleteCategory = async (id) => {
  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) throw new AppError('Categoría no encontrada', 404);
  return deleted;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};

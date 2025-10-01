const Category = require('../models/categoryModel');

class CategoryService {
  async create(data) {
    try {
      const category = new Category(data);
      return await category.save();
    } catch (error) {
      throw new Error(`Error al crear categoría: ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await Category.find();
    } catch (error) {
      throw new Error(`Error al obtener categorías: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const category = await Category.findById(id);
      if (!category) throw new Error('Categoría no encontrada');
      return category;
    } catch (error) {
      throw new Error(`Error al obtener categoría: ${error.message}`);
    }
  }

  async update(id, data) {
    try {
      const category = await Category.findByIdAndUpdate(id, data, { new: true });
      if (!category) throw new Error('Categoría no encontrada');
      return category;
    } catch (error) {
      throw new Error(`Error al actualizar categoría: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const category = await Category.findByIdAndDelete(id);
      if (!category) throw new Error('Categoría no encontrada');
      return category;
    } catch (error) {
      throw new Error(`Error al eliminar categoría: ${error.message}`);
    }
  }
}

module.exports = new CategoryService();
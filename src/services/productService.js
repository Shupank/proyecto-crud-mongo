const Product = require('../models/productModel');

class ProductService {
  async create(data) {
    try {
      const product = new Product(data);
      return await product.save();
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  async getAll() {
    try {
      return await Product.find().populate('category', 'name description');  // Populate categoría
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const product = await Product.findById(id).populate('category', 'name description');
      if (!product) throw new Error('Producto no encontrado');
      return product;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  }

  async update(id, data) {
    try {
      const product = await Product.findByIdAndUpdate(id, data, { new: true }).populate('category', 'name description');
      if (!product) throw new Error('Producto no encontrado');
      return product;
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) throw new Error('Producto no encontrado');
      return product;
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
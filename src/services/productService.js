// src/services/productService.js

const Product = require('../models/productModel');

const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
};

const getAllProducts = async () => {
    // Implementación de populate para incluir la categoría
    const products = await Product.find({})
        .populate('categoria', 'nombre descripcion') 
        .exec();
    return products;
};

const getProductById = async (id) => {
    const product = await Product.findById(id)
        .populate('categoria', 'nombre descripcion')
        .exec();
    return product;
};

const updateProduct = async (id, updateData) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
        const error = new Error('Producto no encontrado');
        error.status = 404; 
        throw error;
    }
    return updatedProduct;
};

const deleteProduct = async (id) => {
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
        const error = new Error('Producto no encontrado');
        error.status = 404;
        throw error;
    }

    return deletedProduct;
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
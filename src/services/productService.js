const Product = require('../models/productModel');

// Crear un nuevo producto
const createProduct = async (productData) => {
    try {
        const newProduct = new Product(productData);
        await newProduct.save();
        console.log('Producto creado:', newProduct);
        return newProduct;
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw new Error('Error al crear producto: ' + error.message);
    }
};

// Obtener todos los productos con populate para la categoría
const getAllProducts = async () => {
    try {
        const products = await Product.find({})
            .populate('category', 'name description') // Corregido: 'category' en lugar de 'categoria'
            .exec();
        console.log('Productos obtenidos:', products);
        return products;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw new Error('Error al obtener productos: ' + error.message);
    }
};

// Obtener un producto por ID con populate para la categoría
const getProductById = async (id) => {
    try {
        const product = await Product.findById(id)
            .populate('category', 'name description') // Corregido: 'category' en lugar de 'categoria'
            .exec();
        if (!product) {
            const error = new Error('Producto no encontrado');
            error.status = 404;
            throw error;
        }
        console.log('Producto encontrado:', product);
        return product;
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        throw error; // Propaga el error con el status si existe
    }
};

// Actualizar un producto por ID
const updateProduct = async (id, updateData) => {
    try {
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
        console.log('Producto actualizado:', updatedProduct);
        return updatedProduct;
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error;
    }
};

// Eliminar un producto por ID
const deleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            const error = new Error('Producto no encontrado');
            error.status = 404;
            throw error;
        }
        console.log('Producto eliminado:', deletedProduct);
        return deletedProduct;
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
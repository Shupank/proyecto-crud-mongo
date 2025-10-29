const productService = require('../services/productService');

// Asumimos que esta función auxiliar se importa o se define en todos los controladores
const handleMongooseError = (res, error) => {
    // ... Implementación detallada de CastError, ValidationError, Error 11000, y error.status 404
    // (Puedes copiar la función auxiliar del archivo categoryController.js)
    
    // Ejemplo simplificado para fines de este listado:
    if (error.name === 'CastError' || error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Datos o ID de producto inválido.', details: error.message });
    }
    if (error.status === 404) {
         return res.status(404).json({ message: error.message });
    }
    console.error("Error no mapeado:", error);
    return res.status(500).json({ message: 'Ocurrió un error inesperado en el servidor.' });
};

// --- CREATE (POST /api/products) ---
const createProductController = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        return res.status(201).json({
            message: 'Producto creado exitosamente',
            data: newProduct,
        });
    } catch (error) {
        handleMongooseError(res, error);
    }
};

// --- READ ALL (GET /api/products) ---
const getAllProductsController = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        handleMongooseError(res, error);
    }
};

// --- READ ONE (GET /api/products/:id) ---
const getProductByIdController = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        return res.status(200).json(product);
    } catch (error) {
        handleMongooseError(res, error);
    }
};

// --- UPDATE (PUT /api/products/:id) ---
const updateProductController = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        return res.status(200).json({
            message: 'Producto actualizado exitosamente',
            data: updatedProduct,
        });
    } catch (error) {
        handleMongooseError(res, error);
    }
};

// --- DELETE (DELETE /api/products/:id) ---
const deleteProductController = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        handleMongooseError(res, error);
    }
};

module.exports = {
    create: createProductController,
    getAll: getAllProductsController,
    getById: getProductByIdController,
    update: updateProductController,
    remove: deleteProductController,
};

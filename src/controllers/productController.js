const productService = require('../services/productService');

// --- Función auxiliar para manejo de errores de Mongoose ---
const handleMongooseError = (res, error) => {
    if (error.name === 'CastError') {
        return res.status(400).json({
            message: 'El ID de producto proporcionado no es válido.',
            details: error.message
        });
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Error de validación en los datos del producto.',
            details: error.message
        });
    }

    if (error.code === 11000) {
        return res.status(409).json({
            message: 'Ya existe un producto con los mismos datos únicos.',
            details: error.keyValue
        });
    }

    if (error.status === 404) {
        return res.status(404).json({ message: error.message });
    }

    console.error("Error no mapeado:", error);
    return res.status(500).json({
        message: 'Ocurrió un error inesperado en el servidor.',
        details: error.message
    });
};

// --- CREATE (POST /api/products) ---
const createProductController = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        return res.status(201).json({
            message: '✅ Producto creado exitosamente.',
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
            return res.status(404).json({ message: 'Producto no encontrado.' });
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

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado para actualizar.' });
        }

        return res.status(200).json({
            message: '🔄 Producto actualizado exitosamente.',
            data: updatedProduct,
        });
    } catch (error) {
        handleMongooseError(res, error);
    }
};

// --- DELETE (DELETE /api/products/:id) ---
const deleteProductController = async (req, res) => {
    try {
        const deleted = await productService.deleteProduct(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Producto no encontrado para eliminar.' });
        }

        return res.status(200).json({ message: '🗑️ Producto eliminado exitosamente.' });
    } catch (error) {
        handleMongooseError(res, error);
    }
};

// --- Exportación centralizada ---
module.exports = {
    create: createProductController,
    getAll: getAllProductsController,
    getById: getProductByIdController,
    update: updateProductController,
    remove: deleteProductController,
};

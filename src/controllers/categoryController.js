// src/controllers/categoryController.js

const categoryService = require('../services/categoryService');

// Función auxiliar para gestionar errores de Mongoose en un solo lugar
const handleMongooseError = (res, error) => {
    // 1. CastError: Formato de ID inválido (ej. 'abc' en lugar de un ObjectId)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
         return res.status(400).json({ 
             message: 'ID de categoría con formato inválido.',
             details: error.message 
         });
    }
    
    // 2. ValidationError: Campos requeridos faltantes o validadores fallidos.
    if (error.name === 'ValidationError') {
        return res.status(400).json({ 
            message: 'Error de validación de datos.',
            errors: error.errors // Mongoose incluye detalles aquí
        });
    }
    
    // 3. Error 11000: Clave duplicada (ej. el nombre de la categoría ya existe)
    if (error.code === 11000) {
        return res.status(400).json({ 
            message: 'El nombre de la categoría ya existe.',
            details: error.message 
        });
    }

    // 4. Errores lanzados por el Servicio (ej. 404 Not Found)
    if (error.status === 404) {
         return res.status(404).json({ 
             message: error.message 
         });
    }
    
    // 5. Error Genérico (500 Internal Server Error)
    console.error("Error no mapeado en el controlador:", error);
    return res.status(500).json({ 
        message: 'Ocurrió un error inesperado en el servidor.' 
    });
};


// --- CREATE (POST /api/categories) ---
const createCategoryController = async (req, res) => {
    try {
        const newCategory = await categoryService.createCategory(req.body);
        // Éxito: 201 Created
        return res.status(201).json({
            message: 'Categoría creada exitosamente',
            data: newCategory,
        });
    } catch (error) {
        handleMongooseError(res, error);
    }
};

// --- READ ALL (GET /api/categories) ---
const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        // Éxito: 200 OK
        return res.status(200).json(categories);
    } catch (error) {
        handleMongooseError(res, error);
    }
};

// --- READ ONE (GET /api/categories/:id) ---
const getCategoryByIdController = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        
        if (!category) {
            // Recurso no encontrado: 404 Not Found
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        
        // Éxito: 200 OK
        return res.status(200).json(category);
    } catch (error) {
        handleMongooseError(res, error);
    }
};

// --- UPDATE (PUT /api/categories/:id) ---
const updateCategoryController = async (req, res) => {
    try {
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
        // Éxito: 200 OK
        return res.status(200).json({
            message: 'Categoría actualizada exitosamente',
            data: updatedCategory,
        });
    } catch (error) {
        // El error 404 es manejado por handleMongooseError
        handleMongooseError(res, error);
    }
};

// --- DELETE (DELETE /api/categories/:id) ---
const deleteCategoryController = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        // Éxito: 200 OK
        return res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        // El error 404 es manejado por handleMongooseError
        handleMongooseError(res, error);
    }
};

module.exports = {
    createCategoryController,
    getAllCategoriesController,
    getCategoryByIdController,
    updateCategoryController,
    deleteCategoryController,
};
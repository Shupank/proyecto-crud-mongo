// src/services/categoryService.js

const Category = require('../models/categoryModel');

// Las funciones aquí solo reciben datos (NO req, NO res)
// Solo interactúan con la base de datos o la lógica de negocio

/**
 * Crea una nueva categoría en la base de datos.
 */
const createCategory = async (categoryData) => {
    const newCategory = new Category(categoryData);
    await newCategory.save();
    return newCategory;
};

/**
 * Obtiene todas las categorías.
 */
const getAllCategories = async () => {
    return await Category.find({});
};

/**
 * Obtiene una categoría por su ID.
 */
const getCategoryById = async (id) => {
    return await Category.findById(id);
};

/**
 * Actualiza una categoría existente.
 */
const updateCategory = async (id, updateData) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );
    
    // El servicio maneja el caso de que el documento no exista
    if (!updatedCategory) {
        // Lanzamos un error simple, el controlador se encargará de mapear el 404
        const error = new Error('Categoría no encontrada');
        error.status = 404; // Etiquetamos el error para el controlador
        throw error; 
    }
    
    return updatedCategory;
};

/**
 * Elimina una categoría por su ID.
 */
const deleteCategory = async (id) => {
    const deletedCategory = await Category.findByIdAndDelete(id);
    
    // El servicio maneja el caso de que el documento no exista
    if (!deletedCategory) {
        const error = new Error('Categoría no encontrada');
        error.status = 404;
        throw error;
    }

    return deletedCategory;
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
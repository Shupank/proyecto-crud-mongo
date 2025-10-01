// src/services/userService.js

const User = require('../models/userModel');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 

/**
 * Registra un nuevo usuario. (Asume hook pre-save en el modelo para bcrypt)
 */
const registerUser = async (userData) => {
    const newUser = new User(userData);
    
    // Mongoose lanzará el error 11000 si el email está duplicado.
    await newUser.save();
    
    const userResponse = newUser.toObject();
    delete userResponse.password; 
    return userResponse;
};

/**
 * Inicia sesión y genera un token JWT.
 */
const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).exec();
    
    // 1. Verificar existencia del usuario
    if (!user) {
        // Lanzar un error para que el controlador devuelva 401
        throw new Error('Credenciales inválidas');
    }

    // 2. Comparar la contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        // Lanzar un error para que el controlador devuelva 401
        throw new Error('Credenciales inválidas'); 
    }

    // 3. Generar el JWT
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
    
    const userResponse = user.toObject();
    delete userResponse.password;

    return { token, user: userResponse };
};

module.exports = {
    registerUser,
    loginUser,
};
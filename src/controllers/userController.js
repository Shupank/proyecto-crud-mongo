// src/controllers/userController.js

const userService = require('../services/userService');

// --- REGISTER (POST /api/users/register) ---
const registerController = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Validación inicial (400 Bad Request)
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        
        const newUser = await userService.registerUser({ nombre, email, password });
        
        // Éxito: 201 Created
        return res.status(201).json({
            message: 'Usuario creado exitosamente',
            data: newUser,
        });

    } catch (error) {
        console.error("Error en el registro:", error);
        
        // Error 11000 (Email duplicado)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El email ya está registrado.' });
        }
        
        // ValidationError (si se lanza antes del hook o por otros campos)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Error de validación de datos.',
                errors: error.errors
            });
        }

        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// --- LOGIN (POST /api/users/login) ---
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validación inicial (400 Bad Request)
        if (!email || !password) {
            return res.status(400).json({ message: 'El email y la contraseña son obligatorios' });
        }
        
        const result = await userService.loginUser(email, password);
        
        // Éxito: 200 OK con token
        return res.status(200).json({
            message: 'Login exitoso',
            token: result.token,
            user: result.user
        });

    } catch (error) {
        console.error("Error en el login:", error.message);
        
        // Si el servicio lanzó el error 'Credenciales inválidas'
        if (error.message === 'Credenciales inválidas') {
            // Fallo de Autenticación: 401 Unauthorized
            return res.status(401).json({ message: error.message });
        }
        
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    registerController,
    loginController,
};
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');

const loginUser = async (email, password) => {
  try {
    // Buscar usuario por email
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Generar JWT
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });

    // Devolver usuario sin contraseña
    const userResponse = user.toObject();
    delete userResponse.password;

    return { token, user: userResponse };

  } catch (err) {
    // Si el error ya es un AppError, lo re-lanzamos
    if (err instanceof AppError) throw err;

    // Para errores inesperados, devolvemos un 500 genérico
    throw new AppError(err.message || 'Error en login', 500);
  }
};

module.exports = { loginUser };

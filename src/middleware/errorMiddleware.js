// src/middleware/errorMiddleware.js

const AppError = require('../utils/AppError'); // Clase para errores personalizados

const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  // Si es un error personalizado de AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Errores de validación de Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  // Errores de duplicación (como email único)
  if (err.code && err.code === 11000) {
    return res.status(400).json({
      status: 'error',
      message: 'Error de duplicado: ya existe un registro con esos datos',
    });
  }

  // Cualquier otro error
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
  });
};

module.exports = errorHandler;


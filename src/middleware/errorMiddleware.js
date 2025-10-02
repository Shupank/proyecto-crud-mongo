const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
  console.error(err); // Para debug en consola

  // Si es un error personalizado (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Errores de Mongoose / MongoDB
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'fail',
      message: `ID inválido: ${err.value}`,
    });
  }

  // Error genérico
  res.status(500).json({
    status: 'error',
    message: 'Ocurrió un error en el servidor',
  });
};

module.exports = errorHandler;

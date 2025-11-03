const { registerUser, loginUser } = require('../services/userService');

// --- Función auxiliar para manejo de errores de Mongoose ---
const handleMongooseError = (res, error) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Error de validación en los datos del usuario.',
      details: error.message
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      message: 'Ya existe un usuario registrado con ese correo electrónico.',
      details: error.keyValue
    });
  }

  if (error.status === 401) {
    return res.status(401).json({ message: 'Credenciales inválidas.' });
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

// --- Registro (POST /api/users/register) ---
const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json({
      message: '✅ Usuario registrado con éxito.',
      data: user
    });
  } catch (error) {
    handleMongooseError(res, error);
  }
};

// --- Login (POST /api/users/login) ---
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);

    return res.status(200).json({
      message: '🔓 Login exitoso.',
      data
    });
  } catch (error) {
    handleMongooseError(res, error);
  }
};

// ✅ Exportar controladores
module.exports = {
  register,
  login,
};

const { registerUser, loginUser } = require('../services/userService');

// Registro
const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado con éxito', user });
  } catch (err) {
    next(err);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.status(200).json({ message: 'Login exitoso', ...data });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};

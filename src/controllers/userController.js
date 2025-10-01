const userService = require('../services/userService');

const create = async (req, res) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json({ message: 'Usuario creado', data: { id: user._id, email: user.email } });  // No envía password
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await userService.login(req.body.email, req.body.password);
    res.status(200).json({ message: 'Login exitoso', data: { user: { id: user._id, email: user.email }, token } });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { create, login };
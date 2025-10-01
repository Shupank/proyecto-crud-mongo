const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class UserService {
  async create(data) {
    try {
      const user = new User(data);
      await user.save();  // El hook pre-save hashea la password
      return user;
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Credenciales inválidas');
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { user, token };
    } catch (error) {
      throw new Error(`Error en login: ${error.message}`);
    }
  }
}

module.exports = new UserService();
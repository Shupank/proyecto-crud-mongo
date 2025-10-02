const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');

// Registrar usuario
const registerUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;
    return userResponse;
  } catch (err) {
    if (err.code === 11000) {
      throw new AppError('El email ya está registrado', 400);
    }
    throw err;
  }
};

// Login
const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const payload = { id: user._id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256'
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return { token, user: userResponse };
};

module.exports = {
  registerUser,
  loginUser,
};

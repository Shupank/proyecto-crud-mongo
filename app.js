const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorMiddleware'); // ✅ importar manejador de errores

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/categories', require('./src/routes/categoryRoute'));
app.use('/api/products', require('./src/routes/productRoute'));
app.use('/api/users', require('./src/routes/userRoute'));

// ✅ Middleware global de manejo de errores (siempre al final de las rutas)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

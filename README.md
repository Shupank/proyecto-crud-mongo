# API RESTful CRUD con Node.js, Express y MongoDB

# DESCRIPCION
Este proyecto es una API RESTful desarrollada con Node.js, Express y MongoDB (usando Mongoose) para gestionar Productos, Categorías y Usuarios. Implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con una arquitectura modular que separa la lógica de negocio en una Capa de Servicios. Incluye autenticación opcional con JSON Web Tokens (JWT) para proteger rutas sensibles y utiliza bcrypt para hashear contraseñas. Los productos están relacionados con categorías mediante referencias, y las operaciones de lectura de productos usan populate para incluir los datos de la categoría asociada.

# ESQUEMA DE LA BASE DE DATOS
La base de datos MongoDB contiene tres colecciones:

# Users (Usuarios):

_id: ObjectId (automático)
nombre: String (requerido)
email: String (requerido, único)
password: String (requerido, hasheado con bcrypt)
createdAt, updatedAt: Date (timestamps automáticos)


# Categories (Categorías):

_id: ObjectId (automático)
nombre: String (requerido, único)
descripcion: String (requerido)
createdAt, updatedAt: Date (timestamps automáticos)


# Products (Productos):

_id: ObjectId (automático)
nombre: String (requerido)
descripcion: String (requerido)
precio: Number (requerido)
stock: Number (requerido, default: 0)
categoria: ObjectId (referencia a Category, requerido)
createdAt, updatedAt: Date (timestamps automáticos)

# TECNOLOGIAS UTILIZADAS

Node.js: v22.16.0 (entorno de ejecución)
Express: ^4.18.2 (framework web)
MongoDB: Base de datos NoSQL (usando MongoDB Atlas o local)
Mongoose: ^8.18.3 (ODM para MongoDB)
bcryptjs: ^3.0.2 (encriptación de contraseñas)
jsonwebtoken: ^9.0.2 (autenticación JWT)
dotenv: ^17.2.3 (gestión de variables de entorno)
cors: ^2.8.5 (habilitar CORS)
nodemon: ^3.1.10 (desarrollo, reinicio automático)

# INSTRUCCIONES PARA CORRER EL PROYECTO

Clona el repositorio:
git clone https://github.com/tu-usuario/proyecto-crud-mongodb.git
cd proyecto-crud-mongodb


Instala las dependencias:
npm install

Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto basado en .env.example:PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/proyecto-crud?retryWrites=true&w=majority
JWT_SECRET=<tu-clave-secreta>

Para MongoDB Atlas:
Regístrate en MongoDB Atlas.
Crea un cluster gratuito, configura un usuario de base de datos y permite acceso desde cualquier IP (0.0.0.0/0).
Copia la URI mongodb+srv y reemplaza <usuario>, <contraseña>, y <cluster> en .env.

Para MongoDB local:MONGODB_URI=mongodb://localhost:27017/proyecto-crud

Ejecuta el proyecto:

En desarrollo (con reinicio automático):npm run dev

En producción:npm start


# PRUEBA DE LOS ENDPOINTS

Usa Postman o una herramienta similar para enviar solicitudes a http://localhost:3000.
Sigue la lista de endpoints a continuación.

# Endpoints Disponibles
Los endpoints están organizados por entidad. Las rutas protegidas requieren un token JWT en el header Authorization: Bearer <token>. Códigos HTTP usados:

200: OK
201: Creado
400: Solicitud inválida
401: No autorizado
404: No encontrado
500: Error del servidor

# Endpoints y Ejemplos de Prueba en Postman
🔹 Usuarios
Método	Endpoint	Descripción	Auth	Body a enviar (JSON)
POST	/api/users/register	Registrar usuario	No	{ "nombre": "Ingeniero Riego", "email": "riego@test.com", "password": "123456" }
POST	/api/users/login	Iniciar sesión (retorna JWT)	No	{ "email": "riego@test.com", "password": "123456" }

✅ Respuesta esperada /api/users/register

{
  "message": "Usuario creado",
  "data": {
    "id": "652f1a8f1c5e8a2b9d1f4b11",
    "nombre": "Ingeniero Riego",
    "email": "riego@test.com",
    "createdAt": "2025-10-01T10:30:00.000Z",
    "updatedAt": "2025-10-01T10:30:00.000Z"
  }
}


✅ Respuesta esperada /api/users/login

{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "652f1a8f1c5e8a2b9d1f4b11",
    "nombre": "Ingeniero Riego",
    "email": "riego@test.com"
  }
}

🔹 Categorías
Método	Endpoint	Descripción	Auth	Body a enviar (JSON)
GET	/api/categories	Listar todas las categorías	No	-
POST	/api/categories	Crear categoría	Sí	{ "nombre": "Bombas de Riego", "descripcion": "Bombas centrífugas y periféricas para sistemas de riego" }
PUT	/api/categories/:id	Actualizar categoría	Sí	{ "nombre": "Bombas Actualizadas", "descripcion": "Nueva descripción" }
DELETE	/api/categories/:id	Eliminar categoría	Sí	-

✅ Respuesta esperada POST /api/categories

{
  "message": "Categoría creada",
  "data": {
    "id": "652f1a8f1c5e8a2b9d1f4a23",
    "nombre": "Bombas de Riego",
    "descripcion": "Bombas centrífugas y periféricas para sistemas de riego",
    "createdAt": "2025-10-01T10:35:00.000Z",
    "updatedAt": "2025-10-01T10:35:00.000Z"
  }
}

🔹 Productos
Método	Endpoint	Descripción	Auth	Body a enviar (JSON)
GET	/api/products	Listar todos los productos	No	-
POST	/api/products	Crear producto	Sí	{ "nombre": "Bomba Centrífuga 5HP", "descripcion": "Ideal para riego presurizado en parcelas de hasta 10 hectáreas", "precio": 250000, "stock": 8, "categoria": "652f1a8f1c5e8a2b9d1f4a23" }
PUT	/api/products/:id	Actualizar producto	Sí	{ "precio": 260000, "stock": 10 }
DELETE	/api/products/:id	Eliminar producto	Sí	-

✅ Respuesta esperada POST /api/products (Bomba Centrífuga 5HP)

{
  "message": "Producto creado",
  "data": {
    "id": "65301a8f1c5e8a2b9d1f4b77",
    "nombre": "Bomba Centrífuga 5HP",
    "descripcion": "Ideal para riego presurizado en parcelas de hasta 10 hectáreas",
    "precio": 250000,
    "stock": 8,
    "categoria": "652f1a8f1c5e8a2b9d1f4a23",
    "createdAt": "2025-10-01T10:40:00.000Z",
    "updatedAt": "2025-10-01T10:40:00.000Z"
  }
}


✅ Respuesta esperada POST /api/products (Filtro de Arena)

{
  "message": "Producto creado",
  "data": {
    "id": "65301b9f1c5e8a2b9d1f4b88",
    "nombre": "Filtro de Arena",
    "descripcion": "Filtro para limpieza de agua en riego por goteo",
    "precio": 80000,
    "stock": 15,
    "categoria": "652f1a8f1c5e8a2b9d1f4a24",
    "createdAt": "2025-10-01T10:45:00.000Z",
    "updatedAt": "2025-10-01T10:45:00.000Z"
  }
}


✅ Respuesta esperada POST /api/products (Cañería PEAD 50mm)

{
  "message": "Producto creado",
  "data": {
    "id": "65301c2f1c5e8a2b9d1f4b99",
    "nombre": "Cañería PEAD 50mm",
    "descripcion": "Tubería de polietileno de alta densidad para conducción de agua en riego",
    "precio": 12000,
    "stock": 50,
    "categoria": "652f1a8f1c5e8a2b9d1f4a25",
    "createdAt": "2025-10-01T10:50:00.000Z",
    "updatedAt": "2025-10-01T10:50:00.000Z"
  }
}


# NOTAS ADICIONALES

Autenticación: Las rutas POST, PUT y DELETE de categorías y productos requieren un token JWT obtenido desde /api/users/login. Incluye el header Authorization: Bearer <token>.
Populate: Las operaciones GET de productos (/api/products y /api/products/:id) usan populate para incluir los datos de la categoría asociada.
Errores:
400: Datos inválidos (ej. stock negativo, campos requeridos faltantes).
401: Token faltante o inválido.
404: Recurso no encontrado (ej. ID inválido).


Seguridad: Las contraseñas de los usuarios se hashean con bcrypt antes de guardarse mediante un hook pre-save en Mongoose.

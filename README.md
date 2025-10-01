# API RESTful CRUD con Node.js, Express y MongoDB

## Descripción
Esta API gestiona productos y categorías con operaciones CRUD. Usa Mongoose para MongoDB, capa de servicios para lógica de negocio, y JWT para autenticación opcional. Productos referencian categorías con populate.

## Esquema de la DB
- **Users**: { _id, nombre (String), email (String único), password (String hasheada), createdAt, updatedAt }
- **Categories**: { _id, nombre (String único), descripcion (String), createdAt, updatedAt }
- **Products**: { _id, nombre (String), descripcion (String), precio (Number), stock (Number), categoria (ObjectId ref Categories), createdAt, updatedAt }

## Tecnologías
- Node.js / Express
- MongoDB / Mongoose
- bcryptjs (encriptación)
- jsonwebtoken (JWT)
- dotenv (entorno)
- CORS

## Instrucciones para Correr
1. Clona el repo: `git clone https://github.com/tu-usuario/proyecto-crud-mongodb.git`
2. Instala dependencias: `npm install`
3. Configura `.env` con tu MONGODB_URI y JWT_SECRET (ver .env.example).
4. Conecta a MongoDB Atlas (crea cluster gratis).
5. Ejecuta: `npm run dev`
6. Prueba con Postman en http://localhost:3000

## Endpoints
Usa tablas para claridad:

| Método | Endpoint                  | Descripción                  | Autenticación | Ejemplo Body |
|--------|---------------------------|------------------------------|---------------|--------------|
| GET    | /api/categories           | Obtener todas categorías    | No           | - |
| GET    | /api/categories/:id       | Obtener categoría por ID    | No           | - |
| POST   | /api/categories           | Crear categoría             | Sí (JWT)     | { "nombre": "Ejemplo", "descripcion": "Desc" } |
| PUT    | /api/categories/:id       | Actualizar categoría        | Sí (JWT)     | { "nombre": "Nuevo" } |
| DELETE | /api/categories/:id       | Eliminar categoría          | Sí (JWT)     | - |
| GET    | /api/products             | Obtener todos productos (con populate) | No | - |
| GET    | /api/products/:id         | Obtener producto por ID (con populate) | No | - |
| POST   | /api/products             | Crear producto              | Sí (JWT)     | { "nombre": "Prod", "descripcion": "Desc", "precio": 10, "stock": 5, "categoria": "ID" } |
| PUT    | /api/products/:id         | Actualizar producto         | Sí (JWT)     | { "precio": 15 } |
| DELETE | /api/products/:id         | Eliminar producto           | Sí (JWT)     | - |
| POST   | /api/users/register       | Registrar usuario           | No           | { "nombre": "User", "email": "user@test.com", "password": "pass" } |
| POST   | /api/users/login          | Login (retorna JWT)         | No           | { "email": "user@test.com", "password": "pass" } |

Códigos HTTP: 200 (OK), 201 (Creado), 400 (Bad Request), 401 (No autorizado), 404 (No encontrado), 500 (Error servidor).

## Ejemplos de Datos Mock
- Ver arriba en la tabla.
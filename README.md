# API RESTful CRUD con Node.js, Express y MongoDB

## Descripción
Esta API RESTful gestiona usuarios, categorías y productos con operaciones CRUD completas. Implementa autenticación con JWT para rutas sensibles, encriptación de contraseñas con bcrypt, y relaciones entre entidades (productos referencian categorías) con populate en Mongoose. La lógica de negocio está separada en una capa de servicios, y los controladores son ligeros para manejar solo solicitudes HTTP.

## Esquema de la Base de Datos
- **Users** (Colección: `users`):
  - `_id`: ObjectId (automático)
  - `nombre`: String (requerido)
  - `email`: String (requerido, único)
  - `password`: String (hasheada con bcrypt, select: false)
  - `createdAt`: Date (automático)
  - `updatedAt`: Date (automático)

- **Categories** (Colección: `categories`):
  - `_id`: ObjectId (automático)
  - `name`: String (requerido)
  - `description`: String (requerido)
  - `createdAt`: Date (automático)
  - `updatedAt`: Date (automático)

- **Products** (Colección: `products`):
  - `_id`: ObjectId (automático)
  - `name`: String (requerido)
  - `description`: String (requerido)
  - `price`: Number (requerido, positivo)
  - `stock`: Number (requerido, no negativo)
  - `category`: ObjectId (ref a Categories, requerido)
  - `createdAt`: Date (automático)
  - `updatedAt`: Date (automático)

## Tecnologías Utilizadas
- **Backend**: Node.js, Express.js
- **Base de Datos**: MongoDB (con Mongoose ODM)
- **Seguridad**: bcryptjs (encriptación de contraseñas), jsonwebtoken (JWT)
- **Configuración**: dotenv (variables de entorno), cors (CORS)
- **Desarrollo**: nodemon (auto-reload)

## Instalación y Ejecución
1. Clona el repositorio:
# Flowly Backend API

Flowly Backend API es la API que alimenta la aplicación **Flowly**, diseñada para ayudar a los usuarios a gestionar sus suscripciones de manera eficiente. Esta API está construida con **Node.js** y **Express**, y utiliza **Firebase** como base de datos y **Swagger** para la documentación interactiva.

---

## **Características principales**

- Registro de usuarios con datos básicos (nombre, apellido, correo electrónico, contraseña).
- Gestión de suscripciones para usuarios registrados.
- Almacenamiento de datos en Firebase Firestore.
- Documentación detallada con Swagger disponible en `/api-docs`.

---

## **Tecnologías utilizadas**

- **Node.js**: Entorno de ejecución para JavaScript en el backend.
- **Express**: Framework para crear APIs RESTful.
- **Firebase Firestore**: Base de datos NoSQL para almacenar usuarios y suscripciones.
- **Swagger**: Herramienta para documentar y explorar la API.
- **Railway**: Plataforma utilizada para alojar la API.

---

## **ENDPOINTS**

- **USUARIOS**

**POST /users/register**
- Descripción: Registrar un nuevo usuario.
- Cuerpo de la solicitud (JSON):
{
    "nombre": "Juan",
    "apellido": "Pérez",
    "correoElectronico": "juan.perez@mail.com",
    "contrasenna": "password123"
}

*Respuestas:*
- 201 Created: Usuario registrado exitosamente.
- 400 Bad Request: Faltan datos obligatorios.

**GET /users/{userId}**
- Descripción: Obtener la información de un usuario y sus suscripciones.
- Parámetros de ruta:
- userId: ID único del usuario.

*Respuestas:*
200 OK: Información del usuario encontrada.
404 Not Found: El usuario no existe.

- **SUSCRIPCIONES**

**POST /users/register**
- Descripción: Agregar una nueva suscripción para un usuario.
- Cuerpo de la solicitud (JSON):
{
    "userId": "12345",
    "subscription": {
        "nombre": "Netflix",
        "precio": 15,
        "moneda": "USD",
        "fechaFacturacion": "2024-01-01",
        "tipoPlan": "Premium",
        "imagen": "https://example.com/netflix-logo.png"
    }
}

*Respuestas:*
- 200 OK: Suscripción añadida correctamente.
- 400 Bad Request: Faltan datos obligatorios.

## **DOCUMENTACIÓN INTERACTIVA
- **https://flowly-backend.up.railway.app/api-docs**

## **ARQUITECTURA DEL PROYECTO** 

flowly-backend/
├── firebase/         # Configuración y funciones relacionadas con Firebase
│   ├── auth.js       # Gestión de autenticación de usuarios
│   ├── config.js     # Configuración de Firebase
│   └── database.js   # Funciones relacionadas con Firestore
├── routes/           # Rutas de la API
│   ├── users.js      # Rutas relacionadas con usuarios
│   └── subscriptions.js # Rutas relacionadas con suscripciones
├── swagger.js        # Configuración de Swagger para la documentación
├── .env              # Variables de entorno (no incluido en el repositorio)
├── index.js          # Archivo principal de la aplicación
├── package.json      # Dependencias y scripts del proyecto
└── README.md         # Documentación del proyecto

## **DESPLIEGUE**

- El proyecto está desplegado en Railway. Para acceder a la API es a través de la siguiente URL:

https://flowly-backend.up.railway.app
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express'; // Asegúrate de esta línea
import swaggerSpec from './swagger.js'; // Archivo de configuración de Swagger
import userRoutes from './routes/users.js';
import subscriptionRoutes from './routes/subscriptions.js';

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Documentación con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/users', userRoutes); // Rutas para usuarios
app.use('/subscriptions', subscriptionRoutes); // Rutas para suscripciones

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

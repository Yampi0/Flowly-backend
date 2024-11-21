import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Flowly Backend API',
            version: '1.0.0',
            description: 'API para gestionar usuarios y suscripciones en Flowly, una aplicación para organizar suscripciones.',
            contact: {
                name: 'Equipo Flowly',
                email: 'soporte@flowly.com',
            },
            termsOfService: 'https://www.flowly.com/terms',
        },
        servers: [
            {
                url: 'https://flowly-backend.up.railway.app',
                description: 'Servidor en producción',
            },
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['nombre', 'apellido', 'correoElectronico', 'contrasenna'],
                    properties: {
                        nombre: {
                            type: 'string',
                            description: 'Nombre del usuario.',
                        },
                        apellido: {
                            type: 'string',
                            description: 'Apellido del usuario.',
                        },
                        correoElectronico: {
                            type: 'string',
                            format: 'email',
                            description: 'Correo electrónico único del usuario.',
                        },
                        contrasenna: {
                            type: 'string',
                            description: 'Contraseña del usuario.',
                        },
                    },
                    example: {
                        nombre: 'Juan',
                        apellido: 'Pérez',
                        correoElectronico: 'juan.perez@mail.com',
                        contrasenna: 'password123',
                    },
                },
                Subscription: {
                    type: 'object',
                    required: [
                        'nombre',
                        'precio',
                        'moneda',
                        'fechaFacturacion',
                        'tipoPlan',
                        'imagen',
                    ],
                    properties: {
                        nombre: {
                            type: 'string',
                            description: 'Nombre del servicio de suscripción (por ejemplo: Netflix).',
                        },
                        precio: {
                            type: 'number',
                            description: 'Precio de la suscripción.',
                        },
                        moneda: {
                            type: 'string',
                            description: 'Moneda en la que se paga la suscripción (ejemplo: USD).',
                        },
                        fechaFacturacion: {
                            type: 'string',
                            format: 'date',
                            description: 'Fecha de facturación en formato YYYY-MM-DD.',
                        },
                        tipoPlan: {
                            type: 'string',
                            description: 'Tipo de plan contratado (ejemplo: Premium).',
                        },
                        imagen: {
                            type: 'string',
                            format: 'uri',
                            description: 'URL de la imagen del servicio de suscripción.',
                        },
                    },
                    example: {
                        nombre: 'Netflix',
                        precio: 15,
                        moneda: 'USD',
                        fechaFacturacion: '2024-01-01',
                        tipoPlan: 'Premium',
                        imagen: 'https://example.com/netflix-logo.png',
                    },
                },

            },
        },
    },
    apis: ['./routes/users.js', './routes/subscriptions.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

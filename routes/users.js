

import express from 'express';
import { registerUser } from '../firebase/auth.js';
import { addUser, getUser } from '../firebase/database.js';

const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea un nuevo usuario con su información básica y lo almacena en la base de datos.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 userId:
 *                   type: string
 *                   description: ID único del usuario creado.
 *               example:
 *                 message: Usuario registrado exitosamente.
 *                 userId: "abc12345"
 *       400:
 *         description: Error en la solicitud. Ocurre si faltan datos o son inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado.
 *               example:
 *                 error: "Faltan datos obligatorios: nombre, apellido, correoElectronico, contrasenna"
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Obtener información de un usuario
 *     description: Devuelve los datos de un usuario existente, incluyendo sus suscripciones.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario.
 *     responses:
 *       200:
 *         description: Información del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: ID del usuario.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 suscripciones:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subscription'
 *               example:
 *                 userId: "abc12345"
 *                 user:
 *                   nombre: Juan
 *                   apellido: Pérez
 *                   correoElectronico: juan.perez@mail.com
 *                 suscripciones:
 *                   - nombre: Netflix
 *                     precio: 15
 *                     moneda: USD
 *                     fechaFacturacion: 2024-01-01
 *                     tipoPlan: Premium
 *                     imagen: https://example.com/netflix-logo.png
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado.
 *               example:
 *                 error: "El usuario con ID abc12345 no fue encontrado."
 */

router.post('/register', async (req, res) => {
    const { nombre, apellido, correoElectronico, contrasenna } = req.body;

    if (!nombre || !apellido || !correoElectronico || !contrasenna) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    try {
        const user = await registerUser(correoElectronico, contrasenna);

        const userData = {
            nombre,
            apellido,
            correoElectronico,
            subscriptions: []
        };

        await addUser(user.uid, userData);

        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: user.uid });
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(400).json({ error: error.message });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userData = await getUser(userId);
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error al obtener el usuario:', error.message);
        res.status(404).json({ error: error.message });
    }
});

router.post('/:userId/subscriptions', async (req, res) => {
    const { userId } = req.params;
    const subscription = req.body;

    if (!subscription.name || !subscription.price || !subscription.currency || !subscription.startDate || !subscription.renewalPeriod) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        await addSubscription(userId, subscription);
        res.status(200).json({ message: 'Suscripción añadida correctamente' });
    } catch (error) {
        console.error('Error al agregar suscripción:', error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;

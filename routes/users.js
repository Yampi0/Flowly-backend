import express from 'express';
import { registerUser } from '../firebase/auth.js';
import { addUser, getUser } from '../firebase/database.js';

const router = express.Router();

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
        res.status(200).json(userData); // Devuelve los datos del usuario
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

import express from 'express';
import { addSubscription } from '../firebase/database.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    const { userId, subscription } = req.body;

    // Validar los campos de la suscripción
    const { nombre, precio, moneda, fechaFacturacion, tipoPlan, imagen } = subscription;

    if (!nombre || !precio || !moneda || !fechaFacturacion || !tipoPlan || !imagen) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const validatedSubscription = {
        nombre,
        precio,
        moneda,
        fechaFacturacion,
        tipoPlan,
        imagen
    };

    try {
        // Formatear la fecha de facturación
        const formattedSubscription = {
            ...subscription,
            fechaFacturacion: formatDate(subscription.fechaFacturacion) // Formatear la fecha
        };

        // Guardar la suscripción en Firestore
        await addSubscription(userId, formattedSubscription);

        res.status(200).json({ message: "Suscripción añadida correctamente" });
    } catch (error) {
        console.error('Error al agregar suscripción:', error.message);
        res.status(400).json({ error: error.message });
    }
});

const formatDate = (dateString) => {
    // Parsear la fecha manualmente sin que JavaScript aplique zonas horarias
    const [year, month, day] = dateString.split('-').map(Number);

    // Construir una fecha usando estos valores sin desfasar el día
    const date = new Date(Date.UTC(year, month - 1, day)); // Date.UTC asegura que no haya desfase

    const formattedDay = String(date.getUTCDate()).padStart(2, '0'); // Día en UTC
    const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mes en UTC
    const formattedYear = date.getUTCFullYear();

    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
};

export default router;
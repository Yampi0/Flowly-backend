import express from 'express';
import { addSubscription } from '../firebase/database.js';

const router = express.Router();

/**
 * @swagger
 * /subscriptions/add:
 *   post:
 *     summary: Agregar una nueva suscripción
 *     description: Asocia una suscripción con un usuario existente en la base de datos.
 *     tags: [Subscriptions]
 *     requestBody:
 *       description: Datos necesarios para agregar una suscripción.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - subscription
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario al que se asociará la suscripción.
 *               subscription:
 *                 type: object
 *                 description: Detalles de la suscripción.
 *                 required:
 *                   - nombre
 *                   - precio
 *                   - moneda
 *                   - fechaFacturacion
 *                   - tipoPlan
 *                   - imagen
 *                 properties:
 *                   nombre:
 *                     type: string
 *                     description: "Nombre del servicio de suscripción (por ejemplo: Netflix)"
 *                   precio:
 *                     type: number
 *                     description: Precio de la suscripción.
 *                   moneda:
 *                     type: string
 *                     description: "Moneda en la que se paga la suscripción (ejemplo: USD)"
 *                   fechaFacturacion:
 *                     type: string
 *                     format: date
 *                     description: Fecha de facturación en formato YYYY-MM-DD.
 *                   tipoPlan:
 *                     type: string
 *                     description: "Tipo de plan contratado (ejemplo: Premium)"
 *                   imagen:
 *                     type: string
 *                     format: uri
 *                     description: URL de la imagen del servicio de suscripción.
 *             example:
 *               userId: "abc12345"
 *               subscription:
 *                 nombre: Netflix
 *                 precio: 15
 *                 moneda: USD
 *                 fechaFacturacion: 2024-01-01
 *                 tipoPlan: Premium
 *                 imagen: https://example.com/netflix-logo.png
 *     responses:
 *       200:
 *         description: Suscripción añadida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *               example:
 *                 message: Suscripción añadida correctamente.
 *       400:
 *         description: Error en la solicitud. Ocurre si los datos son inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallado.
 *               example:
 *                 error: "Faltan datos obligatorios en la suscripción."
 */

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
        imagen,
    };

    try {
        // Formatear la fecha de facturación
        const formattedSubscription = {
            ...subscription,
            fechaFacturacion: formatDate(subscription.fechaFacturacion), // Formatear la fecha
        };

        // Guardar la suscripción en Firestore
        await addSubscription(userId, formattedSubscription);

        res.status(200).json({ message: "Suscripción añadida correctamente" });
    } catch (error) {
        console.error("Error al agregar suscripción:", error.message);
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

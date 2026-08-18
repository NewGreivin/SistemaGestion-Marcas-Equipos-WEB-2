// Autor: Marisol Alfaro
// Descripción: Valida la información utilizada durante las devoluciones de equipos.
// Uso: Comprueba los datos recibidos antes de procesar una devolución.

import { param } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

export const validatePrestamoDevolucionId = [
    param('prestamoId').isInt({ min: 1 }).withMessage('El ID del préstamo debe ser un número entero válido'),
    handleValidationErrors
];

export const validateDevolucionIndividual = [
    param('prestamoId').isInt({ min: 1 }).withMessage('El ID del préstamo debe ser un número entero válido'),
    param('equipoId').isInt({ min: 1 }).withMessage('El ID del equipo debe ser un número entero válido'),
    handleValidationErrors
];

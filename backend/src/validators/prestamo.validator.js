// Autor: Marisol Alfaro
// Descripción: Valida la información necesaria para registrar un préstamo.
// Uso: Comprueba los datos recibidos antes de permitir la creación del préstamo.

import { body, param } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

export const validateCreatePrestamo = [
    body('usuario_id').notEmpty().withMessage('El usuario es requerido').isInt({ min: 1 }).withMessage('El usuario debe ser un ID válido'),
    body('equipos').isArray({ min: 1 }).withMessage('Debe seleccionar al menos un equipo'),
    body('equipos.*').isInt({ min: 1 }).withMessage('Cada equipo debe ser un ID válido'),
    handleValidationErrors
];

export const validatePrestamoId = [
    param('id').isInt({ min: 1 }).withMessage('El ID del préstamo debe ser un número entero válido'),
    handleValidationErrors
];

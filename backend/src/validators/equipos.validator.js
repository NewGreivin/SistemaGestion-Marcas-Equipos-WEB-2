// Autor: Oscar Mario Alvarez Cruz

import { body, param } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

export const validateCreateEquipo = [
    body('codigo').notEmpty().withMessage('El código es requerido').isLength({ max: 50 }),
    body('descripcion').notEmpty().withMessage('La descripción es requerida'),
    body('estado').optional().isIn(['DISPONIBLE', 'PRESTADO', 'MANTENIMIENTO', 'INACTIVO']).withMessage('Estado inválido'),
    handleValidationErrors
];

export const validateUpdateEquipo = [
    body('codigo').notEmpty().withMessage('El código es requerido').isLength({ max: 50 }),
    body('descripcion').notEmpty().withMessage('La descripción es requerida'),
    body('estado').optional().isIn(['DISPONIBLE', 'PRESTADO', 'MANTENIMIENTO', 'INACTIVO']).withMessage('Estado inválido'),
    handleValidationErrors
];

export const validateChangeStatus = [
    body('estado').notEmpty().withMessage('El estado es requerido').isIn(['DISPONIBLE', 'PRESTADO', 'MANTENIMIENTO', 'INACTIVO']).withMessage('Estado inválido'),
    handleValidationErrors
];

export const validateIdParam = [
    param('id').isInt().withMessage('El ID del equipo debe ser un número entero'),
    handleValidationErrors
];

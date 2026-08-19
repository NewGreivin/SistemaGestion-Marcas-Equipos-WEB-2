// Autor: Brayan Azofeifa
// Descripcion: Validaciones para los datos de entrada
// en las rutas del CRUD de departamentos.


import { body, param } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

export const validateCreateDepartamento = [
    body('nombre').notEmpty().withMessage('El nombre es requerido').isLength({ max: 100 }),
    body('descripcion').optional().isString(),
    body('encargado').optional().isLength({ max: 100 }),
    handleValidationErrors
];

export const validateUpdateDepartamento = [
    body('nombre').notEmpty().withMessage('El nombre es requerido').isLength({ max: 100 }),
    body('descripcion').optional().isString(),
    body('encargado').optional().isLength({ max: 100 }),
    handleValidationErrors
];

export const validateIdParam = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    handleValidationErrors
];
// Autor: Ricardo Chaves Campos

import { body } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';


export const validateCreateDispositivo = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre del dispositivo es requerido')
        .isLength({ max: 100 })
        .withMessage('El nombre no puede superar los 100 caracteres'),

    body('descripcion')
        .optional({ nullable: true })
        .trim()
        .isLength({ max: 255 })
        .withMessage('La descripción no puede superar los 255 caracteres'),

    handleValidationErrors
];
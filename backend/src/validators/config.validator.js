// Autor: Greivin Arguedas

import { body } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

export const validateConfiguracion = [
    body('nombre_institucion').notEmpty().withMessage('El nombre de la institución es requerido').isLength({ max: 150 }),
    body('rango_ip_permitido').optional().isString().isLength({ max: 255 }),
    body('tiempo_maximo_sesion').notEmpty().withMessage('Tiempo máximo requerido').isInt({ min: 1 }),
    body('tamano_maximo_archivos').notEmpty().withMessage('Tamaño máximo de archivos requerido').isInt({ min: 1 }),
    handleValidationErrors
];
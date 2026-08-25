// Autor: Marisol Alfaro
// Descripción: Valida los filtros utilizados para consultar el historial.
// Uso: Comprueba los parámetros de usuario, fecha, estado y equipo antes de la consulta.

import { query } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

export const validateHistorialFilters = [
    query('usuario').optional().isInt({ min: 1 }).withMessage('El usuario debe ser un ID válido'),
    query('fecha').optional().isISO8601({ strict: true }).withMessage('La fecha debe tener formato YYYY-MM-DD'),
    query('estado').optional().isIn(['PENDIENTE', 'DEVUELTO', 'FINALIZADO']).withMessage('El estado debe ser PENDIENTE, DEVUELTO o FINALIZADO'),
    query('equipo').optional().isInt({ min: 1 }).withMessage('El equipo debe ser un ID válido'),
    handleValidationErrors
];

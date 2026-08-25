// Autor: Brayan Azofeifa
// Descripcion: Validaciones para los parámetros de filtro 
// (query) en la consulta de reportes.

import { query } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

export const validateFiltrosReporte = [
    query('usuario').optional().isInt(),
    query('anio').optional().isInt(),
    query('mes').optional().isInt(),
    query('dia').optional().isInt(),
    query('departamento').optional().isInt(),
    handleValidationErrors
];
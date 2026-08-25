// Autor: Marisol Alfaro
// Descripción: Define la ruta para consultar el historial de préstamos y devoluciones.
// Uso: Conecta las solicitudes de consulta del historial con su controlador correspondiente.

import { Router } from 'express';
import { getHistorial } from '../controllers/historial.controller.js';
import { validarSesion, esAdministrador } from '../middlewares/auth.middleware.js';
import { validateHistorialFilters } from '../validators/historial.validator.js';

const router = Router();

router.get('/', validarSesion, esAdministrador, validateHistorialFilters, getHistorial);

export default router;

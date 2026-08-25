// Autor: Marisol Alfaro
// Descripción: Define las rutas disponibles para la gestión de préstamos de equipos.
// Uso: Conecta las solicitudes HTTP de préstamos con el controlador correspondiente.

import { Router } from 'express';
import {getOpcionesPrestamo,createPrestamo,getAllPrestamos,getPrestamoById} from '../controllers/prestamo.controller.js';
import { validarSesion, esAdministrador } from '../middlewares/auth.middleware.js';
import { validateCreatePrestamo, validatePrestamoId } from '../validators/prestamo.validator.js';

const router = Router();

// Todas las operaciones de préstamo requieren un Administrador/Encargado autenticado.
router.get('/opciones', validarSesion, esAdministrador, getOpcionesPrestamo);
router.get('/', validarSesion, esAdministrador, getAllPrestamos);
router.post('/', validarSesion, esAdministrador, validateCreatePrestamo, createPrestamo);
router.get('/:id', validarSesion, esAdministrador, validatePrestamoId, getPrestamoById);

export default router;

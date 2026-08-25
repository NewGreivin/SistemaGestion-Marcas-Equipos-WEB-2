// Autor: Marisol Alfaro
// Descripción: Define las rutas utilizadas para gestionar las devoluciones de equipos.
// Uso: Conecta las solicitudes de devolución individual y completa con su controlador.

import { Router } from 'express';
import {devolverEquipo,devolverPrestamoCompleto,getEstadoDevolucion} from '../controllers/devolucion.controller.js';
import { validarSesion, esAdministrador } from '../middlewares/auth.middleware.js';
import {validatePrestamoDevolucionId, validateDevolucionIndividual } from '../validators/devolucion.validator.js';

const router = Router();

router.get('/:prestamoId', validarSesion, esAdministrador, validatePrestamoDevolucionId, getEstadoDevolucion);
router.put('/:prestamoId/equipos/:equipoId', validarSesion, esAdministrador, validateDevolucionIndividual, devolverEquipo);
router.put('/:prestamoId/completa', validarSesion, esAdministrador, validatePrestamoDevolucionId, devolverPrestamoCompleto);

export default router;

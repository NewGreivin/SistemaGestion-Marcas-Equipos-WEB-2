// Autor: Brayan Azofeifa
// Descripcion: Definición del endpoint para consultar
// y exportar el reporte general de marcas.
    
import { Router } from 'express';
import { getReporteMarcas } from '../controllers/reporte.controller.js';
import { validarSesion, esAdministrador } from '../middlewares/auth.middleware.js';
import { validateFiltrosReporte } from '../validators/reporte.validator.js';

const router = Router();

router.get('/marcas', validarSesion, esAdministrador, validateFiltrosReporte, getReporteMarcas);

export default router;
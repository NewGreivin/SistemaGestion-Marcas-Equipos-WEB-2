import { Router } from 'express';
import { getConfiguracion, updateConfiguracion } from '../controllers/config.controller.js';
import { validarSesion, esAdministrador } from '../middlewares/auth.middleware.js';
import { validateConfiguracion } from '../validators/config.validator.js';

const router = Router();

router.get('/', validarSesion, getConfiguracion);
router.put('/', validarSesion, esAdministrador, validateConfiguracion, updateConfiguracion);

export default router;
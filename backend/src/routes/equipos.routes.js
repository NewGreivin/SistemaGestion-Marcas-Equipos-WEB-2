// Autor: Oscar Mario Alvarez Cruz

import { Router } from 'express';
import * as equiposController from '../controllers/equipos.controller.js';
import { validarSesion, esAdministrador } from '../middlewares/auth.middleware.js';
import { 
    validateCreateEquipo, 
    validateUpdateEquipo, 
    validateChangeStatus, 
    validateIdParam 
} from '../validators/equipos.validator.js';
import { uploadEquipoImage } from '../middlewares/upload.middleware.js';

const router = Router();

// Todas las rutas de equipos requieren sesión iniciada
router.use(validarSesion);

router.get('/', equiposController.getAllEquipos);

router.get('/:id', validateIdParam, equiposController.getEquipoById);

// Rutas administrativas
router.post(
    '/', 
    esAdministrador, 
    uploadEquipoImage.single('imagen'), 
    validateCreateEquipo, 
    equiposController.createEquipo
);

router.put(
    '/:id', 
    esAdministrador, 
    validateIdParam, 
    uploadEquipoImage.single('imagen'), 
    validateUpdateEquipo, 
    equiposController.updateEquipo
);

router.patch(
    '/:id/estado', 
    esAdministrador, 
    validateIdParam, 
    validateChangeStatus, 
    equiposController.changeStatus
);

export default router;

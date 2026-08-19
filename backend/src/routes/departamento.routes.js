// Autor: Brayan Azofeifa
// Descripcion: Definición de las rutas y endpoints REST 
// protegidos para el módulo de departamentos.

import { Router } from 'express';
import { getDepartamentos, getDepartamento, createDepartamento, updateDepartamento, deleteDepartamento } 
    from '../controllers/departamento.controller.js';
import { validarSesion, esAdministrador } from '../middlewares/auth.middleware.js';
import { validateCreateDepartamento, validateUpdateDepartamento, validateIdParam } 
    from '../validators/departamento.validator.js';

const router = Router();

router.get('/', validarSesion, getDepartamentos);
router.get('/:id', validarSesion, validateIdParam, getDepartamento);
router.post('/', validarSesion, esAdministrador, validateCreateDepartamento, createDepartamento);
router.put('/:id', validarSesion, esAdministrador, validateIdParam, validateUpdateDepartamento, updateDepartamento);
router.delete('/:id', validarSesion, esAdministrador, validateIdParam, deleteDepartamento);

export default router;
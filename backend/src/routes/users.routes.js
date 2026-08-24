// Autor: Greivin Arguedas

import { Router } from 'express';
import { getProfile, createUser, updateProfile, changePassword, getAllUsers, deleteUser, updateUserById, getRoles } 
    from '../controllers/users.controller.js';
import { validarSesion, esAdministrador } from '../middlewares/auth.middleware.js';
import { validateUpdateProfile, validateCreateUser, validateChangePassword, validateIdParam } 
    from '../validators/users.validator.js';

const router = Router();

// Rutas de perfil personal (Cualquier usuario autenticado)
router.get('/profile', validarSesion, getProfile);
router.put('/profile', validarSesion, validateUpdateProfile, updateProfile);
router.put('/change-password', validarSesion, validateChangePassword, changePassword);
router.get('/roles', validarSesion, getRoles);

// Rutas CRUD de usuarios (Solo Administrador)
router.get('/', validarSesion, esAdministrador, getAllUsers);
router.post('/', validarSesion, esAdministrador, validateCreateUser, createUser);
router.put('/:id', validarSesion, esAdministrador, validateIdParam, updateUserById);
router.delete('/:id', validarSesion, esAdministrador, validateIdParam, deleteUser);

export default router;
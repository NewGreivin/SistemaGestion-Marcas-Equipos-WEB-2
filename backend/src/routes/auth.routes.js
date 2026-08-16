import { Router } from 'express';
import { registro, login, logout, recoverPassword, resetPassword } 
    from '../controllers/auth.controller.js';
import { validarSesion } from '../middlewares/auth.middleware.js';
import { validateRegistro, validateLogin, validateRecover, validateReset } 
    from '../validators/auth.validator.js';

const router = Router();

router.post('/register', validateRegistro, registro);
router.post('/login', validateLogin, login);
router.post('/logout', validarSesion, logout);
router.post('/recover-password', validateRecover, recoverPassword);
router.post('/reset-password', validateReset, resetPassword);

export default router;
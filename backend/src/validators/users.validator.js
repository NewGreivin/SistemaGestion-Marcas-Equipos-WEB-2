import { body, param } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

export const validateCreateUser = [
    body('nombre_completo').notEmpty().withMessage('El nombre completo es requerido').isLength({ max: 150 }),
    body('fecha_nacimiento').notEmpty().withMessage('La fecha de nacimiento es requerida').isDate(),
    body('correo').notEmpty().withMessage('El correo es requerido').isEmail(),
    body('username').notEmpty().withMessage('El username es requerido').isLength({ max: 50 }),
    body('password').notEmpty().withMessage('Contraseña requerida').isLength({ min: 6 }),
    body('confirmar_password').notEmpty().withMessage('Confirmar contraseña es requerido'),
    body('departamento_id').notEmpty().withMessage('El departamento es requerido').isInt(),
    handleValidationErrors
];

export const validateUpdateProfile = [
    body('nombre_completo').notEmpty().withMessage('El nombre completo es requerido'),
    body('fecha_nacimiento').notEmpty().withMessage('La fecha de nacimiento es requerida').isDate(),
    body('departamento_id').notEmpty().withMessage('El departamento es requerido').isInt(),
    handleValidationErrors
];

export const validateChangePassword = [
    body('passwordActual').notEmpty().withMessage('Contraseña actual requerida'),
    body('nuevaPassword').notEmpty().withMessage('Nueva contraseña requerida').isLength({ min: 6 }),
    body('confirmacionNuevaPassword').notEmpty().withMessage('Confirmar nueva contraseña requerida'),
    handleValidationErrors
];

export const validateIdParam = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    handleValidationErrors
];
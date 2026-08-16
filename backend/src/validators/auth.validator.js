import { body } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

export const validateRegistro = [
    body('nombre_completo').notEmpty().withMessage('El nombre completo es requerido').isLength({ max: 150 }),
    body('fecha_nacimiento').notEmpty().withMessage('La fecha es requerida').isDate().withMessage('Fecha inválida'),
    body('correo').notEmpty().withMessage('El correo es requerido').isEmail().withMessage('Debe ser un correo válido'),
    body('username').notEmpty().withMessage('El username es requerido').isLength({ max: 50 }),
    body('password').notEmpty().withMessage('Contraseña requerida').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),
    body('confirmar_password').notEmpty().withMessage('Confirmar contraseña es requerido'),
    body('departamento_id').notEmpty().withMessage('El departamento es requerido').isInt(),
    body('rol_id').notEmpty().withMessage('El rol es requerido').isInt({ min: 1 }).withMessage('Debe ser un número válido'),
    handleValidationErrors
];

export const validateLogin = [
    body('identificador').notEmpty().withMessage('Usuario o correo requerido'),
    body('password').notEmpty().withMessage('Contraseña requerida'),
    handleValidationErrors
];

export const validateRecover = [
    body('identificador').notEmpty().withMessage('Usuario o correo requerido'),
    handleValidationErrors
];

export const validateReset = [
    body('token').notEmpty().withMessage('Token requerido'),
    body('newPassword').notEmpty().withMessage('Nueva contraseña requerida').isLength({ min: 6 }),
    body('confirmNewPassword').notEmpty().withMessage('Confirmar nueva contraseña requerido'),
    handleValidationErrors
];
import { validationResult } from 'express-validator';
import { error } from '../utils/respuestaJson.js';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));
        return error(res, 'Error de validación de datos', extractedErrors, 400);
    }
    next();
};
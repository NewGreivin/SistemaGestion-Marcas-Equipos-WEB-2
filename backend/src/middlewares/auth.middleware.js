// Autor: Greivin Arguedas

import { error } from '../utils/respuestaJson.js';

export const validarSesion = (req, res, next) => {
    try {
        if (!req.session || !req.session.usuario) {
            return error(res, 'No se encontró la sesión. Inicie sesión nuevamente.', null, 401);
        }
        req.usuario = req.session.usuario;
        next();
    } catch (err) {
        return error(res, 'Error al validar la sesión', err);
    }
};

export const esAdministrador = (req, res, next) => {
    if (req.usuario && req.usuario.rol_nombre === 'Administrador') {
        next();
    } else {
        return error(res, 'Acceso denegado. Se requiere rol de Administrador.', null, 403);
    }
};
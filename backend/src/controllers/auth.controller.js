// Autor: Greivin Arguedas

import * as authService from '../services/auth.service.js';
import { exito, error } from '../utils/respuestaJson.js';

export const login = async (req, res) => {
    try {
        const { identificador, password } = req.body;
        const loginData = await authService.loginUser(identificador, password);

        req.session.usuario = loginData.usuario;
        req.session.cookie.maxAge = loginData.tiempoMaximo * 60 * 1000;

        return exito(res, 'Inicio de sesión exitoso.', loginData.usuario);
    } catch (err) {
        if (err.message.includes('inválidas')) {
            return res.status(401).json({ success: false, message: err.message });
        }
        return error(res, 'Error al iniciar sesión', err);
    }
};

export const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) return error(res, 'Error al destruir la sesión', err);
            res.clearCookie('gestion_session');
            return exito(res, 'Sesión finalizada exitosamente.');
        });
    } catch (err) {
        return error(res, 'Error al cerrar sesión', err);
    }
};

export const recoverPassword = async (req, res) => {
    try {
        await authService.requestPasswordRecovery(req.body.identificador);
        return exito(res, 'Si el usuario existe, se ha enviado un código.');
    } catch (err) {
        return error(res, err.message || 'Error al procesar recuperación', err);
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword, confirmNewPassword } = req.body;
        await authService.resetPassword(token, newPassword, confirmNewPassword);
        
        if (req.session) {
            req.session.destroy();
            res.clearCookie('gestion_session');
        }
        return exito(res, 'Contraseña restablecida exitosamente. Inicie sesión.');
    } catch (err) {
        if (err.message.includes('coinciden') || err.message.includes('inválido')) {
            return res.status(400).json({ success: false, message: err.message });
        }
        return error(res, 'Error al restablecer contraseña', err);
    }
};
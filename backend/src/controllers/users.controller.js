import * as usuariosService from '../services/users.service.js';
import { exito, error } from '../utils/respuestaJson.js';

export const getProfile = async (req, res) => {
    try {
        const perfil = await usuariosService.getProfile(req.usuario.id);
        return exito(res, 'Perfil recuperado exitosamente.', perfil);
    } catch (err) {
        return error(res, 'Error al obtener el perfil', err, 404);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await usuariosService.getAllUsers();
        return exito(res, 'Usuarios obtenidos correctamente.', users);
    } catch (err) {
        return error(res, 'Error al obtener usuarios', err);
    }
};

export const createUser = async (req, res) => {
    try {
        const insertId = await usuariosService.createUser(req.body);
        return exito(res, 'Usuario creado exitosamente por el administrador.', { id: insertId }, 201);
    } catch (err) {
        if (err.message.includes('registrado') || err.message.includes('coinciden')) {
            return res.status(400).json({ success: false, message: err.message });
        }
        return error(res, 'Error al crear el usuario', err);
    }
};

export const updateProfile = async (req, res) => {
    try {
        await usuariosService.updateProfile(req.usuario.id, req.body);
        return exito(res, 'Perfil actualizado exitosamente.');
    } catch (err) {
        return error(res, 'Error al actualizar el perfil', err);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await usuariosService.deleteUser(req.params.id);
        return exito(res, 'Usuario eliminado exitosamente.');
    } catch (err) {
        if (err.message.includes('encontrado')) return 
            error(res, 'Usuario no encontrado', err, 404);
        return error(res, 'Error al eliminar usuario', err);
    }
};

export const changePassword = async (req, res) => {
    try {
        const { passwordActual, nuevaPassword, confirmacionNuevaPassword } = req.body;
        await usuariosService.changePassword(req.usuario.id, passwordActual, nuevaPassword, confirmacionNuevaPassword);
        return exito(res, 'Contraseña actualizada exitosamente.');
    } catch (err) {
        return error(res, 'Error al actualizar la contraseña', err);
    }
};

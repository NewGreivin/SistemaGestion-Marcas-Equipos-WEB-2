// Autor: Greivin Arguedas

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
        const nuevoUsuario = await usuariosService.createUser(req.body);
        res.status(201).json({ message: "Usuario creado exitosamente", data: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ 
            status: "error", 
            message: error.message 
        });
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

export const deleteUser = async (req, res, next) => {
    try {
        await usuariosService.deleteUser(req.params.id);
        return exito(res, 'Usuario eliminado exitosamente.');
    } catch (err) {
        next(err);
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

export const updateUserById = async (req, res) => {
    try {
        await usuariosService.updateUserById(req.params.id, req.body);
        return exito(res, 'Usuario actualizado exitosamente.');
    } catch (err) {
        if (err.message.includes('registrado')) {
            return res.status(400).json({ success: false, message: err.message });
        }
        return error(res, 'Error al actualizar usuario', err);
    }
};
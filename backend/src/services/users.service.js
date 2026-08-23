// Autor: Greivin Arguedas

import bcrypt from 'bcrypt';
import * as usuariosDao from '../daos/users.dao.js';

export const getProfile = async (usuario_id) => {
    const usuario = await usuariosDao.findById(usuario_id);
    if (!usuario) throw new Error('Usuario no encontrado.');
    delete usuario.password_hash;
    return usuario;
};

export const getAllUsers = async () => {
    return await usuariosDao.findAll();
};

export const createUser = async (data) => {
    const existeCorreo = await usuariosDao.findByCorreoOrUsername(data.correo); 
    if (existeCorreo) {
        throw new Error('El correo electrónico ya está registrado en el sistema.');
    }

    const existeUsername = await usuariosDao.findByCorreoOrUsername(data.username);
    if (existeUsername) {
        throw new Error('El nombre de usuario ya está en uso');
    }

    if (data.password !== data.confirmar_password) {
        throw new Error('Las contraseñas no coinciden.');
    }

    const password_hash = await bcrypt.hash(data.password, 12);
    return await usuariosDao.create({...data, password_hash});
};

export const updateProfile = async (usuario_id, data) => {
    await usuariosDao.updateProfile(usuario_id, data);
};

export const deleteUser = async (id) => {
    const deleted = await usuariosDao.deleteById(id);
    if (!deleted) throw new Error('Usuario no encontrado.');
};

export const changePassword = async (usuario_id, passwordActual, nuevaPassword, confirmacionNuevaPassword) => {
    if (nuevaPassword !== confirmacionNuevaPassword) {
        throw new Error('La nueva contraseña y su confirmación no coinciden.');
    }

    const usuario = await usuariosDao.findById(usuario_id);
    if (!usuario) throw new Error('Usuario no encontrado.');

    const match = await bcrypt.compare(passwordActual, usuario.password_hash);
    if (!match) throw new Error('La contraseña actual es incorrecta.');

    const password_hash = await bcrypt.hash(nuevaPassword, 10);
    await usuariosDao.updatePassword(usuario_id, password_hash);
};

export const updateUserById = async (id, data) => {
    const existeCorreo = await usuariosDao.findByCorreoOrUsername(data.correo); 
    if (existeCorreo && existeCorreo.id !== Number(id)) {
        throw new Error('El correo electrónico ya está registrado en el sistema.');
    }

    const existeUsername = await usuariosDao.findByCorreoOrUsername(data.username);
    if (existeUsername && existeUsername.id !== Number(id)) {
        throw new Error('El nombre de usuario ya está en uso');
    }

    if (data.password) {
        data.password_hash = await bcrypt.hash(data.password, 10);
    }

    await usuariosDao.updateUserById(id, data);
};
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
    const existente = await usuariosDao.findByCorreoOrUsername(data.correo);
    const existenteUser = await usuariosDao.findByCorreoOrUsername(data.username);
    
    if (existente || existenteUser) {
        throw new Error('El correo o nombre de usuario ya se encuentra registrado.');
    }

    if (data.password !== data.confirmar_password) {
        throw new Error('Las contraseñas no coinciden.');
    }

    const password_hash = await bcrypt.hash(data.password, 10);
    const nuevoUsuario = { ...data, password_hash };
    return await usuariosDao.create(nuevoUsuario);
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
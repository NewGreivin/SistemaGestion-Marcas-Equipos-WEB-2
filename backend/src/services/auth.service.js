// Autor: Greivin Arguedas

import { sendRecoveryEmail } from '../utils/mailer.js';
import bcrypt from 'bcrypt';
import * as usuariosDao from '../daos/users.dao.js';
import * as tokensDao from '../daos/tokens.dao.js';
import * as configDao from '../daos/configuracion.dao.js';

export const loginUser = async (identificador, password) => {
    let usuario = await usuariosDao.findByCorreoOrUsername(identificador);
    if (!usuario) throw new Error('Credenciales inválidas.');

    const match = await bcrypt.compare(password, usuario.password_hash);
    if (!match) throw new Error('Credenciales inválidas.');

    usuario = await usuariosDao.findById(usuario.id);

    const config = await configDao.getConfig();
    let tiempoMaximo = config?.tiempo_maximo_sesion || 60; // en minutos

    return {
        tiempoMaximo,
        usuario: {
            id: usuario.id,
            nombre_completo: usuario.nombre_completo,
            correo: usuario.correo,
            username: usuario.username,
            rol_id: usuario.rol_id,
            rol_nombre: usuario.rol,
            departamento_id: usuario.departamento_id
        }
    };
};

export const requestPasswordRecovery = async (identificador) => {
    const usuario = await usuariosDao.findByCorreoOrUsername(identificador);
    
    if (!usuario || !usuario.correo) return null; 
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    await tokensDao.createToken(usuario.id, token);
    
    try {
        await sendRecoveryEmail(usuario.correo, token);
    } catch (emailErr) {
        console.warn('No se pudo enviar el correo. CÓDIGO SIMULADO:', token);
    }
    return true;
};

export const resetPassword = async (token, newPassword, confirmNewPassword) => {
    if (newPassword !== confirmNewPassword) throw new Error('Las contraseñas no coinciden.');

    const tokenData = await tokensDao.findValidToken(token);
    if (!tokenData) throw new Error('Token inválido o expirado.');

    const password_hash = await bcrypt.hash(newPassword, 10);
    await usuariosDao.updatePassword(tokenData.usuario_id, password_hash);
    await tokensDao.markTokenAsUsed(tokenData.id);
};
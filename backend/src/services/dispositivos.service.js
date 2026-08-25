// Autor: Ricardo Chaves Campos

import { randomUUID } from 'node:crypto';
import * as dispositivosDao from '../daos/dispositivos.dao.js';


export const getDispositivosUsuario = async (usuario_id) => {
    return await dispositivosDao.findByUsuarioId(usuario_id);
};


export const createDispositivo = async (usuario_id, data) => {
    const identificador = randomUUID();

    const nuevoDispositivo = {
        identificador,
        nombre: data.nombre,
        descripcion: data.descripcion || null,
        usuario_id,
        estado: 'ACTIVO'
    };

    const id = await dispositivosDao.create(nuevoDispositivo);

    return {
        id,
        ...nuevoDispositivo
    };
};


export const getDispositivoAutorizado = async (usuario_id, identificador) => {
    const dispositivo = await dispositivosDao.findByIdentificadorAndUsuarioId(
        identificador,
        usuario_id
    );

    if (!dispositivo) {
        throw new Error('Dispositivo no autorizado.');
    }

    if (dispositivo.estado !== 'ACTIVO') {
        throw new Error('El dispositivo se encuentra inactivo.');
    }

    return dispositivo;
};
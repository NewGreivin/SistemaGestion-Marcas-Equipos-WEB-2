// Autor: Oscar Mario Alvarez Cruz

import * as equiposDao from '../daos/equipos.dao.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllEquipos = async () => {
    return await equiposDao.findAll();
};

export const getEquipoById = async (id) => {
    const equipo = await equiposDao.findById(id);
    if (!equipo) throw new Error('Equipo no encontrado.');
    return equipo;
};

export const createEquipo = async (data) => {
    const existente = await equiposDao.findByCodigo(data.codigo);
    if (existente) {
        throw new Error('El código del equipo ya se encuentra registrado.');
    }
    
    return await equiposDao.create(data);
};

export const updateEquipo = async (id, data) => {
    const equipoActual = await equiposDao.findById(id);
    if (!equipoActual) throw new Error('Equipo no encontrado.');

    if (data.codigo !== equipoActual.codigo) {
        const existente = await equiposDao.findByCodigo(data.codigo);
        if (existente) {
            throw new Error('El código del equipo ya se encuentra registrado por otro equipo.');
        }
    }

    // Preserve original image if no new image is provided
    const imagenFinal = data.imagen || equipoActual.imagen;
    
    const equipoData = {
        ...data,
        imagen: imagenFinal
    };

    await equiposDao.update(id, equipoData);
    
    // Optional: Delete old image if a new one was uploaded
    if (data.imagen && equipoActual.imagen && data.imagen !== equipoActual.imagen) {
        try {
            const oldImagePath = path.join(__dirname, '../../public', equipoActual.imagen);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        } catch (error) {
            console.error('Error deleting old image:', error);
        }
    }
};

export const changeEquipoStatus = async (id, estado) => {
    const estadosPermitidos = ['DISPONIBLE', 'PRESTADO', 'MANTENIMIENTO', 'INACTIVO'];
    if (!estadosPermitidos.includes(estado)) {
        throw new Error('Estado no permitido.');
    }

    const equipo = await equiposDao.findById(id);
    if (!equipo) throw new Error('Equipo no encontrado.');

    await equiposDao.updateEstado(id, estado);
};

// Autor: Oscar Mario Alvarez Cruz

import * as equiposService from '../services/equipos.service.js';
import { exito, error } from '../utils/respuestaJson.js';

export const getAllEquipos = async (req, res) => {
    try {
        const equipos = await equiposService.getAllEquipos();
        return exito(res, 'Equipos obtenidos correctamente.', equipos);
    } catch (err) {
        return error(res, 'Error al obtener equipos', err);
    }
};

export const getEquipoById = async (req, res) => {
    try {
        const equipo = await equiposService.getEquipoById(req.params.id);
        return exito(res, 'Equipo recuperado exitosamente.', equipo);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return error(res, 'Equipo no encontrado', err, 404);
        }
        return error(res, 'Error al obtener el equipo', err);
    }
};

export const createEquipo = async (req, res) => {
    try {
        const equipoData = {
            ...req.body,
            imagen: req.file ? `/uploads/equipos/${req.file.filename}` : null
        };
        
        const insertId = await equiposService.createEquipo(equipoData);
        return exito(res, 'Equipo creado exitosamente.', { id: insertId }, 201);
    } catch (err) {
        if (err.message.includes('registrado')) {
            return res.status(400).json({ success: false, message: err.message });
        }
        return error(res, 'Error al crear el equipo', err);
    }
};

export const updateEquipo = async (req, res) => {
    try {
        const equipoData = {
            ...req.body
        };
        
        if (req.file) {
            equipoData.imagen = `/uploads/equipos/${req.file.filename}`;
        }
        
        await equiposService.updateEquipo(req.params.id, equipoData);
        return exito(res, 'Equipo actualizado exitosamente.');
    } catch (err) {
        if (err.message.includes('registrado por otro')) {
            return res.status(400).json({ success: false, message: err.message });
        }
        if (err.message.includes('no encontrado')) {
            return error(res, 'Equipo no encontrado', err, 404);
        }
        return error(res, 'Error al actualizar el equipo', err);
    }
};

export const changeStatus = async (req, res) => {
    try {
        await equiposService.changeEquipoStatus(req.params.id, req.body.estado);
        return exito(res, 'Estado del equipo actualizado exitosamente.');
    } catch (err) {
        if (err.message.includes('permitido')) {
            return res.status(400).json({ success: false, message: err.message });
        }
        if (err.message.includes('no encontrado')) {
            return error(res, 'Equipo no encontrado', err, 404);
        }
        return error(res, 'Error al cambiar estado', err);
    }
};

// Autor: Brayan Azofeifa
// Descripcion: Controlador que recibe las peticiones de departamentos 
// y formatea las respuestas JSON.

import * as departamentoService from '../services/departamento.service.js';
import { exito, error } from '../utils/respuestaJson.js';

export const createDepartamento = async (req, res) => {
    try {
        const insertId = await departamentoService.createDepartamento(req.body);
        return exito(res, 'Departamento creado exitosamente.', { id: insertId }, 201);
    } catch (err) {
        return error(res, 'Error al crear el departamento', err);
    }
};

export const getDepartamentos = async (req, res) => {
    try {
        const departamentos = await departamentoService.getAllDepartamentos();
        return exito(res, 'Departamentos obtenidos correctamente.', departamentos);
    } catch (err) {
        return error(res, 'Error al obtener departamentos', err);
    }
};

export const getDepartamento = async (req, res) => {
    try {
        const departamento = await departamentoService.getDepartamentoById(req.params.id);
        return exito(res, 'Departamento obtenido correctamente.', departamento);
    } catch (err) {
        return error(res, 'Error al obtener el departamento', err, 404);
    }
};

export const updateDepartamento = async (req, res) => {
    try {
        await departamentoService.updateDepartamento(req.params.id, req.body);
        return exito(res, 'Departamento actualizado exitosamente.');
    } catch (err) {
        return error(res, 'Error al actualizar el departamento', err);
    }
};

export const deleteDepartamento = async (req, res) => {
    try {
        await departamentoService.deleteDepartamento(req.params.id);
        return exito(res, 'Departamento eliminado exitosamente.');
    } catch (err) {
        const status = err.message.includes('encontrado') ? 404 : 400;
        return error(res, err.message, err, status);
    }
};
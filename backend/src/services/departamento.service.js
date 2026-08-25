// Autor: Brayan Azofeifa
// Descripcion: Lógica de negocio para administrar los departamentos 
// y manejar validaciones de base de datos.

import * as departamentoDao from '../daos/departamento.dao.js';

export const createDepartamento = async (data) => {
    return await departamentoDao.create(data);
};

export const getAllDepartamentos = async () => {
    return await departamentoDao.findAll();
};

export const getDepartamentoById = async (id) => {
    const departamento = await departamentoDao.findById(id);
    if (!departamento) throw new Error('Departamento no encontrado.');
    return departamento;
};

export const updateDepartamento = async (id, data) => {
    const departamento = await departamentoDao.findById(id);
    if (!departamento) throw new Error('Departamento no encontrado.');
    await departamentoDao.update(id, data);
};

export const deleteDepartamento = async (id) => {
    try {
        const deleted = await departamentoDao.deleteById(id);
        if (!deleted) throw new Error('Departamento no encontrado.');
    } catch (err) {
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
            throw new Error('No se puede eliminar el departamento porque tiene usuarios asociados.');
        }
        throw err;
    }
};
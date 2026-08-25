// Autor: Oscar Mario Alvarez
import api from '../../../api/api';

// Obtener todos los equipos
export const getAllEquipos = async () => {
    try {
        const response = await api.get('/equipos');
        return response.data?.data || response.data || [];
    } catch (error) {
        throw new Error(error.message || 'No se pudieron obtener los equipos.');
    }
};

// Obtener un equipo por ID
export const getEquipoById = async (id) => {
    try {
        const response = await api.get(`/equipos/${id}`);
        return response.data?.data || response.data || null;
    } catch (error) {
        throw new Error(error.message || 'No se pudo obtener el equipo.');
    }
};

// Crear un equipo
export const createEquipo = async (equipoData) => {
    try {
        const response = await api.post('/equipos', equipoData);
        return response.data?.data || response.data || null;
    } catch (error) {
        throw new Error(error.message || 'No se pudo crear el equipo.');
    }
};

// Actualizar un equipo
export const updateEquipo = async (id, equipoData) => {
    try {
        const response = await api.put(`/equipos/${id}`, equipoData);
        return response.data?.data || response.data || null;
    } catch (error) {
        throw new Error(error.message || 'No se pudo actualizar el equipo.');
    }
};

// Cambiar el estado de un equipo
export const changeEquipoStatus = async (id, estado) => {
    try {
        const response = await api.patch(`/equipos/${id}/estado`, { estado });
        return response.data?.data || response.data || null;
    } catch (error) {
        throw new Error(error.message || 'No se pudo cambiar el estado del equipo.');
    }
};

// Inactivar un equipo (Eliminación lógica)
export const deleteEquipo = async (id) => {
    try {
        const response = await api.patch(`/equipos/${id}/estado`, { estado: 'INACTIVO' });
        return response.data?.data || response.data || null;
    } catch (error) {
        throw new Error(error.message || 'No se pudo eliminar el equipo.');
    }
};

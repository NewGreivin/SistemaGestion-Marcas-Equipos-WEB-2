//Autor: Greivin Eliecer A.G

import api from '../../../api/api';

export const getUsuariosService = async () => {
    try {
        const response = await api.get('/usuarios');
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error al cargar la lista de usuarios');
    }
};

export const createUsuarioService = async (data) => {
    try {
        const response = await api.post('/usuarios', data);
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error al crear el usuario');
    }
};

export const updateUsuarioService = async (id, data) => {
    try {
        const response = await api.put(`/usuarios/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error al actualizar el usuario');
    }
};

export const deleteUsuarioService = async (id) => {
    try {
        const response = await api.delete(`/usuarios/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error al eliminar el usuario');
    }
};
//Autor: Greivin Eliecer A.G

import api from '../../../api/api';

export const getUsuariosService = async () => {
        const response = await api.get('/usuarios');
        return response.data;
};

export const createUsuarioService = async (data) => {
        const response = await api.post('/usuarios', data);
        return response.data;
};

export const updateUsuarioService = async (id, data) => {
        const response = await api.put(`/usuarios/${id}`, data);
        return response.data;
};

export const deleteUsuarioService = async (id) => {
        const response = await api.delete(`/usuarios/${id}`);
        return response.data;
};

export const getRoles = async () => {
        const response = await api.get('/usuarios/roles');
        return response.data?.data || [];
};
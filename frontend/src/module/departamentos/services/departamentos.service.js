import api from '../../../api/api';

const getDepartamentos = async () => {
    const response = await api.get('/departamentos');
    return response.data?.data || response.data || [];
};

const getDepartamento = async (id) => {
    const response = await api.get(`/departamentos/${id}`);
    return response.data;
};

const createDepartamento = async (datos) => {
    const response = await api.post('/departamentos', datos);
    return response.data;
};

const updateDepartamento = async (id, datos) => {
    const response = await api.put(`/departamentos/${id}`, datos);
    return response.data;
};

const deleteDepartamento = async (id) => {
    const response = await api.delete(`/departamentos/${id}`);
    return response.data;
};

export default { 
    getDepartamentos,
    getDepartamento,
    createDepartamento,
    updateDepartamento,
    deleteDepartamento,
};
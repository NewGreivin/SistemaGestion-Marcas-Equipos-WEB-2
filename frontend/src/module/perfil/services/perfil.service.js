//Autor: Greivin Eliecer A.G

import api from '../../../api/api';

const getPerfil = async () => {
    const response = await api.get('/usuarios/profile');
    return response.data; 
};

const updatePerfil = async (datos) => {
    const response = await api.put('/usuarios/profile', datos);
    return response.data;
};

export default { getPerfil, updatePerfil };
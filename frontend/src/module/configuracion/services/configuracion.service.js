// Autor: Greivin Eliecer A.G

import api from '../../../api/api';

const getConfiguracion = async () => {
    const response = await api.get('/config');
    return response.data;
};

const updateConfiguracion = async (datos) => {
    const response = await api.put('/config', datos);
    return response.data;
};

export default { getConfiguracion, updateConfiguracion };
// Autor: Greivin Arguedas

import * as configDao from '../daos/configuracion.dao.js';

export const getConfiguracion = async () => {
    const config = await configDao.getConfig();
    if (!config) throw new Error('Configuración no encontrada.');
    return config;
};

export const updateConfiguracion = async (data) => {
    const config = await configDao.getConfig();
    if (!config) {
        await configDao.insertConfig(data);
    } else {
        await configDao.updateConfig(config.id, data);
    }
};
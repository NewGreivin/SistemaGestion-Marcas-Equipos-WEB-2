// Autor: Greivin Arguedas

import * as configService from '../services/config.service.js';
import { exito, error } from '../utils/respuestaJson.js';

export const getConfiguracion = async (req, res) => {
    try {
        const config = await configService.getConfiguracion();
        return exito(res, 'Configuración obtenida.', config);
    } catch (err) {
        return error(res, 'Error al obtener configuración', err, 404);
    }
};

export const updateConfiguracion = async (req, res) => {
    try {
        await configService.updateConfiguracion(req.body);
        return exito(res, 'Configuración actualizada exitosamente.');
    } catch (err) {
        return error(res, 'Error al actualizar configuración', err);
    }
};
// Autor: Ricardo Chaves Campos

import * as dispositivosService from '../services/dispositivos.service.js';
import { exito, error } from '../utils/respuestaJson.js';


export const getDispositivos = async (req, res) => {
    try {
        const dispositivos = await dispositivosService.getDispositivosUsuario(
            req.usuario.id
        );

        return exito(
            res,
            'Dispositivos obtenidos correctamente.',
            dispositivos
        );
    } catch (err) {
        return error(res, 'Error al obtener los dispositivos', err);
    }
};


export const createDispositivo = async (req, res) => {
    try {
        const dispositivo = await dispositivosService.createDispositivo(
            req.usuario.id,
            req.body
        );

        return exito(
            res,
            'Dispositivo registrado exitosamente.',
            dispositivo,
            201
        );
    } catch (err) {
        return error(res, 'Error al registrar el dispositivo', err);
    }
};
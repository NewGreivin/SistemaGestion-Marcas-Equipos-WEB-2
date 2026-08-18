// Autor: Marisol Alfaro
// Descripción: Gestiona las solicitudes para consultar el historial de préstamos y devoluciones.
// Uso: Recibe los filtros enviados en la solicitud y utiliza el servicio de historial.

import * as historialService from '../services/historial.service.js';
import { exito, error } from '../utils/respuestaJson.js';

export const getHistorial = async (req, res) => {
    try {
        const filtros = {
            usuario: req.query.usuario,
            fecha: req.query.fecha,
            estado: req.query.estado,
            equipo: req.query.equipo
        };

        const historial = await historialService.getHistorial(filtros);
        return exito(res, 'Historial obtenido correctamente.', historial);
    } catch (err) {
        return error(res, 'Error al obtener el historial', err);
    }
};

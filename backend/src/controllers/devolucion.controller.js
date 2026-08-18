// Autor: Marisol Alfaro
// Descripción: Gestiona las solicitudes relacionadas con las devoluciones de equipos.
// Uso: Recibe las solicitudes HTTP y utiliza el servicio de devoluciones para procesarlas.

import * as devolucionService from '../services/devolucion.service.js';
import { exito, error } from '../utils/respuestaJson.js';

const codigoErrorDevolucion = (err) => {
    if (err.message.includes('no encontrado') || err.message.includes('no pertenece')) return 404;
    if (err.message.includes('FINALIZADO') ||
        err.message.includes('DEVUELTO') ||
        err.message.includes('PENDIENTES')) return 409;
    return 400;
};

export const devolverEquipo = async (req, res) => {
    try {
        const devolucion = await devolucionService.devolverEquipo(
            req.params.prestamoId,
            req.params.equipoId
        );

        return exito(res, 'Equipo devuelto correctamente.', devolucion);
    } catch (err) {
        return error(res, 'Error al realizar la devolución individual', err, codigoErrorDevolucion(err));
    }
};

export const devolverPrestamoCompleto = async (req, res) => {
    try {
        const devolucion = await devolucionService.devolverPrestamoCompleto(req.params.prestamoId);
        return exito(res, 'Devolución completa realizada correctamente.', devolucion);
    } catch (err) {
        return error(res, 'Error al realizar la devolución completa', err, codigoErrorDevolucion(err));
    }
};

export const getEstadoDevolucion = async (req, res) => {
    try {
        const devolucion = await devolucionService.getEstadoDevolucion(req.params.prestamoId);
        return exito(res, 'Estado de devolución obtenido correctamente.', devolucion);
    } catch (err) {
        const codigo = err.message.includes('no encontrado') ? 404 : 500;
        return error(res, 'Error al consultar el estado de devolución', err, codigo);
    }
};

// Autor: Marisol Alfaro
// Descripción: Gestiona las solicitudes relacionadas con la creación y consulta de préstamos.
// Uso: Recibe las solicitudes de las rutas y utiliza el servicio de préstamos para procesarlas.

import * as prestamoService from '../services/prestamo.service.js';
import { exito, error } from '../utils/respuestaJson.js';

const codigoErrorPrestamo = (err) => {
    if (err.message.includes('no encontrado') || err.message.includes('no existe')) return 404;
    if (err.message.includes('no está disponible') ||
        err.message.includes('más de una vez') ||
        err.message.includes('préstamo activo')) return 409;
    return 400;
};

export const getOpcionesPrestamo = async (req, res) => {
    try {
        const opciones = await prestamoService.getOpcionesPrestamo();
        return exito(res, 'Usuarios y equipos disponibles obtenidos correctamente.', opciones);
    } catch (err) {
        return error(res, 'Error al obtener las opciones del préstamo', err);
    }
};

export const createPrestamo = async (req, res) => {
    try {
        const { usuario_id, equipos } = req.body;
        const prestamo = await prestamoService.createPrestamo(usuario_id, equipos, req.usuario.id);
        return exito(res, 'Préstamo creado exitosamente.', prestamo, 201);
    } catch (err) {
        return error(res, 'Error al crear el préstamo', err, codigoErrorPrestamo(err));
    }
};

export const getAllPrestamos = async (req, res) => {
    try {
        const prestamos = await prestamoService.getAllPrestamos();
        return exito(res, 'Préstamos obtenidos correctamente.', prestamos);
    } catch (err) {
        return error(res, 'Error al obtener los préstamos', err);
    }
};

export const getPrestamoById = async (req, res) => {
    try {
        const prestamo = await prestamoService.getPrestamoById(req.params.id);
        return exito(res, 'Préstamo obtenido correctamente.', prestamo);
    } catch (err) {
        const codigo = err.message.includes('no encontrado') ? 404 : 500;
        return error(res, 'Error al obtener el préstamo', err, codigo);
    }
};

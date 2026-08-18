// Autor: Marisol Alfaro
// Descripción: Contiene la lógica para realizar devoluciones individuales y completas.
// Uso: Procesa las devoluciones y controla la actualización de los estados correspondientes.

import pool from '../config/database.js';
import * as devolucionDao from '../daos/devolucion.dao.js';

const finalizarSiCorresponde = async (prestamoId, connection) => {
    const pendientes = await devolucionDao.contarPendientes(prestamoId, connection);

    if (pendientes === 0) {
        await devolucionDao.finalizarPrestamo(prestamoId, connection);
    }
};

export const devolverEquipo = async (prestamoId, equipoId) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const prestamo = await devolucionDao.findPrestamoForUpdate(prestamoId, connection);
        if (!prestamo) {
            throw new Error('Préstamo no encontrado.');
        }

        if (prestamo.estado === 'FINALIZADO') {
            throw new Error('El préstamo ya se encuentra FINALIZADO.');
        }

        const detalle = await devolucionDao.findDetalleForUpdate(prestamoId, equipoId, connection);
        if (!detalle) {
            throw new Error('El equipo indicado no pertenece a este préstamo.');
        }

        if (detalle.estado_devolucion === 'DISPONIBLE') {
            throw new Error(`El equipo ${detalle.codigo} ya fue DEVUELTO.`);
        }

        await devolucionDao.marcarDetalleDevuelto(prestamoId, equipoId, connection);
        await devolucionDao.actualizarEquipoDisponible(equipoId, connection);
        await finalizarSiCorresponde(prestamoId, connection);

        await connection.commit();
        return await devolucionDao.findEstadoDevolucion(prestamoId);
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

export const devolverPrestamoCompleto = async (prestamoId) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const prestamo = await devolucionDao.findPrestamoForUpdate(prestamoId, connection);
        if (!prestamo) {
            throw new Error('Préstamo no encontrado.');
        }

        if (prestamo.estado === 'FINALIZADO') {
            throw new Error('El préstamo ya se encuentra FINALIZADO.');
        }

        const pendientes = await devolucionDao.findDetallesPendientesForUpdate(prestamoId, connection);
        if (pendientes.length === 0) {
            throw new Error('El préstamo no tiene equipos PENDIENTES de devolución.');
        }

        await devolucionDao.marcarDetallesDevueltos(prestamoId, connection);

        for (const detalle of pendientes) {
            await devolucionDao.actualizarEquipoDisponible(detalle.equipo_id, connection);
        }

        await devolucionDao.finalizarPrestamo(prestamoId, connection);

        await connection.commit();
        return await devolucionDao.findEstadoDevolucion(prestamoId);
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

export const getEstadoDevolucion = async (prestamoId) => {
    const devolucion = await devolucionDao.findEstadoDevolucion(prestamoId);

    if (!devolucion) {
        throw new Error('Préstamo no encontrado.');
    }

    return devolucion;
};

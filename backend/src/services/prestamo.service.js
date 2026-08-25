// Autor: Marisol Alfaro
// Descripción: Contiene la lógica necesaria para crear y consultar préstamos de equipos.
// Uso: Es utilizado por el controlador para validar y procesar las operaciones de préstamos.

import pool from '../config/database.js';
import * as prestamoDao from '../daos/prestamo.dao.js';
import * as prestamoDetalleDao from '../daos/prestamoDetalle.dao.js';

export const getOpcionesPrestamo = async () => {
    const [usuarios, equipos] = await Promise.all([
        prestamoDao.findUsuariosDisponibles(),
        prestamoDao.findEquiposDisponibles()
    ]);

    return { usuarios, equipos };
};

export const createPrestamo = async (usuarioId, equiposIds, encargadoId) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const usuario = await prestamoDao.findUsuarioPrestamoById(usuarioId, connection);
        if (!usuario) {
            throw new Error('El usuario seleccionado no existe o no corresponde a un usuario válido para préstamo.');
        }

        const idsUnicos = new Set(equiposIds);
        if (idsUnicos.size !== equiposIds.length) {
            throw new Error('El mismo equipo no puede aparecer más de una vez en el préstamo.');
        }

        for (const equipoId of equiposIds) {
            const equipo = await prestamoDao.findEquipoByIdForUpdate(equipoId, connection);

            if (!equipo) {
                throw new Error(`El equipo con ID ${equipoId} no existe.`);
            }

            if (equipo.estado !== 'DISPONIBLE') {
                throw new Error(`El equipo ${equipo.codigo} no está disponible para préstamo.`);
            }

            const prestado = await prestamoDao.equipoTienePrestamoActivo(equipoId, connection);
            if (prestado) {
                throw new Error(`El equipo ${equipo.codigo} ya se encuentra asociado a un préstamo activo.`);
            }
        }

        const prestamoId = await prestamoDao.create(usuarioId, encargadoId, connection);
        await prestamoDetalleDao.createMany(prestamoId, equiposIds, connection);

        for (const equipoId of equiposIds) {
            await prestamoDao.updateEquipoEstado(equipoId, 'PRESTADO', connection);
        }

        await connection.commit();
        return await getPrestamoById(prestamoId);
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

export const getAllPrestamos = async () => {
    const prestamos = await prestamoDao.findAll();

    return await Promise.all(prestamos.map(async prestamo => {
        prestamo.equipos = await prestamoDetalleDao.findByPrestamoId(prestamo.id);
        return prestamo;
    }));
};

export const getPrestamoById = async (id) => {
    const prestamo = await prestamoDao.findById(id);
    if (!prestamo) {
        throw new Error('Préstamo no encontrado.');
    }

    prestamo.equipos = await prestamoDetalleDao.findByPrestamoId(id);
    return prestamo;
};

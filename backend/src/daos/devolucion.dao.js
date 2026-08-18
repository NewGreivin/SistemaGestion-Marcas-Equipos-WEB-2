// Autor: Marisol Alfaro
// Descripción: Gestiona el acceso a los datos relacionados con las devoluciones.
// Uso: Realiza consultas y actualizaciones de préstamos y equipos en la base de datos.

import pool from '../config/database.js';

export const findPrestamoForUpdate = async (prestamoId, connection) => {
    const [rows] = await connection.query(
        `SELECT id, usuario_id, encargado_id, fecha, estado
         FROM prestamos
         WHERE id = ?
         FOR UPDATE`,
        [prestamoId]
    );

    return rows.length > 0 ? rows[0] : null;
};

export const findDetalleForUpdate = async (prestamoId, equipoId, connection) => {
    const [rows] = await connection.query(
        `SELECT pd.id, pd.prestamo_id, pd.equipo_id, pd.estado_devolucion,
                e.codigo, e.descripcion, e.estado AS estado_equipo
         FROM prestamo_detalle pd
         JOIN equipos e ON e.id = pd.equipo_id
         WHERE pd.prestamo_id = ? AND pd.equipo_id = ?
         FOR UPDATE`,
        [prestamoId, equipoId]
    );

    return rows.length > 0 ? rows[0] : null;
};

export const findDetallesPendientesForUpdate = async (prestamoId, connection) => {
    const [rows] = await connection.query(
        `SELECT pd.id, pd.prestamo_id, pd.equipo_id, pd.estado_devolucion,
                e.codigo, e.descripcion
         FROM prestamo_detalle pd
         JOIN equipos e ON e.id = pd.equipo_id
         WHERE pd.prestamo_id = ?
           AND pd.estado_devolucion = 'PRESTADO'
         FOR UPDATE`,
        [prestamoId]
    );

    return rows;
};

export const marcarDetalleDevuelto = async (prestamoId, equipoId, connection) => {
    await connection.query(
        `UPDATE prestamo_detalle
         SET estado_devolucion = 'DISPONIBLE'
         WHERE prestamo_id = ? AND equipo_id = ?`,
        [prestamoId, equipoId]
    );
};

export const marcarDetallesDevueltos = async (prestamoId, connection) => {
    await connection.query(
        `UPDATE prestamo_detalle
         SET estado_devolucion = 'DISPONIBLE'
         WHERE prestamo_id = ? AND estado_devolucion = 'PRESTADO'`,
        [prestamoId]
    );
};

export const actualizarEquipoDisponible = async (equipoId, connection) => {
    await connection.query(
        `UPDATE equipos
         SET estado = 'DISPONIBLE'
         WHERE id = ?`,
        [equipoId]
    );
};

export const contarPendientes = async (prestamoId, connection = pool) => {
    const [rows] = await connection.query(
        `SELECT COUNT(*) AS pendientes
         FROM prestamo_detalle
         WHERE prestamo_id = ?
           AND estado_devolucion = 'PRESTADO'`,
        [prestamoId]
    );

    return Number(rows[0].pendientes);
};

export const finalizarPrestamo = async (prestamoId, connection) => {
    await connection.query(
        `UPDATE prestamos
         SET estado = 'FINALIZADO'
         WHERE id = ?`,
        [prestamoId]
    );
};

export const findEstadoDevolucion = async (prestamoId) => {
    const [prestamos] = await pool.query(
        `SELECT p.id, p.fecha, p.estado,
                u.id AS usuario_id,
                u.nombre_completo AS usuario
         FROM prestamos p
         JOIN usuarios u ON u.id = p.usuario_id
         WHERE p.id = ?
         LIMIT 1`,
        [prestamoId]
    );

    if (prestamos.length === 0) return null;

    const [equipos] = await pool.query(
        `SELECT pd.equipo_id,
                e.codigo,
                e.descripcion,
                CASE
                    WHEN pd.estado_devolucion = 'DISPONIBLE' THEN 'DEVUELTO'
                    ELSE 'PENDIENTE'
                END AS estado
         FROM prestamo_detalle pd
         JOIN equipos e ON e.id = pd.equipo_id
         WHERE pd.prestamo_id = ?
         ORDER BY pd.id ASC`,
        [prestamoId]
    );

    const prestamo = prestamos[0];

    return {
        id: prestamo.id,
        usuario_id: prestamo.usuario_id,
        usuario: prestamo.usuario,
        fecha: prestamo.fecha,
        estado: prestamo.estado === 'FINALIZADO' ? 'FINALIZADO' : 'PENDIENTE',
        equipos
    };
};

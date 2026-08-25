// Autor: Marisol Alfaro
// Descripción: Gestiona las consultas a la base de datos relacionadas con el historial.
// Uso: Obtiene los registros aplicando filtros por usuario, fecha, estado y equipo.

import pool from '../config/database.js';
import Historial from '../models/historial.model.js';

export const findHistorial = async (filtros = {}) => {
    const condiciones = [];
    const valores = [];

    if (filtros.usuario) {
        condiciones.push('p.usuario_id = ?');
        valores.push(filtros.usuario);
    }

    if (filtros.fecha) {
        condiciones.push('DATE(p.fecha) = ?');
        valores.push(filtros.fecha);
    }

    if (filtros.equipo) {
        condiciones.push('pd.equipo_id = ?');
        valores.push(filtros.equipo);
    }

    if (filtros.estado === 'FINALIZADO') {
        condiciones.push("p.estado = 'FINALIZADO'");
    } else if (filtros.estado === 'DEVUELTO') {
        condiciones.push("p.estado = 'ACTIVO' AND pd.estado_devolucion = 'DISPONIBLE'");
    } else if (filtros.estado === 'PENDIENTE') {
        condiciones.push("p.estado = 'ACTIVO' AND pd.estado_devolucion = 'PRESTADO'");
    }

    const where = condiciones.length > 0
        ? `WHERE ${condiciones.join(' AND ')}`
        : '';

    const [rows] = await pool.query(
        `SELECT p.id AS prestamo_id,
                p.usuario_id,
                u.nombre_completo AS usuario,
                p.fecha,
                CASE
                    WHEN p.estado = 'FINALIZADO' THEN 'FINALIZADO'
                    WHEN pd.estado_devolucion = 'DISPONIBLE' THEN 'DEVUELTO'
                    ELSE 'PENDIENTE'
                END AS estado,
                pd.equipo_id,
                e.codigo AS equipo,
                e.descripcion
         FROM prestamos p
         JOIN usuarios u ON u.id = p.usuario_id
         JOIN prestamo_detalle pd ON pd.prestamo_id = p.id
         JOIN equipos e ON e.id = pd.equipo_id
         ${where}
         ORDER BY p.fecha DESC, p.id DESC, pd.id ASC`,
        valores
    );

    return rows.map(row => new Historial(row));
};

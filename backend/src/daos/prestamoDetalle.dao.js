// Autor: Marisol Alfaro
// Descripción: Gestiona los datos de los equipos asociados a cada préstamo.
// Uso: Permite registrar y consultar los detalles de equipos pertenecientes a un préstamo.

import pool from '../config/database.js';
import PrestamoDetalle from '../models/prestamoDetalle.model.js';

export const createMany = async (prestamoId, equiposIds, connection) => {
    const valores = equiposIds.map(equipoId => [prestamoId, equipoId, 'PRESTADO']);

    await connection.query(
        `INSERT INTO prestamo_detalle (prestamo_id, equipo_id, estado_devolucion)
         VALUES ?`,
        [valores]
    );
};

export const findByPrestamoId = async (prestamoId) => {
    const [rows] = await pool.query(
        `SELECT pd.id, pd.prestamo_id, pd.equipo_id,
                e.codigo,
                e.descripcion,
                pd.descripcion AS observacion,
                pd.estado_devolucion
         FROM prestamo_detalle pd
         JOIN equipos e ON e.id = pd.equipo_id
         WHERE pd.prestamo_id = ?
         ORDER BY pd.id ASC`,
        [prestamoId]
    );

    return rows.map(row => new PrestamoDetalle(row));
};

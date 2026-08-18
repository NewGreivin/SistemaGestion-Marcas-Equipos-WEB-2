// Autor: Marisol Alfaro
// Descripción: Gestiona el acceso a los datos principales de los préstamos.
// Uso: Realiza las consultas necesarias para registrar y obtener préstamos de la base de datos.

import pool from '../config/database.js';
import Prestamo from '../models/prestamo.model.js';

export const findUsuarioPrestamoById = async (id, connection = pool) => {
    const [rows] = await connection.query(
        `SELECT u.id, u.nombre_completo, u.correo, u.username
         FROM usuarios u
         JOIN roles r ON r.id = u.rol_id
         WHERE u.id = ? AND r.nombre = 'Usuario'
         LIMIT 1`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
};

export const findEquipoByIdForUpdate = async (id, connection) => {
    const [rows] = await connection.query(
        `SELECT id, codigo, descripcion, estado
         FROM equipos
         WHERE id = ?
         FOR UPDATE`,
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
};

export const equipoTienePrestamoActivo = async (equipoId, connection = pool) => {
    const [rows] = await connection.query(
        `SELECT pd.id
         FROM prestamo_detalle pd
         JOIN prestamos p ON p.id = pd.prestamo_id
         WHERE pd.equipo_id = ?
           AND pd.estado_devolucion = 'PRESTADO'
           AND p.estado = 'ACTIVO'
         LIMIT 1`,
        [equipoId]
    );
    return rows.length > 0;
};

export const create = async (usuarioId, encargadoId, connection) => {
    const [result] = await connection.query(
        `INSERT INTO prestamos (usuario_id, encargado_id, estado)
         VALUES (?, ?, 'ACTIVO')`,
        [usuarioId, encargadoId]
    );
    return result.insertId;
};

export const updateEquipoEstado = async (equipoId, estado, connection) => {
    await connection.query(
        'UPDATE equipos SET estado = ? WHERE id = ?',
        [estado, equipoId]
    );
};

export const findAll = async () => {
    const [rows] = await pool.query(
        `SELECT p.id, p.usuario_id, p.encargado_id, p.fecha, p.estado,
                u.nombre_completo AS usuario,
                e.nombre_completo AS encargado
         FROM prestamos p
         JOIN usuarios u ON u.id = p.usuario_id
         JOIN usuarios e ON e.id = p.encargado_id
         ORDER BY p.fecha DESC, p.id DESC`
    );
    return rows.map(row => new Prestamo(row));
};

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT p.id, p.usuario_id, p.encargado_id, p.fecha, p.estado,
                u.nombre_completo AS usuario,
                e.nombre_completo AS encargado
         FROM prestamos p
         JOIN usuarios u ON u.id = p.usuario_id
         JOIN usuarios e ON e.id = p.encargado_id
         WHERE p.id = ?
         LIMIT 1`,
        [id]
    );
    return rows.length > 0 ? new Prestamo(rows[0]) : null;
};

export const findUsuariosDisponibles = async () => {
    const [rows] = await pool.query(
        `SELECT u.id, u.nombre_completo, u.correo, u.username
         FROM usuarios u
         JOIN roles r ON r.id = u.rol_id
         WHERE r.nombre = 'Usuario'
         ORDER BY u.nombre_completo ASC`
    );
    return rows;
};

export const findEquiposDisponibles = async () => {
    const [rows] = await pool.query(
        `SELECT e.id, e.codigo, e.descripcion, e.imagen, e.estado
         FROM equipos e
         WHERE e.estado = 'DISPONIBLE'
           AND NOT EXISTS (
               SELECT 1
               FROM prestamo_detalle pd
               JOIN prestamos p ON p.id = pd.prestamo_id
               WHERE pd.equipo_id = e.id
                 AND pd.estado_devolucion = 'PRESTADO'
                 AND p.estado = 'ACTIVO'
           )
         ORDER BY e.codigo ASC`
    );
    return rows;
};

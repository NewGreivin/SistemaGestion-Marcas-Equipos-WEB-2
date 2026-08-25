// Autor: Ricardo Chaves Campos

import pool from '../config/database.js';
import Dispositivo from '../models/dispositivos.model.js';


export const findByUsuarioId = async (usuario_id) => {
    const [rows] = await pool.query(
        `SELECT id, identificador, nombre, descripcion, fecha_registro, usuario_id, estado
         FROM dispositivos
         WHERE usuario_id = ?
         ORDER BY fecha_registro DESC`,
        [usuario_id]
    );

    return rows.map((row) => new Dispositivo(row));
};


export const findByIdentificadorAndUsuarioId = async (identificador, usuario_id) => {
    const [rows] = await pool.query(
        `SELECT id, identificador, nombre, descripcion, fecha_registro, usuario_id, estado
         FROM dispositivos
         WHERE identificador = ? AND usuario_id = ?
         LIMIT 1`,
        [identificador, usuario_id]
    );

    if (rows.length === 0) {
        return null;
    }

    return new Dispositivo(rows[0]);
};


export const create = async (dispositivo) => {
    const [result] = await pool.query(
        `INSERT INTO dispositivos
        (identificador, nombre, descripcion, usuario_id, estado)
        VALUES (?, ?, ?, ?, ?)`,
        [
            dispositivo.identificador,
            dispositivo.nombre,
            dispositivo.descripcion,
            dispositivo.usuario_id,
            dispositivo.estado
        ]
    );

    return result.insertId;
};
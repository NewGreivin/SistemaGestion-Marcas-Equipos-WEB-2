// Autor: Ricardo Chaves Campos

import pool from "../config/database.js";
import Marca from "../models/marca.model.js";

export const findUltimaByUsuario = async (usuario_id) => {
    const [rows] = await pool.query(`
        SELECT
            id,
            usuario_id,
            dispositivo_id,
            fecha,
            hora,
            tipo_marca,
            direccion_ip
        FROM marcas
        WHERE usuario_id = ?
        ORDER BY fecha DESC, hora DESC, id DESC
        LIMIT 1`,
        [usuario_id]
    );

    if (rows.length === 0) {
        return null;
    }

    return new Marca(rows[0]);
}

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            usuario_id,
            dispositivo_id,
            fecha,
            hora,
            tipo_marca,
            direccion_ip
        FROM marcas
        WHERE id = ?
        LIMIT 1`,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return new Marca(rows[0]);
};

export const findDispositivoByUsuario = async (dispositivo_id, usuario_id) => {
    const [rows] = await pool.query(
        `
        SELECT
            id,
            identificador,
            nombre,
            descripcion,
            fecha_registro,
            estado,
            usuario_id
        FROM dispositivos
        WHERE id = ?
        AND usuario_id = ?
        LIMIT 1
        `,
        [
            dispositivo_id,
            usuario_id
        ]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};

export const create = async (marca) => {
    const [result] = await pool.query(
        `INSERT INTO marcas (
            usuario_id,
            dispositivo_id,
            fecha,
            hora,
            tipo_marca,
            direccion_ip
        )
        VALUES (
            ?,
            ?,
            DATE(CONVERT_TZ(NOW(), '+00:00', '-06:00')),
            TIME(CONVERT_TZ(NOW(), '+00:00', '-06:00')),
            ?,
            ?
        )`,
        [
            marca.usuario_id,
            marca.dispositivo_id,
            marca.tipo_marca,
            marca.direccion_ip
        ]
    );

    return result.insertId;
};

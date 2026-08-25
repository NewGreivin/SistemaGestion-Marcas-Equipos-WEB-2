// Autor: Oscar Mario Alvarez Cruz

import pool from '../config/database.js';
import Equipo from '../models/equipo.model.js';

export const findAll = async () => {
    const [rows] = await pool.query('SELECT * FROM equipos ORDER BY id DESC');
    return rows.map(row => new Equipo(row));
};

export const findById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM equipos WHERE id = ?', [id]);
    return rows.length > 0 ? new Equipo(rows[0]) : null;
};

export const findByCodigo = async (codigo) => {
    const [rows] = await pool.query('SELECT * FROM equipos WHERE codigo = ?', [codigo]);
    return rows.length > 0 ? new Equipo(rows[0]) : null;
};

export const create = async (equipo) => {
    const [result] = await pool.query(
        'INSERT INTO equipos (codigo, descripcion, imagen, estado) VALUES (?, ?, ?, ?)',
        [equipo.codigo, equipo.descripcion, equipo.imagen, equipo.estado || 'DISPONIBLE']
    );
    return result.insertId;
};

export const update = async (id, equipo) => {
    const [result] = await pool.query(
        'UPDATE equipos SET codigo = ?, descripcion = ?, imagen = ?, estado = ? WHERE id = ?',
        [equipo.codigo, equipo.descripcion, equipo.imagen, equipo.estado, id]
    );
    return result.affectedRows > 0;
};

export const updateEstado = async (id, estado) => {
    const [result] = await pool.query(
        'UPDATE equipos SET estado = ? WHERE id = ?',
        [estado, id]
    );
    return result.affectedRows > 0;
};

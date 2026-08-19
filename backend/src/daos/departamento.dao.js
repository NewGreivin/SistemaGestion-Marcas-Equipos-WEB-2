// Autor: Brayan Azofeifa
// Descripción: Data Access Object para gestionar las 
// consultas SQL de departamentos en MySQL.

import pool from '../config/database.js';
import Departamento from '../models/departamento.model.js';

export const create = async (departamento) => {
    const [result] = await pool.query(
        'INSERT INTO departamentos (nombre, descripcion, encargado) VALUES (?, ?, ?)',
        [departamento.nombre, departamento.descripcion, departamento.encargado]
    );
    return result.insertId;
};

export const findAll = async () => {
    const [rows] = await pool.query('SELECT * FROM departamentos');
    return rows.map(row => new Departamento(row));
};

export const findById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM departamentos WHERE id = ?', [id]);
    return rows.length > 0 ? new Departamento(rows[0]) : null;
};

export const update = async (id, data) => {
    await pool.query(
        'UPDATE departamentos SET nombre = ?, descripcion = ?, encargado = ? WHERE id = ?',
        [data.nombre, data.descripcion, data.encargado, id]
    );
};

export const deleteById = async (id) => {
    const [result] = await pool.query('DELETE FROM departamentos WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
import pool from '../config/database.js';
import Usuario from '../models/users.model.js';

export const findByCorreoOrUsername = async (identificador) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ? OR username = ?', [identificador, identificador]);
    return rows.length > 0 ? new Usuario(rows[0]) : null;
};

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT u.*, d.nombre AS departamento, r.nombre AS rol 
         FROM usuarios u 
         JOIN departamentos d ON u.departamento_id = d.id 
         JOIN roles r ON u.rol_id = r.id 
         WHERE u.id = ?`,
        [id]
    );
    return rows.length > 0 ? new Usuario(rows[0]) : null;
};

export const findAll = async () => {
    const [rows] = await pool.query('SELECT id, nombre_completo, correo, username, departamento_id, rol_id FROM usuarios');
    return rows;
};

export const findRolByName = async (nombre) => {
    const [rows] = await pool.query('SELECT id FROM roles WHERE nombre = ? LIMIT 1', [nombre]);
    return rows.length > 0 ? rows[0].id : null;
};

export const create = async (usuario) => {
    const [result] = await pool.query(
        'INSERT INTO usuarios (nombre_completo, fecha_nacimiento, correo, username, password_hash, departamento_id, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [usuario.nombre_completo, usuario.fecha_nacimiento, usuario.correo, usuario.username, usuario.password_hash, usuario.departamento_id, usuario.rol_id]
    );
    return result.insertId;
};

export const updateProfile = async (id, data) => {
    await pool.query(
        'UPDATE usuarios SET nombre_completo = ?, fecha_nacimiento = ?, departamento_id = ? WHERE id = ?',
        [data.nombre_completo, data.fecha_nacimiento, data.departamento_id, id]
    );
};

export const updatePassword = async (id, password_hash) => {
    await pool.query('UPDATE usuarios SET password_hash = ? WHERE id = ?', [password_hash, id]);
};

export const deleteById = async (id) => {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
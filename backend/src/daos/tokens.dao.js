import pool from '../config/database.js';

export const createToken = async (usuario_id, token, fecha_expiracion) => {
    await pool.query(
        'INSERT INTO tokens_recuperacion (usuario_id, token, fecha_expiracion) VALUES (?, ?, ?)',
        [usuario_id, token, fecha_expiracion]
    );
};

export const findValidToken = async (token) => {
    const [rows] = await pool.query(
        'SELECT * FROM tokens_recuperacion WHERE token = ? AND utilizado = FALSE AND fecha_expiracion > NOW()',
        [token]
    );
    return rows.length > 0 ? rows[0] : null;
};

export const markTokenAsUsed = async (id) => {
    await pool.query('UPDATE tokens_recuperacion SET utilizado = TRUE WHERE id = ?', [id]);
};
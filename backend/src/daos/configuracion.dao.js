import pool from '../config/database.js';
import Configuracion from '../models/configuracion.model.js';

export const getConfig = async () => {
    const [rows] = await pool.query('SELECT * FROM configuracion LIMIT 1');
    return rows.length > 0 ? new Configuracion(rows[0]) : null;
};

export const insertConfig = async (data) => {
    await pool.query(
        'INSERT INTO configuracion (nombre_institucion, rango_ip_permitido, tiempo_maximo_sesion, tamano_maximo_archivos) VALUES (?, ?, ?, ?)',
        [data.nombre_institucion, data.rango_ip_permitido, data.tiempo_maximo_sesion, data.tamano_maximo_archivos]
    );
};

export const updateConfig = async (id, data) => {
    await pool.query(
        'UPDATE configuracion SET nombre_institucion = ?, rango_ip_permitido = ?, tiempo_maximo_sesion = ?, tamano_maximo_archivos = ? WHERE id = ?',
        [data.nombre_institucion, data.rango_ip_permitido, data.tiempo_maximo_sesion, data.tamano_maximo_archivos, id]
    );
};
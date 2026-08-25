// Autor: Brayan Azofeifa
// Descripción: Consultas SQL dinámicas y agrupación de horas 
// para generar los reportes de marcas.

import pool from '../config/database.js';
import Reporte from '../models/reporte.model.js';

export const getReporteMarcas = async (filtros) => {
    let query = `
        SELECT 
            u.nombre_completo AS Usuario,
            DATE_FORMAT(m.fecha, '%Y-%m-%d') AS Fecha,
            MIN(CASE WHEN m.tipo_marca = 'ENTRADA' THEN m.hora END) AS Entrada,
            MAX(CASE WHEN m.tipo_marca = 'SALIDA' THEN m.hora END) AS Salida,
            d.nombre AS Dispositivo,
            m.direccion_ip AS IP
        FROM marcas m
        JOIN usuarios u ON m.usuario_id = u.id
        JOIN dispositivos d ON m.dispositivo_id = d.id
        WHERE 1=1
    `;
    const params = [];

    if (filtros.usuario) {
        query += " AND u.id = ?";
        params.push(filtros.usuario);
    }
    if (filtros.anio) {
        query += " AND YEAR(m.fecha) = ?";
        params.push(filtros.anio);
    }
    if (filtros.mes) {
        query += " AND MONTH(m.fecha) = ?";
        params.push(filtros.mes);
    }
    if (filtros.dia) {
        query += " AND DAY(m.fecha) = ?";
        params.push(filtros.dia);
    }
    if (filtros.departamento) {
        query += " AND u.departamento_id = ?";
        params.push(filtros.departamento);
    }

    query += " GROUP BY m.usuario_id, m.fecha, d.nombre, m.direccion_ip, u.nombre_completo ORDER BY m.fecha DESC";

    const [rows] = await pool.query(query, params);
    return rows.map(row => new Reporte(row));
};

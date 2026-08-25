// Autor: Brayan Azofeifa
// Descripcion: Capa de servicios que procesa la información de 
// los reportes para enviarla al controlador.

import * as reporteDao from '../daos/reporte.dao.js';

export const getReporteMarcas = async (filtros) => {
    return await reporteDao.getReporteMarcas(filtros);
};
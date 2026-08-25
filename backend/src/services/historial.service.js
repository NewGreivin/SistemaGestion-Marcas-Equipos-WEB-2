// Autor: Marisol Alfaro
// Descripción: Contiene la lógica para consultar y filtrar el historial del sistema.
// Uso: Procesa los filtros antes de realizar la consulta del historial.

import * as historialDao from '../daos/historial.dao.js';

export const getHistorial = async (filtros) => {
    return await historialDao.findHistorial(filtros);
};

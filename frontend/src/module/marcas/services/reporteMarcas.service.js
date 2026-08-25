/**
 * Autor: Brayan Azofeifa
 * Descripción: Centraliza las solicitudes del módulo de reportes de marcas y la exportación de archivos.
 * Uso: Es consumido por el hook useReporteMarcas para comunicarse con la API.
 */

import api from '../../../api/api';

export const getReporteMarcasService = async (filtros = '') => {
    return await api.get(`/reportes/marcas?${filtros}`);
};

export const exportarJSONService = async (filtros = '') => {
    const response = await api.get(`/reportes/marcas?exportar=json&${filtros}`, { 
        responseType: 'blob' 
    });
    
    // Crear enlace temporal para descargar el archivo recibido
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reporte_marcas.json');
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const exportarPDFService = async (filtros = '') => {
    const response = await api.get(`/reportes/marcas?exportar=pdf&${filtros}`, { 
        responseType: 'blob' 
    });
    
    // Crear enlace temporal para descargar el archivo recibido
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reporte_marcas.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
};
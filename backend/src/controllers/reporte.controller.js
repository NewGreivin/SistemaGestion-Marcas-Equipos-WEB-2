// Autor: Brayan Azofeifa
// Descripcion: Controlador para emitir los reportes con filtros 
// y manejar la exportación a formatos JSON y PDF.

import * as reporteService from '../services/reporte.service.js';
import { exito, error } from '../utils/respuestaJson.js';

export const getReporteMarcas = async (req, res) => {
    try {
        const { usuario, anio, mes, dia, departamento, exportar } = req.query;
        
        const filtros = { usuario, anio, mes, dia, departamento };
        const datos = await reporteService.getReporteMarcas(filtros);

        if (exportar === 'json') {
            res.header('Content-Type', 'application/json');
            res.attachment('reporte_marcas.json');
            return res.send(JSON.stringify(datos, null, 2));
        }
        
        if (exportar === 'pdf') {
            try {
                const PDFDocument = (await import('pdfkit')).default;
                const doc = new PDFDocument({ margin: 30 });
                
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename="reporte_marcas.pdf"');
                
                doc.pipe(res);
                doc.fontSize(18).text('Reporte de Marcas', { align: 'center' });
                doc.moveDown();
                
                datos.forEach(item => {
                    const horaEntrada = item.Entrada || 'N/A';
                    const horaSalida = item.Salida || 'N/A';
                    doc.fontSize(12).text(`Usuario: ${item.Usuario}`);
                    doc.fontSize(10).text(`Fecha: ${item.Fecha} | Entrada: ${horaEntrada} | Salida: ${horaSalida}`);
                    doc.text(`Dispositivo: ${item.Dispositivo} | IP: ${item.IP}`);
                    doc.moveDown();
                });
                
                doc.end();
                return;
            } catch (err) {
                return error(res, 'Para usar PDF primero instala la librería (npm install pdfkit)', err, 500);
            }
        }
        return exito(res, 'Reporte obtenido correctamente.', datos);
    } catch (err) {
        return error(res, 'Error al generar el reporte', err);
    }
};
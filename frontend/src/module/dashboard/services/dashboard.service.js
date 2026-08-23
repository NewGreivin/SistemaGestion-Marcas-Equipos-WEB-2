// Autor: Greivin Eliecer A.G
import api from '../../../api/api'; 

export const getDashboardStatsService = async () => {
    try {
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = hoy.getMonth() + 1; 
        const dia = hoy.getDate();

        const [
            usuariosRes, 
            equiposRes, 
            prestamosRes, 
            marcasRes
        ] = await Promise.all([
            api.get('/usuarios'),
            api.get('/equipos'),
            api.get('/prestamos'),
            api.get(`/reportes/marcas?anio=${anio}&mes=${mes}&dia=${dia}`)
        ]);

        const usuarios = usuariosRes.data.data || [];
        const equipos = equiposRes.data.data || [];
        const prestamos = prestamosRes.data.data || [];
        const marcasDeHoy = marcasRes.data.data || [];

        const totalUsuarios = usuarios.length;

        const totalEquipos = equipos.length;
        const equiposDisponibles = equipos.filter(e => e.estado === 'DISPONIBLE').length;

        const prestamosActivos = prestamos.filter(p => p.estado === 'ACTIVO').length;
        
        const entradasHoy = marcasDeHoy.filter(m => m.tipo_marca === 'ENTRADA').length;
        const salidasHoy = marcasDeHoy.filter(m => m.tipo_marca === 'SALIDA').length;

        return {
            data: {
                usuarios: {
                    total: totalUsuarios,
                    label: 'Usuarios Registrados'
                },
                equipos: {
                    disponibles: equiposDisponibles,
                    totales: totalEquipos,
                    label: 'Equipos Totales'
                },
                prestamos: {
                    activos: prestamosActivos,
                    label: 'Préstamos en curso'
                },
                marcas: {
                    hoy: marcasDeHoy.length,
                    entradas: entradasHoy,
                    salidas: salidasHoy,
                    label: 'Entradas / Salidas'
                }
            }
        };
    } catch (error) {
        throw new Error('Error al cargar la información del servidor', { cause: error });
    }
};
// Autor: Greivin Eliecer A.G

//import api from '../../../api/api';

export const getDashboardStatsService = async () => {
    // Si tienes un endpoint para esto, sería algo como:
    // return await api.get('/dashboard/stats');
    
    // Por ahora retornamos datos simulados basados en la imagen
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    usuarios: {
                        total: 125,
                        label: 'Usuarios'
                    },
                    equipos: {
                        disponibles: 88,
                        totales: 112,
                        label: 'Equipos Totales'
                    },
                    prestamos: {
                        activos: 24,
                        label: 'Préstamos'
                    },
                    marcas: {
                        hoy: 42,
                        entradas: 42, // asumiendo que 42 son entradas según el texto '42 Entradas / 38 Salidas' o tal vez total sea 80, lo adaptamos
                        salidas: 38,
                        label: 'Entradas / 38 Salidas'
                    }
                }
            });
        }, 800);
    });
};

// Autor: Greivin Eliecer A.G
import api from '../../../api/api'; 

export const getAdminDashboardData = async (anio, mes, dia) => {
    const t = new Date().getTime();
    
    const [usuariosRes, equiposRes, prestamosRes, marcasRes, dispositivosRes, ultimaMarcaRes] = await Promise.all([
        api.get(`/usuarios?_t=${t}`),
        api.get(`/equipos?_t=${t}`),
        api.get(`/prestamos?_t=${t}`),
        api.get(`/reportes/marcas?anio=${anio}&mes=${mes}&dia=${dia}&_t=${t}`),
        api.get(`/dispositivos?_t=${t}`).catch(() => ({ data: { data: [] } })),
        api.get(`/marcas/ultima?_t=${t}`).catch(() => ({ data: { data: null } }))
    ]);

    return {
        usuarios: usuariosRes.data?.data || [],
        equipos: equiposRes.data?.data || [],
        prestamos: prestamosRes.data?.data || [],
        marcas: marcasRes.data?.data || [],
        dispositivos: dispositivosRes.data?.data || [],
        ultimaMarca: ultimaMarcaRes.data?.data || null,
    };
};

export const getUserDashboardData = async () => {
    const t = new Date().getTime(); 

    const [equiposRes, dispositivosRes, ultimaMarcaRes] = await Promise.all([
        api.get(`/equipos?_t=${t}`).catch(() => ({ data: { data: [] } })),
        api.get(`/dispositivos?_t=${t}`).catch(() => ({ data: { data: [] } })),
        api.get(`/marcas/ultima?_t=${t}`).catch(() => ({ data: { data: null } }))
    ]);

    return {
        equipos: equiposRes.data?.data || [],
        dispositivos: dispositivosRes.data?.data || [],
        ultimaMarca: ultimaMarcaRes.data?.data || null,
    };
};
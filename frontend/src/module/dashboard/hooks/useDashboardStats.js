// Autor: Greivin Eliecer A.G

import { useState, useEffect, useCallback } from 'react';
import { getAdminDashboardData, getUserDashboardData } from '../services/dashboard.service';
import useAuth from '../../auth/hooks/useAuth';

export const useDashboardStats = () => {
    const { usuario } = useAuth();
    const esAdmin = usuario?.rol_nombre === 'Administrador';

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = useCallback(async () => {
        if (!usuario) return;

        setLoading(true);
        setError(null);

        try {
            if (esAdmin) {
                const hoy = new Date();
                const rawData = await getAdminDashboardData(hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate());

                setStats({
                    esAdmin: true,
                    usuarios: { total: rawData.usuarios.length, label: 'Usuarios Registrados' },
                    equipos: {
                        disponibles: rawData.equipos.filter(e => e.estado === 'DISPONIBLE').length,
                        totales: rawData.equipos.length,
                        label: 'Equipos Totales'
                    },
                    prestamos: { activos: rawData.prestamos.filter(p => p.estado === 'ACTIVO').length, label: 'Préstamos en curso' },
                    marcas: {
                        hoy: rawData.marcas.length,
                        entradas: rawData.marcas.filter(m => m.tipo_marca === 'ENTRADA').length,
                        salidas: rawData.marcas.filter(m => m.tipo_marca === 'SALIDA').length,
                        label: 'Entradas / Salidas'
                    },
                    dispositivos: { total: rawData.dispositivos.length, label: 'Dispositivos Registrados' },
                    ultimaMarca: rawData.ultimaMarca
                });
            } else {
                const rawData = await getUserDashboardData();

                setStats({
                    esAdmin: false,
                    equipos: {
                        disponibles: rawData.equipos.filter(e => e.estado === 'DISPONIBLE').length,
                        totales: rawData.equipos.length,
                        label: 'Equipos Totales'
                    },
                    dispositivos: { total: rawData.dispositivos.length, label: 'Dispositivos Registrados' },
                    ultimaMarca: rawData.ultimaMarca
                });
            }
        } catch (err) {
            setError(err.message || 'Error al procesar las estadísticas');
        } finally {
            setLoading(false);
        }
    }, [usuario, esAdmin]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { stats, loading, error, refetch: fetchStats };
};
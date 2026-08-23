// Autor: Greivin Eliecer A.G

import { useState, useEffect } from 'react';
import { getDashboardStatsService } from '../services/dashboard.service';

export const useDashboardStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await getDashboardStatsService();
            setStats(data);
        } catch (err) {
            setError(err.message || 'Error al cargar las estadísticas del dashboard');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return { stats, loading, error, refetch: fetchStats };
};

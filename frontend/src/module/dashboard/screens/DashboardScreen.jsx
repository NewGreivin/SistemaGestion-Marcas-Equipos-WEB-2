// Autor: Greivin Eliecer A.G

import { useDashboardStats } from '../hooks/useDashboardStats';
import StatCard from '../components/StatCard';

export default function Dashboard() {
    const { stats, loading, error } = useDashboardStats();

    return (
        <div className="container py-4 bg-light min-vh-100" style={{ maxWidth: '1000px' }}>
            {loading && <div className="text-center py-5">Cargando estadísticas...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && stats && (
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <StatCard 
                            title="USUARIOS REGISTRADOS" 
                            value={stats.usuarios.total.toString()} 
                            subtitle={stats.usuarios.label} 
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <StatCard 
                            title="EQUIPOS DISPONIBLES" 
                            value={`${stats.equipos.disponibles} / ${stats.equipos.totales}`} 
                            subtitle={stats.equipos.label} 
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <StatCard 
                            title="PRÉSTAMOS ACTIVOS" 
                            value={stats.prestamos.activos.toString()} 
                            subtitle={stats.prestamos.label} 
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <StatCard 
                            title="MARCAS REGISTRADAS HOY" 
                            value={stats.marcas.hoy.toString()} 
                            subtitle={`${stats.marcas.entradas} Entradas / ${stats.marcas.salidas} Salidas`} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
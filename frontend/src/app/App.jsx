import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../shared/layout/MainLayout';
import Login from '../module/auth/screens/LoginScreen';
import RecuperarPassword from '../module/auth/screens/RecuperarPasswordScreen';
import Dashboard from '../module/dashboard/screens/DashboardScreen';
import Dispositivo from '../module/dispositivos/screens/Dispositivos';
import Marcas from "../module/marcas/screens/Marcas";
import Usuarios from "../module/usuarios/screens/UsuarioScreen";
import NuevoPrestamoScreen from '../module/prestamos/screens/NuevoPrestamoScreen';
import DevolucionScreen from '../module/prestamos/screens/DevolucionScreen';
import HistorialPrestamosScreen from '../module/prestamos/screens/HistorialPrestamosScreen';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-password" element={<RecuperarPassword />} />
            <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dispositivos" element={<Dispositivo />} />
                <Route path="/marcas" element={<Marcas />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/prestamos/nuevo" element={<NuevoPrestamoScreen />}/>
                <Route path="/prestamos/devolucion" element={<DevolucionScreen />}/>
                <Route path="/prestamos/historial" element={<HistorialPrestamosScreen />}/>
            </Route>
        </Routes>
    );
}

export default App;
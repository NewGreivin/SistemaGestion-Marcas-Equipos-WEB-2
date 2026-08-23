import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../module/auth/screens/LoginScreen';
import RecuperarPassword from '../module/auth/screens/RecuperarPasswordScreen';
import Dashboard from '../module/dashboard/screens/DashboardScreen';
import Dispositivo from '../module/dispositivos/screens/Dispositivos';
import Marcas from "../module/marcas/screens/Marcas";
import MainLayout from '../shared/layout/MainLayout';

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
            </Route>
        </Routes>
    );
}

export default App;
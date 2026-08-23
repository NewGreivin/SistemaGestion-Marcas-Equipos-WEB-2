import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../module/auth/screens/LoginScreen';
import RecuperarPassword from '../module/auth/screens/RecuperarPasswordScreen';
import Dashboard from '../module/dashboard/screens/DashboardScreen';
import MainLayout from '../shared/layout/MainLayout';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-password" element={<RecuperarPassword />} />
            <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
}

export default App;
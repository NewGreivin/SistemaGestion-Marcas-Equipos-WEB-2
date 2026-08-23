// Autor: Greivin Eliecer A.G

import { useState } from 'react';
import { logoutService } from '../services/auth.service';

const useAuth = () => {
    const [usuario, setUsuario] = useState(() => {
        try {
            const storedUser = localStorage.getItem('gestion_usuario');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (err) {
            return null;
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

        const actualizarUsuario = (nuevosDatos) => {
        const usuarioActual = usuario || {};
        const usuarioActualizado = { ...usuarioActual, ...nuevosDatos };
        localStorage.setItem('gestion_usuario', JSON.stringify(usuarioActualizado));
        setUsuario(usuarioActualizado);
    };

    const logout = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await logoutService();

            localStorage.removeItem('gestion_usuario');
            localStorage.removeItem('gestion_auth_token');
            setUsuario(null);

            window.location.href = '/login';

            return response;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    return { usuario, logout, loading, error, actualizarUsuario };
};
export default useAuth;
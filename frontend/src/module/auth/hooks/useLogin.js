//Autor: Greivin Eliecer A.G

import { useState } from 'react';
import { loginService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identificador: '',
        password: '',
        rememberMe: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { data } = await loginService(formData.identificador, formData.password);
            localStorage.setItem('gestion_usuario', JSON.stringify(data.data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return { formData, handleChange, handleSubmit, loading, error };
};

//Autor: Greivin Eliecer A.G

import { useState } from 'react';
import api from '../../../api/api';

export const useRecuperarPassword = () => {
    const [identificador, setIdentificador] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        setIdentificador(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const { data } = await api.post('/auth/recover-password', { identificador });
            console.log('Recovery response:', data);
            
            // Usamos el mensaje del backend o uno genérico
            setSuccessMessage(data?.message || 'Si el usuario existe, se ha enviado un token.');
        } catch (err) {
            setError(err.message || 'Error al procesar recuperación');
        } finally {
            setLoading(false);
        }
    };

    return { identificador, handleChange, handleSubmit, loading, error, successMessage };
};

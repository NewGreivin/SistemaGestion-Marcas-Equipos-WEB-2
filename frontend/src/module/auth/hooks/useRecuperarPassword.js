//Autor: Greivin Eliecer A.G

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestRecoveryCodeService, resetPasswordService } from '../services/auth.service';

export const useRecuperarPassword = () => {
    const [paso, setPaso] = useState(1);
    const [identificador, setIdentificador] = useState('');
    const [codigo, setCodigo] = useState('');
    const [nuevaPassword, setNuevaPassword] = useState('');
    const [confirmacionPassword, setConfirmacionPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    // Paso 1: Solicitar el código al correo
    const handleRequestCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            await requestRecoveryCodeService(identificador);
            setPaso(2);
            setSuccessMessage('Si tu correo está registrado, te hemos enviado un código de 6 dígitos.');
        } catch (err) {
            setError(err.message || 'Error al solicitar el código.');
        } finally {
            setLoading(false);
        }
    };

    // Paso 2: Verificar el código y cambiar la contraseña
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (nuevaPassword !== confirmacionPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await resetPasswordService(codigo, nuevaPassword, confirmacionPassword);
            setSuccessMessage('¡Contraseña actualizada con éxito! Redirigiendo al login...');
            setTimeout(() => navigate('/login'), 2500);
        } catch (err) {
            setError(err.message || 'El código es inválido o ya ha expirado.');
        } finally {
            setLoading(false);
        }
    };

    return {
        paso,
        identificador, setIdentificador,
        codigo, setCodigo,
        nuevaPassword, setNuevaPassword,
        confirmacionPassword, setConfirmacionPassword,
        handleRequestCode,
        handleResetPassword,
        loading, error, successMessage
    };
};
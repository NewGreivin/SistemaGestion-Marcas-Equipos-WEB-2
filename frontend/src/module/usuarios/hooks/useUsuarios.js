//Autor: Greivin Eliecer A.G

import { useState, useEffect } from 'react';
import { 
    getUsuariosService, 
    createUsuarioService, 
    updateUsuarioService, 
    deleteUsuarioService 
} from '../services/usuarios.service';

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    const fetchUsuarios = async (showLoader = true) => {
        if (showLoader) setLoading(true);
        setError(null);
        try {
            const data = await getUsuariosService();
            setUsuarios(data.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const crearUsuario = async (datos) => {
        const response = await createUsuarioService(datos);
        await fetchUsuarios(true); 
        return response;
    };

    const actualizarUsuario = async (id, datos) => {
        const response = await updateUsuarioService(id, datos);
        await fetchUsuarios(true); 
        return response;
    };

    const eliminarUsuario = async (id) => {
        const response = await deleteUsuarioService(id);
        await fetchUsuarios(true); 
        return response;
    };

    useEffect(() => {
        fetchUsuarios(false);   
    }, []);

    return { usuarios, loading, error, refetch: fetchUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario };
};
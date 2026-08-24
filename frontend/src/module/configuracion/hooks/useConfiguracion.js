// Autor: Greivin Eliecer A.G

import { useState, useEffect } from 'react';
import configuracionService from '../services/configuracion.service';

export const useConfiguracion = () => {
    const [formData, setFormData] = useState({
        nombre_institucion: '',
        rango_ip_permitido: '',
        tiempo_maximo_sesion: '',
        tamano_maximo_archivos: '',
    });

    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [alerta, setAlerta] = useState({ visible: false, mensaje: '', tipo: '' });

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await configuracionService.getConfiguracion();
                const config = res?.data || res;
                setFormData({
                    nombre_institucion: config.nombre_institucion || '',
                    rango_ip_permitido: config.rango_ip_permitido || '',
                    tiempo_maximo_sesion: String(config.tiempo_maximo_sesion || ''),
                    tamano_maximo_archivos: String(config.tamano_maximo_archivos || ''),
                });
            } catch (err) {
                setAlerta({ visible: true, mensaje: 'Error al cargar la configuración.', tipo: 'danger' });
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errores[name]) setErrores(prev => ({ ...prev, [name]: '' }));
    };

    const validar = () => {
        const nuevosErrores = {};

        const checarVacio = (valor, campo) => {
            if (!valor || !String(valor).trim()) {
                nuevosErrores[campo] = true;
                return true;
            }
            return false;
        };

        const nombreVacio = checarVacio(formData.nombre_institucion, 'nombre_institucion');
        if (!nombreVacio && formData.nombre_institucion.length > 150) {
            nuevosErrores.nombre_institucion = 'Máximo 150 caracteres.';
        }

        const rangoVacio = checarVacio(formData.rango_ip_permitido, 'rango_ip_permitido');
        if (!rangoVacio && formData.rango_ip_permitido.length > 15) {
            nuevosErrores.rango_ip_permitido = 'Máximo 15 caracteres.';
        }

        const tiempoVacio = checarVacio(formData.tiempo_maximo_sesion, 'tiempo_maximo_sesion');
        if (!tiempoVacio && (isNaN(formData.tiempo_maximo_sesion) || Number(formData.tiempo_maximo_sesion) < 1)) {
            nuevosErrores.tiempo_maximo_sesion = 'Debe ser un número mayor a 0.';
        }

        const tamanoVacio = checarVacio(formData.tamano_maximo_archivos, 'tamano_maximo_archivos');
        if (!tamanoVacio && (isNaN(formData.tamano_maximo_archivos) || Number(formData.tamano_maximo_archivos) < 1)) {
            nuevosErrores.tamano_maximo_archivos = 'Debe ser un número mayor a 0.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        if (!validar()) return;

        setGuardando(true);
        try {
            await configuracionService.updateConfiguracion({
                nombre_institucion: formData.nombre_institucion,
                rango_ip_permitido: formData.rango_ip_permitido,
                tiempo_maximo_sesion: Number(formData.tiempo_maximo_sesion),
                tamano_maximo_archivos: Number(formData.tamano_maximo_archivos),
            });
            setAlerta({ visible: true, mensaje: 'Configuración guardada correctamente.', tipo: 'success' });
            setTimeout(() => setAlerta({ visible: false, mensaje: '', tipo: '' }), 3500);
        } catch (err) {
            setAlerta({ visible: true, mensaje: err.message || 'Error al guardar la configuración.', tipo: 'danger' });
        } finally {
            setGuardando(false);
        }
    };

    return { formData, errores, cargando, guardando, alerta, handleChange, handleGuardar };
};
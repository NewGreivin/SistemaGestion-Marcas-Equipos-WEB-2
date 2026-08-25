/**
 * Autor: Brayan Azofeifa
 * Descripción: Contiene la lógica para obtener y filtrar los reportes de marcas.
 * Uso: Separa los estados, validaciones y solicitudes a la API de la pantalla visual.
 */

import { useState, useEffect } from 'react';
import { 
    getReporteMarcasService, 
    exportarJSONService, 
    exportarPDFService 
} from '../services/reporteMarcas.service';

import { getUsuariosService } from '../../usuarios/services/usuarios.service';
import departamentoService from '../../departamentos/services/departamentos.service';

export default function useReporteMarcas() {
    const [reportes, setReportes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [opcionesUsuarios, setOpcionesUsuarios] = useState([]);
    const [opcionesDepartamentos, setOpcionesDepartamentos] = useState([]);

    const [filtros, setFiltros] = useState({
        usuario: '',
        fecha: '',
        departamento: ''
    });

    const columnasReporte = [
        { key: "Usuario", label: "USUARIO" },
        { key: "Fecha", label: "FECHA" },
        { key: "Entrada", label: "HORA ENTRADA" },
        { key: "Salida", label: "HORA SALIDA" },
        { key: "Dispositivo", label: "DISPOSITIVO" },
        { key: "IP", label: "DIRECCIÓN IP" }
    ];

    const cargarUsuariosParaFiltro = async () => {
        try {
            const data = await getUsuariosService();
            const usuariosBD = data.data || [];
            const opciones = usuariosBD.map(user => ({
                value: String(user.id),
                label: user.nombre_completo
            }));
            setOpcionesUsuarios(opciones);
        } catch (err) {
            console.error("No se pudieron cargar los usuarios", err);
        }
    };

    const cargarDepartamentosParaFiltro = async () => {
        try {
            const departamentosBD = await departamentoService.getDepartamentos();
            const opciones = departamentosBD.map(dep => ({
                value: String(dep.id),
                label: dep.nombre
            }));
            setOpcionesDepartamentos(opciones);
        } catch (err) {
            console.error("No se pudieron cargar los departamentos", err);
        }
    };

    const obtenerParametrosFiltro = () => {
        let anio = '', mes = '', dia = '';
        if (filtros.fecha) {
            [anio, mes, dia] = filtros.fecha.split('-');
        }
        
        const params = new URLSearchParams();
        if (filtros.usuario) params.append('usuario', filtros.usuario);
        if (filtros.departamento) params.append('departamento', filtros.departamento);
        if (anio) params.append('anio', anio);
        if (mes) params.append('mes', mes);
        if (dia) params.append('dia', dia);

        return params.toString();
    };

    const cargarReportes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getReporteMarcasService(obtenerParametrosFiltro());
            setReportes(response.data?.data || []);
        } catch (err) {
            setError(err.message || "Error al cargar los reportes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarReportes();
        cargarUsuariosParaFiltro();
        cargarDepartamentosParaFiltro(); 
    }, []);

    const handleFiltroChange = (e) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value });
    };

    const aplicarFiltros = () => {
        cargarReportes();
    };

    const exportarJSON = () => exportarJSONService(obtenerParametrosFiltro());
    const exportarPDF = () => exportarPDFService(obtenerParametrosFiltro());

    return {
        reportes,
        loading,
        error,
        columnasReporte,
        filtros,
        handleFiltroChange,
        aplicarFiltros,
        exportarJSON,
        exportarPDF,
        opcionesUsuarios,
        opcionesDepartamentos
    };
}
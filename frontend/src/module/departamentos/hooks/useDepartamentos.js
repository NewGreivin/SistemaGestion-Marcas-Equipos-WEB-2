/**
 * Autor: Brayan Azofeifa
 * Descripción: Contiene la lógica para la gestión (CRUD) de los departamentos o carreras.
 * Uso: Separa los estados, validaciones y peticiones a la API de la pantalla visual.
 */

import { useState, useEffect } from 'react';
import departamentoService from '../services/departamentos.service';

export default function useDepartamentos() {
    const [departamentos, setDepartamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [alerta, setAlerta] = useState({ 
        isOpen: false, 
        title: '', 
        message: '', 
        variant: 'primary', 
        onConfirm: null 
    });
    
    const [mostrarModal, setMostrarModal] = useState(false);
    const [departamentoEditando, setDepartamentoEditando] = useState(null);
    const [formData, setFormData] = useState({ 
        nombre: '', 
        descripcion: '', 
        encargado: '' 
    });
    const [formErrors, setFormErrors] = useState({});

    const columnasDepartamentos = [
        { key: "nombre", label: "NOMBRE" },
        { key: "descripcion", label: "DESCRIPCIÓN" },
        { key: "encargado", label: "ENCARGADO" }
    ];

    const accionesDepartamentos = [
        {
            icon: "editar",
            variant: "primary",
            label: "Editar",
            onClick: (depto) => abrirModalEditar(depto)
        },
        {
            icon: "eliminar",
            variant: "danger",
            label: "Eliminar",
            onClick: (depto) => confirmarEliminacion(depto.id)
        }
    ];

    useEffect(() => {
        cargarDepartamentos();
    }, []);

    const cargarDepartamentos = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await departamentoService.getDepartamentos();
            setDepartamentos(data);
        } catch (err) {
            setError(err.message || "Error al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    const abrirModalRegistrar = () => {
        setDepartamentoEditando(null);
        setFormData({ 
            nombre: '', 
            descripcion: '', 
            encargado: '' 
        });
        setFormErrors({});
        setMostrarModal(true);
    };

    const abrirModalEditar = (departamento) => {
        setDepartamentoEditando(departamento);
        setFormData({ 
            nombre: departamento.nombre, 
            descripcion: departamento.descripcion, 
            encargado: departamento.encargado 
        });
        setFormErrors({});
        setMostrarModal(true);
    };

    const cerrarModal = () => setMostrarModal(false);
    
    const handleInputChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
        if (formErrors[e.target.name]) {
            setFormErrors({ ...formErrors, [e.target.name]: null });
        }
    };
    
    const cerrarAlerta = () => setAlerta({ 
        ...alerta, 
        isOpen: false 
    });
    
    const mostrarAlerta = (titulo, mensaje, variante = 'primary', onConfirm = null) => {
        setAlerta({ 
            isOpen: true, 
            title: titulo, 
            message: mensaje, 
            variant: variante, 
            onConfirm 
        });
    };

    const validarFormulario = () => {
        const errores = {};
        
        // El nombre SIEMPRE es obligatorio
        if (!formData.nombre.trim()) {
            errores.nombre = "El nombre es obligatorio";
        }
        
        // Descripción y encargado SOLO son obligatorios al CREAR (!departamentoEditando)
        if (!departamentoEditando) {
            if (!formData.descripcion.trim()) {
                errores.descripcion = "La descripción es obligatoria";
            }
            if (!formData.encargado.trim()) {
                errores.encargado = "El encargado es obligatorio";
            }
        }
        
        setFormErrors(errores);
        return Object.keys(errores).length === 0;
    };

    const guardarDepartamento = async (e) => {
        if (e) e.preventDefault();
        
        if (!validarFormulario()) {
            return;
        }

        try {
            if (departamentoEditando) {
                await departamentoService.updateDepartamento(departamentoEditando.id, formData);
            } else {
                await departamentoService.createDepartamento(formData);
            }
            cerrarModal();
            cargarDepartamentos();
            
            setTimeout(() => {
                mostrarAlerta(
                    "¡Éxito!", 
                    departamentoEditando ? "Departamento modificado" : "Departamento registrado", 
                    "success"
                );
            }, 150);
        } catch (error) {
            mostrarAlerta(
                "Error al guardar", 
                error.message || "Ocurrió un error inesperado.", 
                "danger"
            );
        }
    };

    const confirmarEliminacion = (id) => {
        mostrarAlerta(
            "¿Estás seguro?", 
            "Esta acción eliminará el departamento de forma permanente.", 
            "danger", 
            () => eliminarDepartamento(id)
        );
    };

    const eliminarDepartamento = async (id) => {
        cerrarAlerta();
        try {
            await departamentoService.deleteDepartamento(id);
            cargarDepartamentos();
            setTimeout(() => {
                mostrarAlerta(
                    "¡Éxito!", 
                    "Departamento eliminado exitosamente", 
                    "success"
                );
            }, 150);
        } catch (error) {
            mostrarAlerta(
                "Error al eliminar", 
                error.message || "No se pudo completar la acción.", 
                "danger"
            );
        }
    };

    return {
        departamentos,
        loading,
        error,
        columnasDepartamentos,
        accionesDepartamentos,
        mostrarModal,
        departamentoEditando,
        formData,
        formErrors,
        cerrarModal,
        handleInputChange,
        alerta,
        cerrarAlerta,
        abrirModalRegistrar,
        guardarDepartamento
    };
}
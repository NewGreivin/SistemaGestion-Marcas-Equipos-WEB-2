// Autor: Greivin Eliecer A.G

import { useState } from 'react';
import { useUsuarios } from './useUsuarios';

const ALERTA_INICIAL = {
    isOpen: false,
    title: '',
    message: '',
    variant: 'danger',
    confirmText: 'Confirmar',
    onConfirm: null,
};

export const useUsuariosScreen = () => {
    const {
        usuarios,
        loading,
        error,
        eliminarUsuario,
        crearUsuario,
        actualizarUsuario,
    } = useUsuarios();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [usuarioEditar, setUsuarioEditar] = useState(null);
    const [alerta, setAlerta] = useState(ALERTA_INICIAL);

    const cerrarAlerta = () => setAlerta(ALERTA_INICIAL);
    const cerrarForm = () => setIsFormOpen(false);

    const handleRegistrar = () => {
        setUsuarioEditar(null);
        setIsFormOpen(true);
    };

    const handleEditar = (user) => {
        setUsuarioEditar(user);
        setIsFormOpen(true);
    };

    const handleGuardarFormulario = async (formData) => {
        try {
            if (usuarioEditar) {
                await actualizarUsuario(usuarioEditar.id, formData);
            } else {
                await crearUsuario(formData);
            }
            cerrarForm();
            setAlerta({
                ...ALERTA_INICIAL,
                isOpen: true,
                title: '¡Éxito!',
                message: usuarioEditar
                    ? 'Usuario actualizado correctamente.'
                    : 'Usuario registrado correctamente.',
                variant: 'success',
            });
        } catch (err) {
            cerrarForm();
            setAlerta({
                ...ALERTA_INICIAL,
                isOpen: true,
                title: 'Error al guardar',
                message:
                    err.message || 'Ocurrió un problema al guardar los datos.',
                variant: 'danger',
            });
        }
    };

    const handleEliminar = (user) => {
        setAlerta({
            isOpen: true,
            title: 'Eliminar Usuario',
            message: `¿Deseas eliminar a ${user.nombre_completo}?`,
            submessage: 'Esta acción no se puede deshacer.',
            confirmText: 'Sí, eliminar',
            variant: 'danger',
            onConfirm: async () => {
                cerrarAlerta();
                try {
                    await eliminarUsuario(user.id);
                    setAlerta({
                        ...ALERTA_INICIAL,
                        isOpen: true,
                        title: 'Eliminado',
                        message: 'El usuario fue eliminado correctamente.',
                        variant: 'success',
                    });
                } catch (err) {
                    setAlerta({
                        ...ALERTA_INICIAL,
                        isOpen: true,
                        title: 'Error al eliminar',
                        message:
                            err.message ||
                            'Hubo un problema al eliminar el usuario.',
                        variant: 'danger',
                    });
                }
            },
        });
    };

    const columnasUsuarios = [
        { key: 'nombre_completo', label: 'NOMBRE COMPLETO' },
        { key: 'correo', label: 'CORREO' },
        { key: 'username', label: 'USUARIO' },
        { key: 'departamento_nombre', label: 'DEPARTAMENTO' }, 
        { key: 'fecha_nacimiento_formato', label: 'NACIMIENTO' }, 
        { key: 'rol_badge', label: 'ROL' },
    ];

    const accionesUsuarios = [
        {
            icon: 'editar',
            variant: 'primary',
            label: 'Editar',
            onClick: handleEditar,
        },
        {
            icon: 'eliminar',
            variant: 'danger',
            label: 'Eliminar',
            onClick: handleEliminar,
        },
    ];

    return {
        // Datos crudos para que la pantalla construya el JSX
        usuarios,
        loading,
        error,
        columnasUsuarios,
        accionesUsuarios,
        // Modal formulario
        isFormOpen,
        usuarioEditar,
        cerrarForm,
        // Modal alertas
        alerta,
        cerrarAlerta,
        // Handlers
        handleRegistrar,
        handleGuardarFormulario,
    };
};

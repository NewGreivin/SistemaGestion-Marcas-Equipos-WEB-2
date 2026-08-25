import { useState, useEffect } from 'react';
import { 
    getAllEquipos, 
    createEquipo, 
    updateEquipo, 
    deleteEquipo as inactivarEquipo 
} from '../services/equipos.service';

export const useEquiposScreen = () => {
    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [equipoEditar, setEquipoEditar] = useState(null);
    const [alerta, setAlerta] = useState({ isOpen: false, type: '', title: '', message: '' });

    useEffect(() => {
        cargarEquipos();
    }, []);

    const cargarEquipos = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await getAllEquipos();
            setEquipos(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const columnasEquipos = [
        { key: 'codigo_ui', label: 'CÓDIGO' },
        { key: 'descripcion', label: 'DESCRIPCIÓN' },
        { key: 'estado_badge', label: 'ESTADO' }
    ];

    const handleConfirmDelete = async (id) => {
        try {
            setLoading(true);
            await inactivarEquipo(id);
            cerrarAlerta();
            await cargarEquipos();
        } catch (error) {
            setAlerta({
                isOpen: true,
                type: 'danger',
                title: 'Error',
                message: error.message || 'No se pudo eliminar el equipo.'
            });
            setLoading(false);
        }
    };

    const accionesEquipos = [
        {
            icon: 'editar',
            variant: 'outline-secondary',
            label: 'Editar',
            onClick: (equipo) => {
                setEquipoEditar(equipo);
                setIsFormOpen(true);
            }
        },
        {
            icon: 'eliminar',
            variant: 'outline-danger',
            label: 'Eliminar',
            onClick: (equipo) => {
                setAlerta({
                    isOpen: true,
                    type: 'danger',
                    title: 'Inactivar equipo',
                    message: `¿Estás seguro que deseas pasar el equipo ${equipo.codigo} a estado INACTIVO?`,
                    onConfirm: () => handleConfirmDelete(equipo.id)
                });
            }
        }
    ];

    const cerrarForm = () => {
        setIsFormOpen(false);
        setEquipoEditar(null);
    };

    const cerrarAlerta = () => {
        setAlerta({ ...alerta, isOpen: false });
    };

    const handleRegistrar = () => {
        setEquipoEditar(null);
        setIsFormOpen(true);
    };

    const handleGuardarFormulario = async (datos) => {
        try {
            setLoading(true);
            
            const formData = new FormData();
            formData.append('codigo', datos.codigo);
            formData.append('descripcion', datos.descripcion);
            formData.append('estado', datos.estado);
            
            if (datos.imagen instanceof File) {
                formData.append('imagen', datos.imagen);
            }

            if (equipoEditar) {
                await updateEquipo(equipoEditar.id, formData);
            } else {
                await createEquipo(formData);
            }

            cerrarForm();
            await cargarEquipos();
        } catch (error) {
            alert(error.message || 'Ocurrió un error al guardar el equipo.');
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const equiposFiltrados = (equipos || []).filter(eq => 
        (eq?.codigo || '').toLowerCase().includes((searchTerm || '').toLowerCase()) || 
        (eq?.descripcion || '').toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    return {
        equipos: equiposFiltrados,
        loading,
        error,
        searchTerm,
        handleSearchChange,
        columnasEquipos,
        accionesEquipos,
        isFormOpen,
        equipoEditar,
        cerrarForm,
        alerta,
        cerrarAlerta,
        handleRegistrar,
        handleGuardarFormulario,
    };
};

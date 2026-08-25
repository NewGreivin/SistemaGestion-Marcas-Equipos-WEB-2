import React, { useState, useEffect } from 'react';
import FormModal from '../../../shared/components/FormModal';
import TextInput from '../../../shared/components/TextInput';
import TextArea from '../../../shared/components/TextArea';
import Select from '../../../shared/components/Select';
import ImageDropzone from '../../../shared/components/ImageDropzone';

export default function EquipoModal({ isOpen, onClose, equipoEditar, onGuardar }) {
    const [formData, setFormData] = useState({
        codigo: '',
        descripcion: '',
        estado: 'DISPONIBLE',
        imagen: null
    });
    
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (equipoEditar) {
                setFormData({
                    codigo: equipoEditar.codigo || '',
                    descripcion: equipoEditar.descripcion || '',
                    estado: equipoEditar.estado || 'DISPONIBLE',
                    imagen: equipoEditar.imagen || null // Assuming the backend returns the image URL
                });
            } else {
                setFormData({
                    codigo: '',
                    descripcion: '',
                    estado: 'DISPONIBLE',
                    imagen: null
                });
            }
            setErrores({});
        }
    }, [isOpen, equipoEditar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleImageSelect = (file) => {
        setFormData(prev => ({ ...prev, imagen: file }));
        if (errores.imagen) {
            setErrores(prev => ({ ...prev, imagen: null }));
        }
    };

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        
        const nuevosErrores = {};
        if (!formData.codigo.trim()) nuevosErrores.codigo = 'El código es requerido.';
        if (!formData.descripcion.trim()) nuevosErrores.descripcion = 'La descripción es requerida.';
        if (!formData.estado) nuevosErrores.estado = 'El estado es requerido.';

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        setLoading(true);
        // Simular un retardo para efecto visual de carga antes de llamar a onGuardar
        setTimeout(() => {
            onGuardar(formData);
            setLoading(false);
        }, 600);
    };

    const opcionesEstado = [
        { label: 'DISPONIBLE', value: 'DISPONIBLE' },
        { label: 'PRESTADO', value: 'PRESTADO' },
        { label: 'MANTENIMIENTO', value: 'MANTENIMIENTO' },
        { label: 'INACTIVO', value: 'INACTIVO' }
    ];

    const esEdicion = !!equipoEditar;

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={esEdicion ? "Editar equipo" : "Registrar equipo"}
            submitText={esEdicion ? "Guardar cambios" : "Guardar equipo"}
            loading={loading}
        >
            <form id="form-modal-content" onSubmit={handleSubmit}>
                {esEdicion && (
                    <div className="mb-3 text-muted">
                        <small>{formData.codigo}</small>
                    </div>
                )}
                
                <TextInput
                    id="codigo-equipo"
                    name="codigo"
                    label="Código"
                    value={formData.codigo}
                    onChange={handleChange}
                    error={errores.codigo}
                    required={true}
                    placeholder="Ej. EQ-006"
                />

                <TextArea
                    id="descripcion-equipo"
                    name="descripcion"
                    label="Descripción"
                    value={formData.descripcion}
                    onChange={handleChange}
                    error={errores.descripcion}
                    required={true}
                    rows={3}
                />

                <Select
                    id="estado-equipo"
                    name="estado"
                    label="Estado"
                    options={opcionesEstado}
                    value={formData.estado}
                    onChange={handleChange}
                    error={errores.estado}
                    required={true}
                />

                <ImageDropzone
                    label="Imagen del equipo"
                    initialImage={typeof formData.imagen === 'string' ? formData.imagen : null}
                    onImageSelect={handleImageSelect}
                    error={errores.imagen}
                />
            </form>
        </FormModal>
    );
}

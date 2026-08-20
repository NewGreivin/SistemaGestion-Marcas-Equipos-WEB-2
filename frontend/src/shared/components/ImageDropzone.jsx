/**
 * Autor: Oscar Mario Alvares Cruz
 * Componente visual reutilizable para zona de subida de imágenes con vista previa.
*/

import React, { useState, useRef, useEffect } from 'react';
import Icon from './icon';

export default function ImageDropzone({ onImageSelect, initialImage = null, label = "Imagen del equipo", className = '' }) {
    const [preview, setPreview] = useState(initialImage);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (initialImage) {
            setPreview(initialImage);
        }
    }, [initialImage]);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileProcess(e.dataTransfer.files[0]);
        }
    };

    const handleFileProcess = (file) => {
        // Validar que sea imagen
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona un archivo de imagen válido.');
            return;
        }

        // Crear vista previa
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // Pasar archivo al padre
        if (onImageSelect) {
            onImageSelect(file);
        }
    };

    const handleInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleInputChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileProcess(e.target.files[0]);
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (onImageSelect) onImageSelect(null);
    };

    return (
        <div className={`mb-3 ${className}`}>
            {label && <label className="form-label d-block fw-bold">{label}</label>}
            <div
                className={`border rounded text-center p-4 ${isDragging ? 'border-primary bg-light' : 'border-secondary'} border-2`}
                style={{ borderStyle: 'dashed', cursor: 'pointer', minHeight: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleInputClick}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleInputChange}
                    accept="image/jpeg, image/png, image/gif, image/webp"
                    style={{ display: 'none' }}
                />
                
                {preview ? (
                    <div className="position-relative">
                        <img 
                            src={preview} 
                            alt="Vista previa" 
                            style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }} 
                            className="rounded shadow-sm"
                        />
                        <button 
                            type="button" 
                            className="btn btn-sm btn-danger position-absolute top-0 end-0 translate-middle rounded-circle shadow"
                            onClick={handleRemove}
                            style={{ width: '30px', height: '30px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Quitar imagen"
                        >
                            <Icon name="error" />
                        </button>
                    </div>
                ) : (
                    <div className="text-muted">
                        <Icon name="subirImagen" className="mb-2 text-secondary fs-1" />
                        <p className="mb-0">Arrastra una imagen aquí o haz clic para elegir</p>
                    </div>
                )}
            </div>
        </div>
    );
}

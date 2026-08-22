/**
 * Autor: Oscar Mario Alvares Cruz
 * Componente visual reutilizable para zona de subida de imágenes con vista previa.
*/

import React, { useState, useRef, useEffect } from 'react';
import Icon from './icon';
import Texto from './Texto';
import Image from './Image';
import Button from './Button';

export default function ImageDropzone({ 
    onImageSelect, 
    initialImage = null, 
    label = "Imagen del equipo", 
    className = '',
    error,
    required = false
}) {
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
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona un archivo de imagen válido.');
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

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

    // Determinar las clases de estado para el borde y el fondo
    const stateClasses = error 
        ? 'border-danger bg-danger bg-opacity-10' 
        : (isDragging ? 'border-primary bg-light' : 'border-secondary bg-light');

    return (
        <div className={`mb-3 ${className}`}>
            {label && (
                <label className="form-label d-flex gap-1 mb-1 fw-bold">
                    <Texto texto={label} tamano_letra="6" className="mb-0" />
                    {required && <span className="text-danger">*</span>}
                </label>
            )}
            
            <div
                className={`border rounded text-center p-4 border-2 d-flex flex-column align-items-center justify-content-center ${stateClasses}`}
                style={{ borderStyle: 'dashed', cursor: 'pointer', minHeight: '150px' }}
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
                    className="d-none"
                />
                
                {preview ? (
                    <div className="position-relative">
                        <Image 
                            url={preview} 
                            alt="Vista previa" 
                            style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }} 
                            classExtra="rounded shadow-sm"
                        />
                        <Button 
                            variant="danger" 
                            className="position-absolute top-0 end-0 translate-middle rounded-circle shadow p-0"
                            onClick={handleRemove}
                            style={{ width: '30px', height: '30px' }}
                            title="Quitar imagen"
                        >
                            <Icon name="error" />
                        </Button>
                    </div>
                ) : (
                    <div className="text-muted">
                        <Icon name="subirImagen" className="mb-2 text-secondary fs-1" />
                        <Texto texto="Arrastra una imagen aquí o haz clic para elegir" tamano_letra="6" className="mb-0" />
                    </div>
                )}
            </div>
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );
}

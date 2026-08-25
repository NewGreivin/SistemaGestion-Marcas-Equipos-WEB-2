/**
 * Autor: Oscar Mario Alvarez 
 * Componente visual reutilizable para entradas de números.
*/
import { useId } from 'react';
import Texto from './Texto';

export default function NumberInput({ 
    label, 
    value, 
    onChange, 
    min, 
    max, 
    step = '1', 
    required = false, 
    className = '', 
    id, 
    placeholder,
    error,
    name,
    disabled = false
}) {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <div className={`mb-3 ${className}`}>
            {label && (
                <label htmlFor={inputId} className="form-label d-flex gap-1 mb-1">
                    <Texto texto={label} tamano_letra="6" className="mb-0" />
                    {required && <span className="text-danger">*</span>}
                </label>
            )}
            <input
                type="number"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id={inputId}
                name={name}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                required={required}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

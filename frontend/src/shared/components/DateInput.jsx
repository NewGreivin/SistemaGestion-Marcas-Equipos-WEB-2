/**
 * Autor: Brayan Azofeifa
 * 
 * ENTRADA DE FECHA (DATE INPUT)
 * 
 * Descripción: Campo de texto especializado para la selección de fechas.
 * Uso: Se utiliza en formularios para capturar fechas mediante el calendario 
 * nativo del navegador, soportando validaciones de rangos (min/max) y errores.
 */
import Texto from './Texto';

export default function DateInput({ 
    id, 
    name, 
    value, 
    onChange, 
    label, 
    className = "", 
    disabled = 
    false, 
    required = false, 
    error, 
    min, 
    max 
    
}) {
    return (
        <div className={`mb-3 ${className}`}>
            {label && (
                <label htmlFor={id} className="form-label mb-1 mt-1 fw-semibold d-flex align-items-center">
                    <Texto texto={label} alineado="left" color_text="inherit" tamano_letra="6" />
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}
            <input 
                type="date" 
                id={id}
                name={name}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                value={value} 
                onChange={onChange} 
                disabled={disabled}
                required={required}
                min={min}
                max={max}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            {error && (
                <div id={`${id}-error`} className="invalid-feedback d-block">
                    <Texto texto={error} alineado="left" color_text="var(--bs-danger)" tamano_letra="6" />
                </div>
            )}
        </div>
    );
}
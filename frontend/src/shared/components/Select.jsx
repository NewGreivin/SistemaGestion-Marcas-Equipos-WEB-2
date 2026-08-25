/**
 * Autor: Brayan Azofeifa
 * 
 * SELECT DINÁMICO
 * 
 * Descripción: Menú desplegable reutilizable para formularios estandarizados.
 * Uso: Permite al usuario seleccionar una opción de una lista dinámica. Incluye 
 * soporte para validaciones, estado de error y reglas de accesibilidad (A11y).
 */
import Texto from './Texto';

export default function Select({ 
    id, 
    name, 
    options = [], 
    value, 
    onChange, 
    label, 
    className = "", 
    disabled = false, 
    required = false, 
    error 
    
}) {
    return (
        <div className={`mb-3 ${className}`}>
            {label && (
                <label htmlFor={id} className="form-label mb-1 mt-1 fw-semibold d-flex align-items-center">
                    <Texto texto={label} alineado="left" color_text="inherit" tamano_letra="6" />
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}
            <select 
                id={id}
                name={name}
                className={`form-select ${error ? 'is-invalid' : ''}`} 
                value={value} 
                onChange={onChange}
                disabled={disabled}
                required={required}
                aria-describedby={error ? `${id}-error` : undefined}
            >
                <option value="" disabled hidden>Seleccione una opción</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && (
                <div id={`${id}-error`} className="invalid-feedback d-block">
                    <Texto texto={error} alineado="left" color_text="var(--bs-danger)" tamano_letra="6" />
                </div>
            )}
        </div>
    );
}
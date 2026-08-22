/**
 * Autor: Brayan Azofeifa
 * 
 * CHECKBOX / SWITCH
 * 
 * Descripción: Casilla de verificación para opciones booleanas.
 * Uso: Se utiliza en formularios para capturar estados (activar/desactivar). 
 * Puede renderizarse como checkbox tradicional o como switch deslizante.
 */
import Texto from './Texto';

export default function Checkbox({
    id, 
    name, 
    value, 
    label, 
    checked, 
    onChange, 
    isSwitch = false,
    className = "", 
    disabled = false, 
    error
    
}) {
    return (
        <div className={`mb-3 ${className}`}>
            <div className={`form-check ${isSwitch ? 'form-switch' : ''}`}>
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    value={value}
                    className={`form-check-input ${error ? 'is-invalid' : ''}`}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
                {label && (
                    <label className="form-check-label d-inline-block" htmlFor={id} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
                        <Texto texto={label} alineado="left" color_text="inherit" tamano_letra="6" />
                    </label>
                )}
            </div>
            {error && (
                <div id={`${id}-error`} className="invalid-feedback d-block">
                    <Texto texto={error} alineado="left" color_text="var(--bs-danger)" tamano_letra="6" />
                </div>
            )}
        </div>
    );
}
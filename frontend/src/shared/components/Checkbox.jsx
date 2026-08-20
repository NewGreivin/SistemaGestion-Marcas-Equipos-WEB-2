/**
 * Autor: Brayan Azofeifa
 * Casilla de verificación para opciones de activar o desactivar.
 * Se le puede cambiar: el texto, el estado actual, si se ve como switch, y clases extra de diseño.
 */

export default function Checkbox({ label, checked, onChange, isSwitch = false, className = "" }) {
    return (
        <div className={`form-check ${isSwitch ? 'form-switch' : ''} ${className}`}>
            <input 
                className="form-check-input" 
                type="checkbox" 
                checked={checked} 
                onChange={onChange} 
            />
            <label className="form-check-label">{label}</label>
        </div>
    );
}
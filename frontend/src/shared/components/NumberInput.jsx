/**
 * Autor: Oscar Mario Alvarez 
 * Componente visual reutilizable para entradas de números.
*/

export default function NumberInput({ label, value, onChange, min, max, step = '1', required = false, className = '', id, placeholder }) {
    const inputId = id || `number-input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`mb-3 ${className}`}>
            {label && <label htmlFor={inputId} className="form-label">{label}</label>}
            <input
                type="number"
                className="form-control"
                id={inputId}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                required={required}
                placeholder={placeholder}
            />
        </div>
    );
}

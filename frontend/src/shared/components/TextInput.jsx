// Autor: Ricardo Chaves
import Texto from "./Texto";

export default function TextInput({
    id,
    label,
    placeholder,
    value,
    onChange,
    required = false,
    name,
    disabled = false,
    type = "text",
    size,
    className = "",
    pattern,
    error
}) {
        const sizeClass = {
        "sm": "form-control-sm",
        "lg": "form-control-lg"
    }[size] || "";

    return (
        <div className={`mb-3 ${className}`}>
            {label && (
                <label htmlFor={id} className="form-label d-flex align-items-center gap-1 mb-1">
                    <Texto
                        texto={label}
                        alineado="left"
                        color_text="black"
                        tamano_letra="6"
                    />
                    {required && <span className="text-danger">*</span>}
                </label>
            )}
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                pattern={pattern}
                className={`form-control ${sizeClass} ${error ? 'is-invalid' : ''}`}
            />
            {error && (
                <div id={`${id}-error`} className="invalid-feedback d-block">
                    <Texto texto={error} alineado="left" color_text="var(--bs-danger)" tamano_letra="6" />
                </div>
            )}
        </div>
    );
}
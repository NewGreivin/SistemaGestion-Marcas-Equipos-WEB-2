// Autor: Ricardo Chaves Campos
import Texto from "./Texto";

export default function TextArea({ 
    id, 
    label, 
    placeholder, 
    value, 
    onChange, 
    required = false, 
    name, 
    disabled = false, 
    rows = 3,
    className = ''
}) {
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

            <textarea 
                id={id} 
                name={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
                required={required} 
                disabled={disabled} 
                rows={rows}
                className="form-control"
            />
        </div>
    );
}
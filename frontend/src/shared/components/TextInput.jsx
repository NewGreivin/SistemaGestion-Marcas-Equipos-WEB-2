//Autor: Ricardo Chaves

import Texto from "./Texto";

export default function TextInput({ id, label, placeholder, value, onChange, required = false, name, disabled = false, size, id_size, className = "" }) {

    const tamano = {
        "small": "input-group-sm",
        "default": "",
        "large": "input-group-lg"
    }[size] || "";

    const idSizeClass = {
        "small": "inputGroup-sizing-sm",
        "default": "inputGroup-sizing-default",
        "large": "inputGroup-sizing-lg"
    }[id_size] || "";

    return (
        <div className={`mb-3 ${tamano}`}>
            <Texto
                texto={
                    <>
                        {label}
                        {required && <span className="text-danger"> *</span>}
                    </>
                }
                alineado="left"
                color_text="black"
            />
            <input
                id={id}
                name={name}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className="form-control"
                aria-label={label}
            />
        </div>
    )
}
//Autor: Ricardo Chaves Campos

//Utilizacion:

//<TextArea
    //id="descripcion"
    //name="descripcion"
    //label="Descripción"
    //placeholder="Ingrese una descripción"
    //rows={5}
    //required
///>

import Texto from "./Texto";


export default function TextArea({ id, label, placeholder, value, onChange, required = false, error, name, disabled = false, rows, className }) {
    return (
        <div>
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
            <textarea id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} disabled={disabled} rows={rows} className={`form-control ${className || ""} ${error ? "is-invalid" : ""}`} />
            {error && (
                <Texto
                    texto={error}
                    alineado="left"
                    color_text="red"
                />
            )}
        </div>
    )
}
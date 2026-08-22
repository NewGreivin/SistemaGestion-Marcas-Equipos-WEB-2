//Autor: Ricardo Chaves Campos

//Utilizacion:

//<TextArea
    //id="descripcion"
    //label="Descripción"
    //placeholder="Ingrese una descripción"
///>


export default function TextArea({ id, label, placeholder, value, onChange, required = false }) {
    return (
        <div className="form-floating">
            <textarea className="form-control" id={id} placeholder={placeholder} value={value} onChange={onChange} required={required} />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}
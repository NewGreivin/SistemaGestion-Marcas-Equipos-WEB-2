/**
 * Autor: Brayan Azofeifa
 * Menú desplegable reutilizable para los formularios.
 * Se le puede cambiar: el título arriba de la caja, la lista de opciones, el valor y clases extra.
 */

export default function Select({ options = [], value, onChange, label, className = "" }) {
    return (
        <div className={className}>
            <label className="form-label">{label}</label>
            <select className="form-select" value={value} onChange={onChange}>
                <option value="">Seleccione una opción</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}
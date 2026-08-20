/**
 * Autor: Brayan Azofeifa
 * Campo de texto especializado para elegir fechas con el calendario del navegador.
 * Se le puede cambiar: el título, la fecha seleccionada, y clases extra de Bootstrap.
 */

export default function DateInput({ value, onChange, label, className = "" }) {
    return (
        <div className={className}>
            <label className="form-label">{label}</label>
            <input 
                type="date" 
                className="form-control" 
                value={value} 
                onChange={onChange} 
            />
        </div>
    );
}
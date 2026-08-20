/**
 * Autor: Brayan Azofeifa
 * Grupo de botones (iconos) para colocar al final de las filas en las tablas.
 * Se le puede cambiar: las funciones de editar, eliminar, activar, y clases extra de alineación.
 */
import Icon from './icon';

export default function AccionesFila({ onEditar, onEliminar, onActivar, className = "" }) {
    return (
        <div className={`d-flex gap-2 ${className}`}>
            {onEditar && (
                <button className="btn btn-sm btn-outline-primary" onClick={onEditar}>
                    <Icon name="editar" />
                </button>
            )}
            {onEliminar && (
                <button className="btn btn-sm btn-outline-danger" onClick={onEliminar}>
                    <Icon name="eliminar" />
                </button>
            )}
            {onActivar && (
                <button className="btn btn-sm btn-outline-success" onClick={onActivar}>
                    <Icon name="correcto" />
                </button>
            )}
        </div>
    );
}
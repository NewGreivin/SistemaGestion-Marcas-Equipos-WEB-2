/**
 * Autor: Brayan Azofeifa
 * 
 * ACCIONES DE FILA
 * 
 * Descripción: Grupo estandarizado de botones de acción con iconos.
 * Uso: Se coloca en la última columna de las tablas de datos para permitir 
 * al usuario interactuar (editar, eliminar o activar) con un registro específico.
 */
import Icon from './icon';
import Button from './Button';

export default function AccionesFila({ onEditar, onEliminar, onActivar, className = "" }) {
    return (
        <div className={`d-flex gap-2 ${className}`}>
            {onEditar && (
                <Button 
                    className="btn-sm btn-outline-primary" 
                    onClick={onEditar}
                    title="Editar registro"
                    aria-label="Editar"
                >
                    <Icon name="editar" />
                </Button>
            )}
            {onEliminar && (
                <Button 
                    className="btn-sm btn-outline-danger" 
                    onClick={onEliminar}
                    title="Eliminar registro"
                    aria-label="Eliminar"
                >
                    <Icon name="eliminar" />
                </Button>
            )}
            {onActivar && (
                <Button 
                    className="btn-sm btn-outline-success" 
                    onClick={onActivar}
                    title="Activar registro"
                    aria-label="Activar"
                >
                    <Icon name="correcto" />
                </Button>
            )}
        </div>
    );
}
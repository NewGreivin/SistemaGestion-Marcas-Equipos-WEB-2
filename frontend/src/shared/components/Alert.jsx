/**
 * Autor : Oscar Mario Alvarez Cruz
 * Componente visual reutilizable para mostrar alertas del sistema.
*/

export default function Alert({ type = 'success', message, onClose, className = '' }) {
    if (!message) return null;

    const alertClass = `alert alert-${type} alert-dismissible fade show ${className}`;

    return (
        <div className={alertClass} role="alert">
            {message}
            {onClose && (
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            )}
        </div>
    );
}

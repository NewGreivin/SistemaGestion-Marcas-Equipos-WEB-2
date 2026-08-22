/**
 * Autor : Oscar Mario Alvarez Cruz
 * Componente visual reutilizable para mostrar alertas del sistema.
*/

import Icon from './icon';
import Texto from './Texto';

export default function Alert({ type = 'success', message, onClose, className = '' }) {
    if (!message) return null;

    const alertClass = `alert alert-${type} alert-dismissible fade show d-flex align-items-center gap-2 ${className}`;
    
    // Mapeo del tipo de alerta con el ícono correspondiente en nuestro sistema
    const iconName = {
        success: 'correcto',
        danger: 'error',
        warning: 'advertencia',
        info: 'informacion'
    }[type] || 'informacion';

    return (
        <div className={alertClass} role="alert">
            <Icon name={iconName} className="fs-5" />
            <Texto texto={message} tamano_letra="6" />
            {onClose && (
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            )}
        </div>
    );
}

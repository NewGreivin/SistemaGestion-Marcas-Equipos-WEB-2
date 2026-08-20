/**
 * Autor: Oscar Mario Alvarez
 * Componente visual reutilizable para barra de búsqueda.
*/
import Icon from './icon';

export default function SearchInput({ value, onChange, placeholder = 'Buscar...', className = '' }) {
    return (
        <div className={`input-group mb-3 ${className}`}>
            <span className="input-group-text bg-white" id="search-icon">
                <Icon name="buscar" className="text-muted" />
            </span>
            <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                aria-label="Buscar"
                aria-describedby="search-icon"
            />
        </div>
    );
}

/**
 * Autor: Oscar Mario Alvarez
 * Componente visual reutilizable para barra de búsqueda.
 */

import Icon from "./icon";

export default function SearchInput({
  id,
  name,
  value,
  onChange,
  placeholder = "Buscar...",
  className = "",
  ...props
}) {
  const iconId = id ? `${id}-icon` : "search-icon";

  return (
    <div className={`input-group mb-3 ${className}`}>
      <span className="input-group-text bg-white" id={iconId}>
        <Icon name="buscar" className="text-muted" />
      </span>

      <input
        id={id}
        name={name}
        type="text"
        className="form-control border-start-0 ps-0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Buscar"
        aria-describedby={iconId}
        {...props}
      />
    </div>
  );
}

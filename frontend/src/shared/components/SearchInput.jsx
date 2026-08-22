/**
 * Autor: Oscar Mario Alvarez
 * Componente visual reutilizable para barra de búsqueda.
 */

import { useId } from "react";
import Icon from "./icon";

export default function SearchInput({
  id,
  name,
  value,
  onChange,
  placeholder = "Buscar...",
  className = "",
  disabled = false,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const iconId = `${inputId}-icon`;

  return (
    <div className={`input-group mb-3 ${className}`}>
      <span className="input-group-text bg-white border-end-0" id={iconId}>
        <Icon name="buscar" className="text-muted" />
      </span>

      <input
        id={inputId}
        name={name}
        type="text"
        className="form-control border-start-0 ps-0 shadow-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-label={placeholder}
        aria-describedby={iconId}
        {...props}
      />
    </div>
  );
}

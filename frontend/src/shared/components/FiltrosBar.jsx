/**
 * Autor: Marisol Alfaro
 * Descripción: Barra reutilizable para organizar filtros de búsqueda.
 * Uso: Agrupa el buscador y filtros adicionales de las pantallas.
 */

import SearchInput from "./SearchInput";

const FiltrosBar = ({
  children,
  search = "",
  onSearchChange,
  placeholder = "Buscar...",
  id = "filtro-busqueda",
  name = "filtroBusqueda",
}) => {
  return (
    <div className="row g-3 align-items-end mb-3">
      <div className="col-12 col-md-6">
        <SearchInput
          id={id}
          name={name}
          value={search}
          onChange={onSearchChange}
          placeholder={placeholder}
          className="mb-0"
        />
      </div>

      {children}
    </div>
  );
};

export default FiltrosBar;

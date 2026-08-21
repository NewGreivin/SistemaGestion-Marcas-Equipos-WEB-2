/**
 * Autor: Marisol Alfaro
 * ============================================================
 * BARRA DE FILTROS
 * ============================================================
 * Componente visual reutilizable para agrupar la búsqueda y los
 * filtros utilizados en las diferentes pantallas del sistema.
 */

import SearchInput from "./SearchInput";

const FiltrosBar = ({
  children,
  placeholder = "Buscar...",
  className = "",
}) => {
  return (
    <div className={`row g-3 align-items-end mb-3 ${className}`}>
      <div className="col-12 col-md-6">
        <SearchInput placeholder={placeholder} className="mb-0" />
      </div>

      {children}
    </div>
  );
};

export default FiltrosBar;

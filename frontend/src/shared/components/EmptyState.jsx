/**
 * Autor: Marisol Alfaro
 * ============================================================
 * ESTADO VACÍO
 * ============================================================
 * Componente visual reutilizable para mostrar un mensaje cuando
 * no existen registros o resultados disponibles.
 */

import Icon from "./icon";

const EmptyState = ({
  title = "No hay resultados",
  message = "No se encontraron registros disponibles.",
  icon = "informacion",
  children,
  className = "",
}) => {
  return (
    <div className={`text-center py-5 ${className}`}>
      <Icon name={icon} className="fs-1 text-muted mb-3" />

      <h5 className="fw-semibold mb-2">{title}</h5>

      <p className="text-muted mb-3">{message}</p>

      {children}
    </div>
  );
};

export default EmptyState;

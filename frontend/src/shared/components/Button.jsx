/**
 * Autor: Marisol Alfaro
 * ============================================================
 * BOTÓN REUTILIZABLE
 * ============================================================
 * Componente visual reutilizable para mostrar botones del sistema.
 */

const Button = ({ children, className = "" }) => {
  return (
    <button className={`btn btn-primary w-100 ${className}`}>
      {children}
    </button>
  );
};

export default Button;

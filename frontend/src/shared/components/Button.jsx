/**
 * Autor: Marisol Alfaro
 * Descripción: Botón reutilizable para las diferentes pantallas del sistema.
 * Uso: Permite ejecutar acciones, utilizar variantes de Bootstrap
 * y mostrar estados de carga o deshabilitado.
 */

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    success: "btn-success",
    warning: "btn-warning",
    outline: "btn-outline-primary",
  };

  return (
    <button
      type={type}
      className={`btn ${variants[variant] || variants.primary} d-flex align-items-center justify-content-center gap-2 ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="spinner-border spinner-border-sm"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
};

export default Button;

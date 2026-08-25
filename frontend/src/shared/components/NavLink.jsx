/**
 * Autor: Greivin Eliecer A.G
 * Descripción: Enlace de navegación con soporte para estados activos.
 * Uso: Wrapper alrededor de NavLink de react-router-dom para reutilizar lógica de estilos activos.
 */

import { NavLink as RouterNavLink } from "react-router-dom";

export default function NavLink({ 
  to, 
  children, 
  className = "", 
  activeClassName = "fw-bold bg-light", // Clase por defecto cuando está activo
  ...props 
}) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => 
        `${className} ${isActive ? activeClassName : ''}`.trim()
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
}

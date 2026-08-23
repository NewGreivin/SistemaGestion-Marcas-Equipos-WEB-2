/**
 * Autor: Greivin Eliecer A.G
 * Descripción: Menú desplegable reutilizable basado en Bootstrap Dropdown.
 *
 * Props:
 *  - trigger   {ReactNode}  Contenido del botón que abre el menú (requerido)
 *  - children  {ReactNode}  Ítems del menú
 *  - className {string}     Clases adicionales para el botón disparador
 */
import Button from './Button';

export default function Dropdown({ trigger, children, className = "" }) {
  return (
    <div className="dropdown">
      <Button
        className={`dropdown-toggle d-flex align-items-center gap-2 ${className}`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {trigger}
      </Button>

      <ul className="dropdown-menu dropdown-menu-end shadow border-0 py-0 rounded-3 overflow-hidden mt-2">
        {children}
      </ul>
    </div>
  );
}

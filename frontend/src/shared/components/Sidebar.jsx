/**
 * Autor: Marisol Alfaro
 * Descripción: Barra lateral del módulo de préstamo de equipos.
 * Uso: Permite desplegar y navegar entre las opciones del módulo.
 */

import { NavLink } from "react-router-dom";
import Icon from "./icon";
import Texto from "./Texto";

const Sidebar = () => {
  return (
    <aside className="bg-dark p-3 flex-shrink-0 h-100 overflow-auto">
      <Texto
        texto="MÓDULOS"
        alineado="left"
        color_text="secondary"
        tamano_letra="6"
      />

      <button
        type="button"
        className="btn text-white fw-semibold w-100 text-start d-flex align-items-center justify-content-between"
        data-bs-toggle="collapse"
        data-bs-target="#prestamosMenu"
        aria-expanded="true"
        aria-controls="prestamosMenu"
      >
        <span className="d-flex align-items-center gap-2">
          <Icon name="prestamo" />
          Préstamo de equipos
        </span>

        <Icon name="flechaAbajo" />
      </button>

      <div
        id="prestamosMenu"
        className="collapse show"
      >
        <nav className="nav flex-column ms-3 mt-2">
          <NavLink
            to="/prestamos/nuevo"
            className="nav-link text-white d-flex align-items-center gap-2"
          >
            <Icon name="agregar" />
            Registrar préstamo
          </NavLink>

          <NavLink
            to="/prestamos/devolucion"
            className="nav-link text-white d-flex align-items-center gap-2"
          >
            <Icon name="devolucion" />
            Devolución de equipos
          </NavLink>

          <NavLink
            to="/prestamos/historial"
            className="nav-link text-white d-flex align-items-center gap-2"
          >
            <Icon name="historialMarcas" />
            Historial de préstamos
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
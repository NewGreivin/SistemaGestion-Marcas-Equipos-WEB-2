/**
 * Autor: Marisol Alfaro
 * Descripción: Barra superior visual del sistema.
 * Uso: Muestra únicamente la identidad de Bitácora Central.
 */

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-dark px-3 px-md-4 py-2"
      style={{ backgroundColor: "#1d3155" }}
    >
      <div className="container-fluid px-0">
        <div className="d-flex flex-column lh-sm">
          <span className="navbar-brand fw-bold mb-0 py-0">
            Bitácora Central
          </span>

          <small
            className="text-uppercase"
            style={{ color: "#90a0bd", letterSpacing: "0.12rem" }}
          >
            Control de marcas y préstamos
          </small>
        </div>
      </div>
    </nav>
  );
}

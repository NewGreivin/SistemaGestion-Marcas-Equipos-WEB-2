/**
 * Autor: Marisol Alfaro
 * Descripción: Barra superior visual del sistema.
 * Uso: Muestra únicamente la identidad de Bitácora Central.
 */

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-2">
      <div className="container-fluid">
        <div>
          <span className="navbar-brand fw-bold d-block mb-0">
            Bitácora Central
          </span>

          <small className="text-light">
            CONTROL DE MARCAS Y PRÉSTAMOS
          </small>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/**
 * Autor: Marisol Alfaro
 * ============================================================
 * TARJETA DE AUTENTICACIÓN
 * ============================================================
 * Contenedor visual reutilizable para las pantallas de autenticación.
 * Mantiene la presentación común y recibe el contenido mediante children.
 */

const AuthCard = ({ children }) => {
  return (
    <div className="card border-0 shadow rounded-4">
      <div className="card-body p-4 p-md-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">Bitácora Central</h2>
          <p className="text-uppercase small fw-semibold mb-0">
            Control de marcas y préstamos
          </p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthCard;

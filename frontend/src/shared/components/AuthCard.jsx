/**
 * Autor: Marisol Alfaro
 * Descripción: Tarjeta reutilizable para las pantallas de autenticación.
 * Uso: Contiene la información y formularios de autenticación.
 */

import Titulo from "./Titulo";
import Texto from "./Texto";

const AuthCard = ({
  children,
  title = "Bitácora Central",
  subtitle = "Control de marcas y préstamos",
}) => {
  return (
    <div className="card border-0 shadow rounded-4 p-4">
      <div className="card-body">
        <div className="text-center mb-4">
          <Titulo
            tipografia="h2"
            texto={title}
            alineado="center"
            color_text="black"
          />

          <Texto
            texto={subtitle}
            alineado="center"
            color_text="gray"
            tamano_letra="6"
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthCard;

/**
 * Autor: Marisol Alfaro
 * Descripción: Componente visual para mostrar estados sin resultados.
 * Uso: Informa cuando una lista o tabla no contiene registros.
 */

import Icon from "./icon";
import Titulo from "./Titulo";
import Texto from "./Texto";

const EmptyState = ({
  title = "No hay resultados",
  message = "No se encontraron registros disponibles.",
  icon = "informacion",
  children,
}) => {
  return (
    <div className="text-center py-5">
      <div className="fs-1 text-secondary mb-3">
        <Icon name={icon} />
      </div>

      <Titulo
        tipografia="h5"
        texto={title}
        alineado="center"
        color_text="black"
      />

      <Texto
        texto={message}
        alineado="center"
        color_text="gray"
        tamano_letra="6"
      />

      {children}
    </div>
  );
};

export default EmptyState;

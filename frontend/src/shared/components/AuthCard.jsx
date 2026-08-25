/**
 * Autor: Marisol Alfaro
 * Descripción: Tarjeta reutilizable para las pantallas de autenticación.
 * Uso: Contiene la información y formularios de autenticación.
 */

import { useState, useEffect } from 'react';
import Titulo from "./Titulo";
import Texto from "./Texto";
import configuracionService from 
  '../../module/configuracion/services/configuracion.service';

const AuthCard = ({
  children,
  subtitle = "Control de marcas y préstamos",
}) => {
  const [nombreInstitucion, setNombreInstitucion] = useState();
  useEffect(() => {
    configuracionService.getConfiguracion()
      .then(res => {
        const config = res?.data || res;
        if (config?.nombre_institucion) {
          setNombreInstitucion(config.nombre_institucion);
        }
      })
      .catch(() => {});
  }, []);
  return (
    <div className="card border-0 shadow rounded-4 p-4">
      <div className="card-body">
        <div className="text-center mb-4">
          <Titulo
            tipografia="h2"
            texto={nombreInstitucion}
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

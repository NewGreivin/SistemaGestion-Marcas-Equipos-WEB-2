//Autor: Greivin Eliecer A.G

import { ICONOS } from "../../themes/iconos";

export default function Icon({ name, className = "" }) {
  return (
    <i className={`bi ${ICONOS[name]} ${className}`}></i>
  );
}
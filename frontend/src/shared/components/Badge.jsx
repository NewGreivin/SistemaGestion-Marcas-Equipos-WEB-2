//Autor: Greivin Eliecer A.G

import Icon from './Icon';
/**
 * Badge / Chip — Etiqueta corta para rol, categoría o estado.
 *
 * Props:
 *  - label     {string}   Texto del badge (requerido)
 *  - variant   {string}   Color Bootstrap: 'primary' | 'secondary' | 'success' |
 *                         'danger' | 'warning' | 'info' | 'light' | 'dark'
 *              Default: 'secondary'
 *  - pill      {boolean}  Si es true usa bordes completamente redondeados (chip style)
 *  - icon      {string}   Nombre del icono en el theme (ej. 'correcto', 'error') opcional
 *  - className {string}   Clases adicionales
 */
export default function Badge({
  label,
  variant = 'secondary',
  pill = false,
  icon = null,
  className = '',
}) {
  const pillClass = pill ? 'rounded-pill' : '';
  return (
    <span
      className={`badge text-bg-${variant} ${pillClass} ${className} d-inline-flex align-items-center gap-1`}
      style={{ fontSize: '0.8rem', fontWeight: 500, padding: '0.35em 0.65em' }}
    >
      {icon && <Icon name={icon} />}
      {label}
    </span>
  );
}
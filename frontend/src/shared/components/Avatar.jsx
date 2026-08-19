import Imagenes from './Image';
/**
 * Avatar — Círculo con iniciales o foto de usuario.
 *
 * Props:
 *  - nombre    {string}  Nombre completo del usuario (se extraen iniciales automáticamente)
 *  - src       {string}  URL de la foto de perfil (opcional; si se omite se usan iniciales)
 *  - size      {string}  'sm' | 'md' (default) | 'lg'
 *  - variant   {string}  Color Bootstrap: 'primary' | 'secondary' | 'success' | 'danger' | etc.
 *              Solo aplica cuando no hay `src`.
 *  - className {string}  Clases adicionales
 *  - alt       {string}  Texto alternativo para la imagen (accesibilidad)
 */
export default function Avatar({
  nombre = '',
  src = null,
  size = 'md',
  variant = 'secondary',
  className = '',
  alt = '',
}) {
  
  const iniciales = nombre
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');

  const sizeMap = {
    sm: { wh: '28px', fs: '0.7rem' },
    md: { wh: '38px', fs: '0.9rem' },
    lg: { wh: '52px', fs: '1.2rem' },
  };
  const { wh, fs } = sizeMap[size] ?? sizeMap.md;

  const baseStyle = {
    width: wh,
    height: wh,
    minWidth: wh,
    fontSize: fs,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    userSelect: 'none',
    flexShrink: 0,
  };

  if (src) {
    return (
      <Imagenes
        url={src}
        alt={alt || nombre}
        title={nombre}
        style={baseStyle}
        className={`object-fit-cover ${className}`}
        classExtra={`object-fit-cover ${className}`}
        clase=""
      />
    );
  }

  return (
    <span
      className={`bg-${variant} text-white ${className}`}
      style={baseStyle}
      title={nombre}
      aria-label={nombre || 'Avatar'}
    >
      {iniciales || <i className="bi bi-person-fill" style={{ fontSize: fs }} />}
    </span>
  );
}

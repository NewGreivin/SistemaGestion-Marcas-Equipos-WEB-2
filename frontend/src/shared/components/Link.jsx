export default function Link({
  href = "#",
  texto,
  children,
  onClick,
  target = "_self", // Usa "_blank" si quieres que abra en una nueva pestaña
  variant = "primary", // primary, secondary, danger, info, etc.
  underlined = false,
  className = "",
}) {
  const colorClass = `text-${variant}`;
  const decorationClass = underlined ? "text-decoration-underline" : "text-decoration-none";

  return (
    <a
      href={href}
      onClick={onClick}
      target={target}
      // Por seguridad, si abre en otra pestaña, se debe agregar rel="noopener noreferrer"
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`${colorClass} ${decorationClass} fw-semibold ${className}`}
      style={{ cursor: "pointer", transition: "all 0.2s ease-in-out" }}
    >
      {children ?? texto}
    </a>
  );
}
export default function Card({
    color_background = "#ffffff",
    color_texto = "black",
    alineado_card = "center",
    header,
    footer,
    card_width = "18rem",
    responsivo = false,
    texto_alineado = "left",
    
    child_top,
    children,
    child_bottom,
    className = ""
}) {

    const color_text = {
      "blue": "text-primary",
      "grey": "text-secondary",
      "green": "text-success",
      "red": "text-danger",
      "yellow": "text-warning",
      "skyblue": "text-info",
      "white": "text-light",
      "black": "text-dark"
    }[color_texto] || "text-dark";

    const alineacion_card = {
      "left": "me-auto",
      "center": "mx-auto",
      "right": "ms-auto"
    }[alineado_card] || "mx-auto";

    const alineado_text = {
      "left": "text-start",
      "center": "text-center",
      "right": "text-end"
    }[texto_alineado] || "text-start";

    const card_responsive = responsivo ? "w-100" : "";
    
    const customStyle = { 
        backgroundColor: color_background,
        ...(responsivo ? {} : { width: card_width })
    };

    return (
        <div 
            className={`card ${color_text} ${alineacion_card} ${alineado_text} shadow-sm rounded ${card_responsive} ${className}`} 
            style={customStyle}
        >
            {header && <div className="card-header">{header}</div>}

            {child_top}

            <div className="card-body">
                {children} 
            </div>

            {child_bottom}
            
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    );
}
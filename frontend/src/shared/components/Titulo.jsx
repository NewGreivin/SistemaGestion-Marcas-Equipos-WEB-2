//Autor: Greivin Eliecer A.G

export default function Titulo( {
    tipografia = "h1", 
    texto,
    children,
    className = '', 
    alineado = "left", 
    color_text, 
    id,
}) {

    const Tag = tipografia;

    const alineacion = {
        "left": "text-start",
        "center": "text-center",
        "right": "text-end"
    }[alineado] || "text-start";

    const colorStyle = color_text ? { color: color_text } : {};
    return (
        <Tag 
            id={id}
            className={`${tipografia} ${alineacion} ${className}`}
            style={colorStyle}
        >
            {children ?? texto}
        </Tag>
    );
}
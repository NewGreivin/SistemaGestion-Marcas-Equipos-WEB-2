//Autor: Greivin Eliecer A.G

export default function Texto({ 
    texto,
    children,
    className = '',     
    alineado = "left",
    color_text,
    tamano_letra,
}) {
    const alineacion = {
        "left": "text-start",
        "center": "text-center",
        "right": "text-end"
    }[alineado] || "text-start";

    const fontSize = {
        "1": "fs-1",
        "2": "fs-2",
        "3": "fs-3",
        "4": "fs-4",
        "5": "fs-5",
        "6": "fs-6"
    }[tamano_letra] || "";

    const colorClass = color_text ? `text-${color_text}` : "";

    return (
        <p 
            className={`mb-0 ${alineacion} ${fontSize} ${colorClass} ${className}`}
        >
            {children ?? texto}
        </p>
    );
}

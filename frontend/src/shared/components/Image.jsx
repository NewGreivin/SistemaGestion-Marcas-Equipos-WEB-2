//Autor: Greivin Eliecer A.G

export default function Imagenes({ 
    url, 
    alt = "No logro cargar la imagen",
    clase = "responsive", 
    ancho, 
    alto,
    classExtra = "",
    style, // Soporte de estilos (ej: borderRadius del Avatar)
    title  // Soporte del tooltip nativo
}) {
    const clase_imagen = {
        "responsive": "img-fluid",
        "thumbnail": "img-thumbnail",
        "left": "float-start",
        "right": "float-end",
        "block_center": "mx-auto d-block"
    }[clase] || "";
    return(
        <img 
            className={`${classExtra} ${clase_imagen}`.trim()} 
            src={url} 
            alt={alt} 
            width={ancho} 
            height={alto}
            style={style}
            title={title}
        />
    );
}
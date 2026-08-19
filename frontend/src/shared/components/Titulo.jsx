//Autor: Greivin Eliecer A.G

export default function Titulo( {
    tipografia="h1", 
    texto, 
    alineado="left", 
    color_text="white"
} 

){

    const Tag = tipografia;

    const alineacion = {
        "left": "text-start",
        "center": "text-center",
        "right": "text-end"
    }[alineado];

    return(
        <Tag className={`${tipografia} ${alineacion}`} style={{ color: color_text }}>
            {texto}
        </Tag>
    )
}
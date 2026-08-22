// Autor: Ricardo Chaves Campos
export const TIPOS_MARCA = {
    ENTRADA: "ENTRADA",
    SALIDA: "SALIDA"
}

export default class Marca {
    constructor({
        id,
        usuario_id,
        dispositivo_id,
        fecha,
        hora,
        tipo_marca,
        direccion_ip
    }) {
        this.id = id,
        this.usuario_id = usuario_id;
        this.dispositivo_id = dispositivo_id;
        this.fecha = fecha;
        this.hora = hora;
        this.tipo_marca = tipo_marca;
        this.direccion_ip = direccion_ip;
    }
}

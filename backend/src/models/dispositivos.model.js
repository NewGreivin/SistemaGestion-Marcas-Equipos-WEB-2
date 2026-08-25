// Autor: Ricardo Chaves Campos

export default class Dispositivo {
    constructor({
        id,
        identificador,
        nombre,
        descripcion,
        fecha_registro,
        usuario_id,
        estado
    }) {
        this.id = id;
        this.identificador = identificador;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha_registro = fecha_registro;
        this.usuario_id = usuario_id;
        this.estado = estado;
    }
}
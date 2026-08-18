// Autor: Marisol Alfaro
// Descripción: Representa la estructura de los datos principales de un préstamo.
// Uso: Se utiliza para organizar la información de los préstamos dentro del sistema.

export default class Prestamo {
    constructor({ id, usuario_id, encargado_id, fecha, estado, usuario, encargado, equipos = [] }) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.encargado_id = encargado_id;
        this.fecha = fecha;
        this.estado = estado;
        this.usuario = usuario;
        this.encargado = encargado;
        this.equipos = equipos;
    }
}

// Autor: Marisol Alfaro
// Descripción: Representa la estructura de los registros mostrados en el historial.
// Uso: Organiza la información de usuario, fecha, estado y equipo para su consulta.

export default class Historial {
    constructor({ prestamo_id, usuario_id, usuario, fecha, estado, equipo_id, equipo, descripcion }) {
        this.prestamo_id = prestamo_id;
        this.usuario_id = usuario_id;
        this.usuario = usuario;
        this.fecha = fecha;
        this.estado = estado;
        this.equipo_id = equipo_id;
        this.equipo = equipo;
        this.descripcion = descripcion;
    }
}

// Autor: Marisol Alfaro
// Descripción: Representa la información de cada equipo asociado a un préstamo.
// Uso: Se utiliza para organizar los detalles y el estado de los equipos prestados.

export default class PrestamoDetalle {
    constructor({ id, prestamo_id, equipo_id, codigo, descripcion, observacion, estado_devolucion }) {
        this.id = id;
        this.prestamo_id = prestamo_id;
        this.equipo_id = equipo_id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.observacion = observacion;
        this.estado_devolucion = estado_devolucion;
    }
}

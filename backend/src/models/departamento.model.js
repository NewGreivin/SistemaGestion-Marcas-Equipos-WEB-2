// Autor: Brayan Azofeifa
// Descripción: Representa la estructura de los departamentos en el sistema.
// Uso: Organiza la información de los departamentos consultados en la base de datos.

export default class Departamento {
    constructor({ id, nombre, descripcion, encargado }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.encargado = encargado;
    }
}
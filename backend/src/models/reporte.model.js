// Autor: Brayan Azofeifa
// Descripción: Representa la estructura de los registros de marcas generados para el reporte.
// Uso: Organiza la información de usuario, entradas, salidas, dispositivo e IP.

export default class Reporte {
    constructor({ Usuario, Fecha, Entrada, Salida, Dispositivo, IP }) {
        this.Usuario = Usuario;
        this.Fecha = Fecha;
        this.Entrada = Entrada;
        this.Salida = Salida;
        this.Dispositivo = Dispositivo;
        this.IP = IP;
    }
}
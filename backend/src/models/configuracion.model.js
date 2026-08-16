export default class Configuracion {
    constructor({ id, nombre_institucion, rango_ip_permitido, 
        tiempo_maximo_sesion, tamano_maximo_archivos }) {
        this.id = id;
        this.nombre_institucion = nombre_institucion;
        this.rango_ip_permitido = rango_ip_permitido;
        this.tiempo_maximo_sesion = tiempo_maximo_sesion;
        this.tamano_maximo_archivos = tamano_maximo_archivos;
    }
}
export default class Usuario {
    constructor({ id, nombre_completo, fecha_nacimiento, correo, username, 
        password_hash, departamento_id, rol_id, departamento, rol }) {
        this.id = id;
        this.nombre_completo = nombre_completo;
        this.fecha_nacimiento = fecha_nacimiento;
        this.correo = correo;
        this.username = username;
        this.password_hash = password_hash;
        this.departamento_id = departamento_id;
        this.rol_id = rol_id;
        
        this.departamento = departamento;
        this.rol = rol;
    }
}
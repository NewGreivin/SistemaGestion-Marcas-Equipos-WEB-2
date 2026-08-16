CREATE DATABASE IF NOT EXISTS gestion_marcas_equipos
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE gestion_marcas_equipos;

-- ==========================================
-- 1. TABLAS DE CATÁLOGOS Y CONFIGURACIÓN
-- ==========================================

-- Tabla roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla departamentos (o carreras)
CREATE TABLE departamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    encargado VARCHAR(100)
);

-- Tabla configuracion
CREATE TABLE configuracion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_institucion VARCHAR(150) NOT NULL,
    rango_ip_permitido VARCHAR(255),
    tiempo_maximo_sesion INT NOT NULL COMMENT 'Tiempo en minutos',
    tamano_maximo_archivos INT NOT NULL COMMENT 'Tamaño en MB'
);

-- ==========================================
-- 2. TABLAS DE USUARIOS Y SEGURIDAD
-- ==========================================

-- Tabla usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    departamento_id INT NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id) ON DELETE RESTRICT,
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE RESTRICT
);

-- Tabla sesiones
CREATE TABLE sesiones (
    id VARCHAR(255) PRIMARY KEY COMMENT 'ID de sesión (cookie)',
    usuario_id INT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion DATETIME NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla tokens_recuperacion
CREATE TABLE tokens_recuperacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    fecha_expiracion DATETIME NOT NULL,
    utilizado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ==========================================
-- 3. MÓDULO DE MARCAS
-- ==========================================

-- Tabla dispositivos
CREATE TABLE dispositivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    identificador VARCHAR(255) NOT NULL UNIQUE COMMENT 'Identificador único generado por el sistema, no MAC',
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('ACTIVO', 'INACTIVO') DEFAULT 'ACTIVO',
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla marcas
CREATE TABLE marcas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    dispositivo_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    tipo_marca ENUM('ENTRADA', 'SALIDA') NOT NULL,
    direccion_ip VARCHAR(45) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (dispositivo_id) REFERENCES dispositivos(id) ON DELETE RESTRICT
);

-- ==========================================
-- 4. MÓDULO DE PRÉSTAMO DE EQUIPOS
-- ==========================================

-- Tabla equipos
CREATE TABLE equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT NOT NULL,
    imagen VARCHAR(255) COMMENT 'Ruta segura o nombre del archivo de la imagen',
    estado ENUM('DISPONIBLE', 'PRESTADO', 'MANTENIMIENTO', 'INACTIVO') DEFAULT 'DISPONIBLE'
);

-- Tabla prestamos (Encabezado)
CREATE TABLE prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL COMMENT 'Usuario que recibe el préstamo',
    encargado_id INT NOT NULL COMMENT 'Encargado que aprueba el préstamo',
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('ACTIVO', 'FINALIZADO') DEFAULT 'ACTIVO',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
    FOREIGN KEY (encargado_id) REFERENCES usuarios(id) ON DELETE RESTRICT
);

-- Tabla prestamo_detalle (Detalle)
CREATE TABLE prestamo_detalle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prestamo_id INT NOT NULL,
    equipo_id INT NOT NULL,
    descripcion TEXT COMMENT 'Observaciones al momento del préstamo/devolución',
    estado_devolucion ENUM('PRESTADO', 'DISPONIBLE') DEFAULT 'PRESTADO',
    FOREIGN KEY (prestamo_id) REFERENCES prestamos(id) ON DELETE CASCADE,
    FOREIGN KEY (equipo_id) REFERENCES equipos(id) ON DELETE RESTRICT
);

-- ==========================================
-- 6. ÍNDICES DE OPTIMIZACIÓN (INDEXES)
-- ==========================================

CREATE INDEX idx_usuarios_departamento ON usuarios(departamento_id);

CREATE INDEX idx_marcas_usuario_fecha ON marcas(usuario_id, fecha);
CREATE INDEX idx_marcas_fecha ON marcas(fecha);

CREATE INDEX idx_dispositivos_usuario_estado ON dispositivos(usuario_id, estado);

CREATE INDEX idx_equipos_estado ON equipos(estado);

CREATE INDEX idx_prestamos_usuario_estado ON prestamos(usuario_id, estado);
CREATE INDEX idx_prestamos_fecha ON prestamos(fecha);

CREATE INDEX idx_prestamo_detalle_equipo ON prestamo_detalle(equipo_id);
CREATE INDEX idx_prestamo_detalle_estado ON prestamo_detalle(estado_devolucion);
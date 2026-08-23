USE gestion_marcas_equipos;

-- ==========================================
-- ROLES
-- ==========================================
INSERT INTO roles (nombre) VALUES 
('Administrador'),
('Usuario');

-- ==========================================
-- DEPARTAMENTOS
-- ==========================================
INSERT INTO departamentos (nombre, descripcion, encargado) VALUES 
('Tecnologías de Información', 'Carrera de Ingeniería en Tecnologías de Información', 'Prof. Juan Pablo Rodriguez');

-- ==========================================
-- CONFIGURACIÓN
-- ==========================================
INSERT INTO configuracion (nombre_institucion, rango_ip_permitido, tiempo_maximo_sesion, tamano_maximo_archivos) VALUES 
('Universidad Técnica Nacional Sede Guanacaste', '192.168.1.0/24', 60, 5);

-- ==========================================
-- USUARIOS
-- IMPORTANTE: Reemplaza el password_hash del admin con el que generes tú
-- La contraseña es: root123
-- ==========================================
INSERT INTO usuarios (nombre_completo, fecha_nacimiento, correo, username, password_hash, departamento_id, rol_id) VALUES 
('Greivin Arguedas Admin', '2000-01-15', 'admin@utn.ac.cr', 'admin', '$2a$12$FC21hbfGMW5DsdtQMDomSeDVV47TrHxshF7/dYuHr3bgcumDkeEtW', 1, 1),
('Juan Perez Usuario',     '1998-05-20', 'juan@utn.ac.cr',  'jperez', '$2a$12$FC21hbfGMW5DsdtQMDomSeDVV47TrHxshF7/dYuHr3bgcumDkeEtW', 1, 2);

-- ==========================================
-- TOKENS DE RECUPERACIÓN (Prueba)
-- ==========================================
INSERT INTO tokens_recuperacion (usuario_id, token, fecha_expiracion, utilizado) VALUES 
(1, 'token-prueba-abc123', DATE_ADD(NOW(), INTERVAL 1 HOUR), FALSE);

-- ==========================================
-- DISPOSITIVOS (Le corresponde a otro módulo, solo 1 de prueba)
-- ==========================================
INSERT INTO dispositivos (identificador, nombre, descripcion, estado, usuario_id) VALUES 
('DISPOSITIVO-UNICO-001', 'Laptop Personal', 'Laptop Dell Inspiron del usuario', 'ACTIVO', 2);

-- ==========================================
-- MARCAS (Le corresponde a otro módulo, solo 1 de prueba)
-- ==========================================
INSERT INTO marcas (usuario_id, dispositivo_id, fecha, hora, tipo_marca, direccion_ip) VALUES 
(2, 1, CURDATE(), '08:00:00', 'ENTRADA', '192.168.1.10');

-- ==========================================
-- EQUIPOS (Le corresponde a otro módulo, solo 1 de prueba)
-- ==========================================
INSERT INTO equipos (codigo, descripcion, imagen, estado) VALUES 
('EQ-001', 'Proyector Epson PowerLite', NULL, 'DISPONIBLE');

-- ==========================================
-- PRÉSTAMOS (Le corresponde a otro módulo, solo 1 de prueba)
-- ==========================================
INSERT INTO prestamos (usuario_id, encargado_id, estado) VALUES 
(2, 1, 'ACTIVO');

-- ==========================================
-- DETALLE DEL PRÉSTAMO (Le corresponde a otro módulo, solo 1 de prueba)
-- ==========================================
INSERT INTO prestamo_detalle (prestamo_id, equipo_id, descripcion, estado_devolucion) VALUES 
(1, 1, 'Préstamo para presentación del proyecto', 'PRESTADO');
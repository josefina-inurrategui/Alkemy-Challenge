CREATE TABLE eventos(
	id INT PRIMARY KEY AUTO_INCREMENT,
	fecha DATE NOT NULL,
	hora_inicio TIME NOT NULL,
	hora_finalizacion TIME,
);
CREATE TABLE participantes(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nombre_completo VARCHAR(30) NOT NULL,
    mail VARCHAR(30) NOT NULL,
    descripcion VARCHAR(200)
);
CREATE TABLE asistentes(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_participante INT NOT NULL,
    id_evento INT NOT NULL,
    asistencia ENUM('sin respuesta','voy','no voy') DEFAULT 'sin respuesta'
);

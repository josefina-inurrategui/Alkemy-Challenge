CREATE TABLE events(
	id INT PRIMARY KEY AUTO_INCREMENT,
	event_date DATE NOT NULL,
	start_time TIME NOT NULL,
	end_time TIME,
    active boolean NOT NULL DEFAULT 0
);
CREATE TABLE participants(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	complete_name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    participant_desc VARCHAR(200)
);
CREATE TABLE assistants(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_participant INT NOT NULL,
    id_event INT NOT NULL,
    assistance ENUM('sin respuesta','voy','no voy') DEFAULT 'sin respuesta' NOT NULL
);

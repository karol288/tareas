create database gestion_de_tareas;


-- DROP TABLE Usuarios
DROP TABLE IF EXISTS Usuarios CASCADE;

-- CREATE TABLE Usuarios
CREATE TABLE Usuarios (
	id_Usuarios BIGSERIAL NOT NULL,
	Nombre varchar(100) NOT NULL,
	password varchar(128) NOT NULL,
	email varchar (200) not null,
	url_imagen text default null ,
	CONSTRAINT pk_Usuario PRIMARY KEY(id_Usuarios)
);

-- DROP TABLE Permiso
DROP TABLE IF EXISTS tareas CASCADE;

CREATE TABLE tareas (
	id_tarea bigserial NOT NULL,
	id_usuario int8 NOT NULL,
	titulo varchar(200) NOT NULL,
	descripcion varchar(200) NOT NULL,
	fecha_finalizacion date NOT NULL,
	estado varchar(200) NOT NULL,
	CONSTRAINT tareas_pk PRIMARY KEY (id_tarea)
);


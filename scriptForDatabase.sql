DROP DATABASE IF EXISTS homework79;

CREATE DATABASE IF NOT EXISTS homework79;

USE homework79;

CREATE TABLE IF NOT EXISTS categories
(
	id int not null auto_increment,
	name varchar(255) not null,
	description text null,
	constraint categories_pk
		primary key (id)
);

CREATE TABLE locations
(
	id int not null auto_increment,
	name varchar(255) not null,
	description text null,
	constraint locations_pk
		primary key (id)
);

CREATE TABLE accounting_subjects
(
	id int not null auto_increment,
	category_id int not null,
	location_id int not null,
	name varchar(255) not null,
	description text null,
	registration_date datetime not null,
	image varchar(255) null,
	constraint accounting_subjects_pk
		primary key (id),
	constraint accounting_subjects_categories_id_fk
		foreign key (category_id)
        references categories (id)
        on update cascade
        on delete restrict,
	constraint accounting_subjects_locations_id_fk
		foreign key (location_id)
        references locations (id)
        on update cascade
        on delete restrict
);

INSERT INTO categories (name)
VALUES ('Furniture'),
       ('Computer equipment'),
       ('Appliances');

INSERT INTO locations (name)
VALUES ('Director''s office'),
       ('Office #1'),
       ('Office #2');

INSERT INTO accounting_subjects (category_id, location_id, name, description, registration_date)
VALUES (1, 1, 'Chair', 'Computer chair M123', '2021-10-19 20:14:10'),
       (1, 2, 'Chair', 'Computer chair M555', '2021-10-19 20:21:10'),
       (2, 2, 'Computer', 'MacBook Pro 13in', '2021-10-19 20:25:10'),
       (1, 1, 'Table', 'Computer table N2478', '2021-10-19 20:27:10'),
       (1, 3, 'Chair', 'Computer chair M909', '2021-10-19 20:29:10'),
       (3, 1, 'Conditioner', 'Samsung X458', '2021-10-19 20:30:10');

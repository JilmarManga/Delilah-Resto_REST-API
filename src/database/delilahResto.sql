--
-- Database: `Delilah_Resto_API`
--

-- CREATE DATABASE Delilah_Resto_API;
-- USE Delilah_Resto_API;

-- -------------------------users------------------------------------------------
--
-- Table structure for the `users`
--

CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL UNIQUE,
    surname varchar(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	fullname VARCHAR(100) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	mobile INT(25) NOT NULL UNIQUE,
	address VARCHAR(50) NOT NULL,
	is_deleted INT NOT NULL DEFAULT 0,
	is_admin INT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
) AUTO_INCREMENT = 1000;

--
-- Data for the table `users`
--

INSERT INTO users (username, surname, password, fullname, email, mobile, address, is_admin)
VALUES ('admin', 'Doe', '$2a$10$JbpaRXkkBreRkd..0KHb2.m2dM5lsfW88UytK/I60vGNEtyuXoYu', 'Administrador1', 'administrador1@delilah-resto.com', 32165, 'default', 1),
	('user', 'Doe', '$2a$10$QavtxvDEn1YR/xdF1BesC.mXJBIp2l.WB1Y0mPok80OABy4HCr/9a', 'Maria Medina', 'mariamedina@gmail.com', 30469, 'Crr 12 #64 21', 0);

-- -------------------------users------------------------------------------------


-- -------------------------products------------------------------------------------
--
-- Table structure for the `products`
--

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	picture VARCHAR(255) NOT NULL,
	price INT(10) NOT NULL,
	is_deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
) AUTO_INCREMENT = 100;

--
-- Data for the table `products`
--

INSERT INTO products (name,picture,price,is_deleted)
VALUES
('Hamburguesa Clasica','/img/hamburguesa_Clasica.jpg',12000,0),
('Sandwich Veggie','/img/Veggie-Sandwich.jpg',10500,0),
('Bagel de salmón','/img/bagel-de-salmon.jpg',17000,0),
('Ensalada veggie','/img/ensalada-vegetal.jpg',13500,0),
('Veggie avocado','/img/Veggie_Avocado.jpg',10500,0),
('Focaccia','/img/Focaccia.jpg',15000,0),
('Sandwich de queso','/img/Sandwich_Queso.jpg',10500,0),
('Hamburguesa especial','/img/hamburguesa_Especial.jpg',19500,0),
('Agua en Botella','/img/Agua_Botella.jpg',2500,0),
('Coca Cola 600ml','/img/coca_cola_600.jpg',3500,0);

-- -------------------------products------------------------------------------------


-- -------------------------payment------------------------------------------------
--
-- Table structure for the `payment`
--

CREATE TABLE payment(
	id INT NOT NULL AUTO_INCREMENT,
	method VARCHAR(25) NOT NULL,
	PRIMARY KEY(id)
) AUTO_INCREMENT = 10;

--
-- Data for the table `payment`
--

INSERT INTO payment (method)
VALUES ('Efectivo'), ('Tarjeta Debito'), ('Tarjeta Credito'), ('Nequi'), ('Daviplata');

-- -------------------------payment------------------------------------------------


-- -------------------------status------------------------------------------------
--
-- Table structure for the `status`
--

CREATE TABLE status(
	id INT NOT NULL AUTO_INCREMENT,
	status VARCHAR(25) NOT NULL,
	PRIMARY KEY(id)
) AUTO_INCREMENT = 50;

--
-- Data for the table `status`
--

INSERT INTO status (status)
VALUES ('Nuevo'), ('Confirmado'), ('En preparación'), ('En camino'), ('Entregado'), ('Cancelado');

-- -------------------------status------------------------------------------------


-- -------------------------orders------------------------------------------------
--
-- Table structure for the `status`
--

CREATE TABLE orders(
	id INT NOT NULL AUTO_INCREMENT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	is_deleted TINYINT NOT NULL DEFAULT 0,
	payment_id INT NOT NULL,
	status_id INT NOT NULL,
	total INT NOT NULL,
	user_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id),
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(payment_id) REFERENCES payment(id),
	FOREIGN KEY(status_id) REFERENCES status(id)
) AUTO_INCREMENT = 10000;

-- -------------------------orders------------------------------------------------


-- -------------------------order_details------------------------------------------------
--
-- Table structure for the `status`
--

CREATE TABLE order_details(
	id INT NOT NULL AUTO_INCREMENT,
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	quantity INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id),
	FOREIGN KEY(order_id) REFERENCES orders(id),
	FOREIGN KEY(product_id) REFERENCES products(id)
) AUTO_INCREMENT = 50000;

-- -------------------------order_details------------------------------------------------


-- -------------------------favorites------------------------------------------------
--
-- Table structure for the `favorites`
--

CREATE TABLE favorites(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT,
	product_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(product_id) REFERENCES products(id)
);

-- -------------------------favorites------------------------------------------------


-- -------------------------favorites------------------------------------------------
--
-- Table structure for the `favorites`
--

CREATE TABLE favorites(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT,
	product_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(product_id) REFERENCES products(id)
);

-- -------------------------favorites------------------------------------------------







<<<<<<< HEAD
CREATE DATABASE tiendanode;
USE tiendanode;

CREATE TABLE IF NOT EXISTS marcas(
	id 				INT AUTO_INCREMENT PRIMARY KEY,
    nombremarca		VARCHAR(100) NOT NULL,
    create_at 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)engine = InnoDB;

insert into marcas(nombremarca) values ('Samsung');
insert into marcas(nombremarca) values ('AMD');


-- Garantia en meses
create table if not exists productos(
	id 			int auto_increment primary key,
    idmarca	 	int not null,
    nombre 		varchar(150) not null,
    precio 		decimal(7,2) not null,
    garantia 	tinyint comment 'Se debera indicar en meses',
    descripcion varchar(100) not null,
    fechacompra date not null,
    create_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    constraint fk_idmarca_prd foreign key (idmarca) references  marcas (id)
)engine = InnoDB;

insert into productos
		(idmarca, nombre, precio, garantia, descripcion, fechacompra)
		values
		(1,'Monitor',400,24,'resolucion full hd - 60h','2026-02-01'),
		(2,'Microprocesador',700,12,'Ryzen 5 - 5200','2026-03-10');

update productos set descripcion = 'resolucion full hd -120hz' where id=1;
select * from  productos;
=======
-- ============================================
-- BASE DE DATOS: productos_db
-- ============================================

CREATE DATABASE IF NOT EXISTS productos_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE productos_db;

CREATE TABLE IF NOT EXISTS marcas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombremarca VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idmarca INT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  garantia INT COMMENT 'Meses de garantía',
  descripcion TEXT,
  fechacompra DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_producto_marca
    FOREIGN KEY (idmarca) REFERENCES marcas(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO marcas (nombremarca) VALUES
  ('Samsung'),
  ('Apple'),
  ('LG'),
  ('Sony'),
  ('HP'),
  ('Lenovo'),
  ('Dell'),
  ('Asus');

INSERT INTO productos (idmarca, nombre, precio, garantia, descripcion, fechacompra) VALUES
  (1, 'Galaxy S24 Ultra', 1299.99, 12, 'Smartphone de alta gama con cámara de 200MP y S Pen integrado.', '2024-01-15'),
  (2, 'MacBook Pro M3', 2499.00, 12, 'Laptop profesional con chip M3 Pro, 18GB RAM y 512GB SSD.', '2024-02-10'),
  (3, 'Monitor UltraWide 34"', 599.50, 24, 'Monitor curvo 34 pulgadas 3440x1440 con panel IPS y 144Hz.', '2023-11-20'),
  (4, 'PlayStation 5', 499.99, 12, 'Consola de videojuegos de nueva generación con SSD NVMe.', '2023-12-01'),
  (5, 'Laptop HP Pavilion', 749.00, 12, 'Laptop con procesador Intel Core i7, 16GB RAM y 512GB SSD.', '2024-03-05'),
  (6, 'ThinkPad X1 Carbon', 1599.00, 24, 'Laptop empresarial ultraligera con pantalla OLED 14".', '2024-01-28'),
  (7, 'Dell XPS 15', 1899.99, 12, 'Laptop premium con pantalla OLED 15.6" y RTX 4060.', '2024-02-14'),
  (8, 'ROG Zephyrus G14', 1349.00, 12, 'Laptop gaming con AMD Ryzen 9 y GPU Radeon RX 7600S.', '2024-03-18');
>>>>>>> 882a7ad (Avance)

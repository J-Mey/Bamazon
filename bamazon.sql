DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT (10) NULL,
    PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES  ("Playstation 4", "Game Console", 299.99, 20),
        ("Nintendo Switch", "Game Console", 299.99, 25),
        ("Jordan XIV", "Clothing", 179.99, 50),
        ("Samsung Galaxy S10+", "Phones", 799.99, 15),
        ("65 inch TV", "HDTV", 599.99, 10),
        ("NFL Jersey", "Clothing", 149.99, 14),
        ("King Size Pillow", "Bedding", 15.99, 50),
        ("Bluetooth headphone", "Electronics", 31.99, 40),
        ("Hennessy 750ml", "Alcohol", 26.99, 25),
        ("Eloquent JavaScript", "Books", 28.51, 65);
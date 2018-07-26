DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(500) NULL,
    dept_name VARCHAR(100) NULL,
    price FLOAT(6,2) NULL,
    stock_quantity INT NULL
);
-- inital stocking
INSERT INTO products(product_name, dept_name, price, stock_quantity) 
VALUES 
("Amazon Echo", "Electronics", 99.99, 4), 
("Macbook Pro", "Electronics", 1099.00, 2), 
("Mattel Games UNO Card Game", "Toys & Games", 4.99, 25),
("Play-Doh Modeling Compound", "Toys & Games", 7.99, 25),
("Intex Swim Center Family Inflatable Pool", "Pool, Lawn & Garden", 25.42, 10),
("Manve Magnetic Blocks Building Set", "Toys & Games", 39.99, 25),
("Caryola 24ct Crayons (6 pack)", "Toys & Games", 11.40, 25),
("The Russia Hoax: The Illicit Scheme to Clear Hillary Clinton and Frame Donald Trump", "Books", 16.79, 50),
("The Plant Paradox: The Hidden Dangers in Healthy Foods That Cause Disease and Weight Gain", "Books", 17.39, 50),
("You Are a Badass®: How to Stop Doubting Your Greatness and Start Living an Awesome Life", "Books", 9.59, 50);

SELECT * FROM products;
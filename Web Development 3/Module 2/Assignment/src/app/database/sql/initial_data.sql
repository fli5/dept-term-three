-- Initialize Tables with data
INSERT INTO Customers (customer_id, name, email)
VALUES (1, 'Alice', 'alice@example.com'),
       (2, 'Bob', 'bob@example.com'),
       (3, 'Charlie', 'charlie@example.com');

INSERT INTO Products (product_id, name, price)
VALUES (1, 'Laptop', 1200.50),
       (2, 'Smartphone', 800.00),
       (3, 'Headphones', 150.75);

INSERT INTO Orders (order_id, customer_id, product_id, quantity)
VALUES (1, 1, 1, 2),
       (2, 2, 3, 1),
       (3, 3, 2, 3);

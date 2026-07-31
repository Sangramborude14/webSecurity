CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (username,password)
VALUES
('alice','alice123'),
('bob','bob123'),
('admin','admin123')    
DROP TABLE IF EXISTS
    employees
;

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    phone VARCHAR,
    salary VARCHAR
);

INSERT INTO employees (first_name, last_name, email, phone, salary)
    VALUES
        ('George', 'Smith', 'georgesmith@gmail.com', '(801) 555-1234',  60000),
        ('Timmothy', 'Burns', 'timburns@gmail.com', '(801) 555-4567', 85000)
;


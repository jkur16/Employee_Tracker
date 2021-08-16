DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
	id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
	id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE SET NULL,
  manager_id INTEGER,
  FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

--Departent Seeds
INSERT INTO department (name)
VALUES (Sales);
INSERT INTO department (name)
VALUES (Engineering);
INSERT INTO department (name)
VALUES (Finance);
INSERT INTO department (name)
VALUES (Legal);

--Role Seeds
INSERT INTO role (title, salary, department_id)
VALUES (Sales_Lead, 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES (Salesperson, 65000, 1);
INSERT INTO role (title, salary, department_id)
VALUES (Engineer, 125000, 2);
INSERT INTO role (title, salary, department_id)
VALUES (Lead_Engineer, 175000, 2);
INSERT INTO role (title, salary, department_id)
VALUES (Accountant, 89000, 3);
INSERT INTO role (title, salary, department_id)
VALUES (Finance_Director, 175000, 3);
INSERT INTO role (title, salary, department_id)
VALUES (Staff_Attorney, 145000, 4);
INSERT INTO role (title, salary, department_id)
VALUES (Corporate_Lawyer, 250000, 4);

#Employee Seeds
INSERT INTO employee (first_name, last_name, rold_id, manager_id)
VALUES (Charles, Barkley, 1, null);
INSERT INTO employee (first_name, last_name, rold_id, manager_id)
VALUES (Dennis, Rodman, 2, 1);
INSERT INTO employee (first_name, last_name, rold_id, manager_id)
VALUES (Tom, Brady, 3, 4);
INSERT INTO employee (first_name, last_name, rold_id, manager_id)
VALUES (Patrick, Mahomes, 4, null);
INSERT INTO employee (first_name, last_name, rold_id, manager_id)
VALUES (Steve, Yzerman, 5, 6);
INSERT INTO employee (first_name, last_name, rold_id, manager_id)
VALUES (Sergei, Fedorov, 6, null);
INSERT INTO employee (first_name, last_name, rold_id, manager_id)
VALUES (Miguel, Cabrera, 7, 8);
INSERT INTO employee (first_name, last_name, rold_id, manager_id)
VALUES (Ken, Griffey, 8, null);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

// Dependencies
const inquirer = require("inquirer")
const mysql = require("mysql")
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Dec261983*',
    database: 'employee_trackerdb'
});

connection.connect((err) => {
    if (err) throw err;
    firstQuestion();
  });

const firstQuestion = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What do you want to do?',
                choices: ['View All Employees',  
                'View Departments', 
                'View Roles',
                'Add Department', 
                'Add Role', 
                'Add Employee', 
                'Update Employee Role',
                'Exit' 
                ],
                name: 'userChoice',
            }
        ]).then((answer) => {
            switch (answer.userChoice) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;

                case 'View Departments':
                    viewByDepartment();
                    break;

                case 'View Roles':
                    viewByRole();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;

                case 'Add Role':
                addRole();
                break;

                case 'Add Employee':
                addEmployee();
                break;

                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;

                case 'Exit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break
            }
        }
)};


const viewAllEmployees = () => {
    const query = `SELECT *
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
     `;
     connection.query(query, function (err, res) {
        console.table(res);
        firstQuestion();
      });
    };


const viewByDepartment = () => {
    const query = `SELECT *
    FROM department;`
    connection.query(query, function (err, res) {
        console.table(res);
        firstQuestion();
    });
};

const viewByRole = () => {
    const query = `SELECT *
    FROM role;`
    connection.query(query, function (err, res) {
        console.table(res);
        firstQuestion();
    });
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'What is the name of the department?',
            }
        ]).then(function (res) {
            const newDepartment = res.newDepartment
            const query = `INSERT INTO department (name) VALUES ("${newDepartment}")`;
            connection.query(query, function (err, res) {
              if (err) {
                throw err;
              }
              console.table('Department added!');
              firstQuestion();
            });
        });
    }

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the title of the role?',
                name: 'newRole'
            },
            {
                type: 'input',
                message: 'What is the salary of this role?',
                name: 'newSalary'
            },
            {
                type: 'list',
                message: 'What department is this role in? Sales = 1, Engineering = 2, Finance = 3, Legal = 4 ',
                name: 'department',
                choices: [{name: "Sales", value: 1},{name: "Engineering", value: 2},{name: "Finance", value: 3},{name: "Legal", value: 4}]
            },
    ]).then(function (res) {
      const newRole = res.newRole;
      const newSalary = res.newSalary;
      const department = res.department;
      const query = `INSERT INTO role (title, salary, department_id) VALUES ("${newRole}", "${newSalary}", "${department}")`;
      connection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table('New role added!');
        firstQuestion();
      });
    });
    
};
     

const addEmployee = () => {
    connection.query(`SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee`, (err, managers) => {
        if (err) {
            throw err;
          }
        console.log(managers)
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the first name of the employee?',
                name: 'newFirstName'
            },
            {
                type: 'input',
                message: 'What is the last name of the employee?',
                name: 'newLastName'
            },
            {
                type: 'list',
                message: 'What is the role of the employee? Sales Lead = 1, Salesperson = 2, Engineer = 3, Lead Engineer = 4, Accountant = 5, Finance Director = 6, Staff Attorney = 7, Corporate Lawyer = 8',
                name: 'employeeRole',
                choices: [{name: "Sales Lead", value: 1},{name: "Salesperson", value: 2},{name: "Engineer", value: 3},{name: "Lead Engineer", value: 4},{name: "Accountant", value: 5},{name: "Finance Director", value: 6},{name: "Staff Attorney", value: 7},{name: "Corporate Lawyer", value: 8}]
            },
            {
                type: 'list',
                message: 'Who is the manager of this employee?',
                name: 'newManager',
                choices: managers
            }
    ]).then(function (res) {
        const firstName = res.newFirstName;
        const lastName = res.newLastName;
        const employRole = res.employeeRole 
        const newManager = res.newManager
        // Add switch statement;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${employRole}, ${newManager})`;
        connection.query(query, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          firstQuestion();
        });
      });
    });
};
 
  const updateEmployeeRole = () => {
    connection.query(`SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee`, (err, employee) => {
        if (err) {
            throw err;
          }
        console.log(employee)
          connection.query(`SELECT title AS name, id AS value FROM role`, (err, role) => {
            if (err) {
                throw err;
              }
            console.log(role)
    inquirer
        .prompt([
            {
                type: "list",
                message: "What employee ID do you want to update?",
                name: "updateEmployID",
                choices: employee
            },
            {   
                type: "list",
                message: "Enter the new role ID for that employee",
                name: "newRole",
                choices: role
            }
            ]).then(function (res) {
                const updateEmploy = res.updateEmployID;
                const newRole = res.newRole;
                const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;
                connection.query(queryUpdate, function (err, res) {
                if (err) {
                    throw err;
                }
                console.table('Employee Updated!');
                firstQuestion();
                })
            });
        });
    });
}

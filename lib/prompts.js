const inquirer = require("inquirer");

const DB_Questions = () =>
    inquirer.prompt([{
            type: 'list',
            name: 'primary',
            message: "What would you like to do? ",
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
        },
        /* ADD
        /* DEPARTMENT */
        {
            type: 'input',
            name: 'departmentName',
            message: 'Provide a name for the new Department: (Required)',
            when: ({ primary }) => {

                if (primary === 'Add Department') {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log('Please enter the Department name!');
                    return false;
                }
            }
        },
        /* ADD
        /* ROLE */
        {
            type: 'input',
            name: 'roleName',
            message: 'Provide a title for the new Role: (Required)',
            when: ({ primary }) => {

                if (primary === 'Add Role') {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log('Please enter the Role title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter a Salary for the new Role: (Required)',
            when: ({ primary }) => {

                if (primary === 'Add Role') {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (!isNaN(parseInt(userInput))) {
                    return true;
                } else {
                    console.log(' Please enter a valid Salary for the Role!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleDepartment',
            message: 'To which Department will this Role be attached?: (Required)',
            when: ({ primary }) => {

                if (primary === 'Add Role') {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log('Please enter a Department for the Role!');
                    return false;
                }
            }
        },
        /* ADD
        /* Employee */
        {
            type: 'input',
            name: 'employeeFirstName',
            message: "Enter the Employee's First Name: (Required)",
            when: ({ primary }) => {

                if (primary === 'Add Employee') {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log('Enter the Employee name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeLasttName',
            message: "Enter the Employee's Last Name: (Required)",
            when: ({ primary }) => {

                if (primary === 'Add Employee') {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log("Please enter the Employee's Last name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: "Enter the Employee's Role: (Required)",
            when: ({ primary }) => {

                if (primary === 'Add Employee') {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log('Please enter the Employee Role!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: "Please enter the Employee's Manager's ID:",
            when: ({ primary }) => {

                if (primary === 'Add Employee') {
                    return true;
                } else {
                    return false;
                }
            }

        },
        /* UPDATE
        /* EMPLOYEE */
        {
            type: 'input',
            name: 'employeeRole',
            message: "Enter the Employee's new Role: (Required)",
            when: ({ primary }) => {

                if (primary === 'Update Employee') {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log('Please enter the Employee Role!');
                    return false;
                }
            }
        }
    ]);

module.exports = DB_Questions;
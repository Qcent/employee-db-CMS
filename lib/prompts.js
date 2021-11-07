const inquirer = require("inquirer");

const DB_Questions = (employeeList, roleList, departmentList) => {

    return inquirer.prompt([{
            type: 'list',
            name: 'primary',
            message: "What would you like to do? ",
            choices: ['View all Departments', 'View all Roles', 'View all Employees',
                'Add Department', 'Add Role', 'Add Employee',
                'Update Department', 'Update Role', 'Update Employee',
                'Delete Department', 'Delete Role', 'Delete Employee',
                'Exit'
            ]
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
                if (!isNaN(parseInt(userInput))) {
                    return true;
                } else {
                    console.log('Please enter a valid Department ID for the Role!');
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
            name: 'employeeLastName',
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
                if (!isNaN(parseInt(userInput))) {
                    return true;
                } else {
                    console.log('Please enter a Valid Employee Role ID!');
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
            },
            validate: userInput => {
                if (!isNaN(parseInt(userInput)) || userInput == '') {
                    return true;
                } else {
                    console.log('Please enter a Valid Manager ID!');
                    return false;
                }
            }

        },
        /* UPDATE
        /* EMPLOYEE */
        {
            type: 'list',
            name: 'employeeID',
            message: "Which Employee?",
            choices: employeeList,
            when: ({ primary }) => {

                if (primary === 'Update Employee') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'updateFields',
            message: "Select the info to update",
            choices: ['First Name', 'Last Name', 'Role', 'Manager'],
            when: ({ primary }) => {

                if (primary === 'Update Employee') {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput.length > 0) {
                    return true;
                } else {
                    console.log('Please select at least one field!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'firstName',
            message: "Enter the Employee's new First Name: (Required)",
            when: ({ primary, updateFields }) => {
                if (primary === 'Update Employee' && updateFields.includes('First Name')) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log('Please enter a First Name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "Enter the Employee's new Last Name: (Required)",
            when: ({ primary, updateFields }) => {
                if (primary === 'Update Employee' && updateFields.includes('Last Name')) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log('Please enter a Last Name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleID',
            message: "Enter the Employee's new Role: (Required)",
            when: ({ primary, updateFields }) => {
                if (primary === 'Update Employee' && updateFields.includes('Role')) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (!isNaN(parseInt(userInput))) {
                    return true;
                } else {
                    console.log('Please enter a Valid Employee Role ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerID',
            message: "Enter the Employee's new Manager ID: (Required)",
            when: ({ primary, updateFields }) => {
                if (primary === 'Update Employee' && updateFields.includes('Manager')) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (!isNaN(parseInt(userInput)) || userInput == '') {
                    return true;
                } else {
                    console.log('Please enter a Valid Manager ID!');
                    return false;
                }
            }
        },
        /* ROLE */
        {
            type: 'list',
            name: 'roleID',
            message: "Which Role?",
            choices: roleList,
            when: ({ primary }) => {
                if (primary === 'Update Role') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'updateFields',
            message: "Select the info to update",
            choices: ['Title', 'Salary', 'Department'],
            when: ({ primary }) => {
                if (primary === 'Update Role') {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput.length > 0) {
                    return true;
                } else {
                    console.log('Please select at least one field!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleTitle',
            message: "Enter the Role's new Title: (Required)",
            when: ({ primary, updateFields }) => {
                if (primary === 'Update Role' && updateFields.includes('Title')) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log('Please enter a Role Title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: "Enter the new Salary: (Required)",
            when: ({ primary, updateFields }) => {
                if (primary === 'Update Role' && updateFields.includes('Salary')) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (!isNaN(parseInt(userInput))) {
                    return true;
                } else {
                    console.log('Please enter a Valid Salary!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleDepartment',
            message: "Enter the new Department: (Required)",
            when: ({ primary, updateFields }) => {
                if (primary === 'Update Role' && updateFields.includes('Department')) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (!isNaN(parseInt(userInput))) {
                    return true;
                } else {
                    console.log('Please enter a Valid Department ID!');
                    return false;
                }
            }
        },
        /* DEPARTMENT */
        {
            type: 'list',
            name: 'departmentID',
            message: "Which Department?",
            choices: departmentList,
            when: ({ primary }) => {
                if (primary === 'Update Department') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'departmentName',
            message: "Enter the Department's new Name: (Required)",
            when: ({ primary }) => {
                if (primary === 'Update Department') {
                    return true;
                } else {
                    return false;
                }
            },
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log('Please enter a Department Name!');
                    return false;
                }
            }
        },
        /* DELETE */
        /* DEPARTMENT */
        {
            type: 'list',
            name: 'departmentID',
            message: "Which Department?",
            choices: departmentList,
            when: ({ primary }) => {
                if (primary === 'Delete Department') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        /* ROLE */
        {
            type: 'list',
            name: 'roleID',
            message: "Which Role?",
            choices: roleList,
            when: ({ primary }) => {
                if (primary === 'Delete Role') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        /* EMPLOYEE */
        {
            type: 'list',
            name: 'employeeID',
            message: "Which Employee?",
            choices: employeeList,
            when: ({ primary }) => {
                if (primary === 'Delete Employee') {
                    return true;
                } else {
                    return false;
                }
            }
        },

    ]);
}

module.exports = DB_Questions;
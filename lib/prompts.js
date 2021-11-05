const inquirer = require("inquirer");

class DB_Questions {

    primaryQuestion() {
        return inquirer.prompt([{
            type: 'list',
            name: 'primary',
            message: "What would you like to do? ",
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
        }])
    };

}

module.exports = DB_Questions;
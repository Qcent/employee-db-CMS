const cTable = require('console.table');
const box = require('ascii-box').box;

module.exports = {
    // VIEW QUERIES
    viewDepartments: (db) => {
        return new Promise((res, rej) => {
            db.query('SELECT * FROM department', (err, rows) => {
                if (err) { rej(err.message); }
                res(console.table("Showing all Departments", rows));
            });
        });
    },

    viewRoles: (db) => {
        return new Promise((res, rej) => {
            const sql = `SELECT role.id, role.title, CONCAT('$', FORMAT(role.salary,0)) AS salary, department.name AS department
            FROM role 
            LEFT JOIN department 
            ON role.department_id = department.id
            ORDER BY role.department_id`;

            db.query(sql, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.table("Showing all Roles", rows));
            });
        });
    },

    viewEmployees: (db) => {
        return new Promise((res, rej) => {
            const sql = `
            SELECT  e.id, 
            e.first_name, 
            e.last_name, 
            role.title AS job_title, 
            department.name AS department,
            CONCAT('$', FORMAT(role.salary,0)) AS salary,
            IF( e.manager_id , CONCAT_WS(" ", manager.first_name, manager.last_name), e.manager_id ) AS manager
           
            FROM employee e

            LEFT JOIN role 
                ON e.role_id = role.id
            LEFT JOIN department 
                ON role.department_id  = department.id  
            LEFT JOIN employee manager
                ON e.manager_id = manager.id
                OR e.manager_id = null
  
            ORDER BY e.id
            `;

            db.query(sql, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.table("Showing all Employees", rows));
            });
        });
    },

    viewEmployeesByManager: (db, managerID) => {
        return new Promise((res, rej) => {
            let sql = `
            SELECT e.id, e.first_name, e.last_name, role.title AS job_title, department.name AS department,  CONCAT('$', FORMAT(role.salary,0)) AS salary, 
            IF( e.manager_id , CONCAT_WS(" ", manager.first_name, manager.last_name), e.manager_id ) AS manager

            FROM employee e

            JOIN role ON e.role_id = role.id
            JOIN department ON role.department_id  = department.id 
            LEFT JOIN employee manager ON e.manager_id = manager.id OR e.manager_id = null
            `;

            if (!managerID) sql += `WHERE e.manager_id IS NULL`;
            else sql += `WHERE e.manager_id = ${managerID}`;

            db.query(sql, (err, rows) => {
                if (err) {
                    rej(err.message);
                }

                if (rows[0].manager)
                    res(console.table("Employees Managed by " + rows[0].manager, rows));
                else res(console.table("Employees Managed by (Null)", rows));
            });
        });
    },

    viewEmployeesByDepartment: (db, departmentID) => {
        return new Promise((res, rej) => {
            const sql = `
            SELECT e.id, e.first_name, e.last_name, role.title AS job_title, department.name AS department,  CONCAT('$', FORMAT(role.salary,0)) AS salary, 
            IF( e.manager_id , CONCAT_WS(" ", manager.first_name, manager.last_name), e.manager_id ) AS manager
            FROM employee e
            JOIN role ON e.role_id = role.id
            JOIN department ON role.department_id  = department.id 
            LEFT JOIN employee manager ON e.manager_id = manager.id OR e.manager_id = null
            WHERE role.department_id = ${departmentID}
            
            UNION ALL
            SELECT ' ' id, ' ' first_name, ' ' last_name,  ' ' job_title, 'Total Budget:' department, CONCAT('$', FORMAT(SUM(role.salary),0)), ' ' manager
            FROM employee e
            JOIN role ON e.role_id = role.id
            WHERE role.department_id = ${departmentID}
            `;

            db.query(sql, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.table("Employees in " + rows[0].department || '' + " Department", rows));
            });
        });
    },

    // ADD QUERIES
    addDepartment: (db, departmentName) => {
        return new Promise((res, rej) => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            db.query(sql, departmentName, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.log(`\n\tNew Department: ${departmentName} - CREATED\n`));
            });
        });
    },

    addRole: (db, data) => {
        return new Promise((res, rej) => {
            const params = [data.roleName, data.roleSalary, data.roleDepartment];
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            db.query(sql, params, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.log(`\n\tNew Role: ${data.roleName} - CREATED\n`));
            });
        });
    },

    addEmployee: (db, data) => {
        return new Promise((res, rej) => {
            const params = [data.employeeFirstName, data.employeeLastName, data.employeeRole, data.employeeManager || null];
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            db.query(sql, params, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.log(`New Employee: ${data.employeeFirstName} ${data.employeeLastName} - CREATED\n`));
            });
        });
    },

    // UPDATE QUERIES
    updateEmployee: (db, data) => {
        let count = 0;
        let sql = `UPDATE employee SET `;
        const params = [];

        if (data.firstName) {
            sql += `first_name = ?`;
            params.push(data.firstName);
            count++;
        }
        if (data.lastName) {
            if (count > 0) sql += ', ';
            sql += `last_name = ?`;
            params.push(data.lastName);
            count++;
        }
        if (data.roleID) {
            if (count > 0) sql += ', ';
            sql += `role_id = ?`;
            params.push(data.roleID);
            count++;
        }
        if (typeof data.managerID !== 'undefined') {
            if (count > 0) sql += ', ';
            sql += `manager_id = ?`;
            params.push(data.managerID || null);
        }

        params.push(data.employeeID)
        sql += ` WHERE id = ?`;

        return new Promise((res, rej) => {

            db.query(sql, params, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.log(`Employee: ${data.employeeID} - UPDATED`));
            });
        });
    },

    updateRole: (db, data) => {
        let count = 0;
        let sql = `UPDATE role SET `;
        const params = [];

        if (data.roleTitle) {
            sql += `title = ?`;
            params.push(data.roleTitle);
            count++;
        }
        if (data.roleSalary) {
            if (count > 0) sql += ', ';
            sql += `salary = ?`;
            params.push(data.roleSalary);
            count++;
        }
        if (data.roleDepartment) {
            if (count > 0) sql += ', ';
            sql += `department_id = ?`;
            params.push(data.roleDepartment);
        }

        params.push(data.roleID)
        sql += ` WHERE id = ?`;

        return new Promise((res, rej) => {

            db.query(sql, params, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.log(`Role: ${data.roleID} - UPDATED`));
            });
        });
    },

    updateDepartment: (db, data) => {
        let sql = `UPDATE department SET name = ? WHERE id = ?`;
        const params = [data.departmentName, data.departmentID];

        return new Promise((res, rej) => {

            db.query(sql, params, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.log(`Department: ${data.departmentID} - UPDATED`));
            });
        });
    },

    // DELETE QUERY
    deleteRow: (db, data) => {
        //get table name
        const table = data.primary.split('Delete ')[1].toLowerCase();
        // set id variable name to be referenced in data object
        const id = table + "ID";
        const sql = `DELETE FROM ${table} WHERE id = ${data[id]}`;

        return new Promise((res, rej) => {
            db.query(sql, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.log(`TABLE ${table} : ROW ${data[id]} - DELETED`));
            });
        });
    },

    /* LIST METHODS */

    getListOfEmployees: (db) => {
        return new Promise((res, rej) => {
            const sql = `
            SELECT  e.id, CONCAT_WS(" ", e.first_name, e.last_name) AS full_name , role.title AS job
            FROM employee e
            LEFT JOIN role 
                ON e.role_id = role.id
            ORDER BY e.id
            `;

            db.query(sql, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(rows);
            });
        });

    },

    getListOfRoles: (db) => {
        return new Promise((res, rej) => {
            const sql = `
            SELECT role.id, role.title, department.name AS department
            FROM role
            LEFT JOIN department 
            ON role.department_id = department.id
            ORDER BY role.id
            `;

            db.query(sql, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(rows);
            });
        });

    },

    getListOfDepartments: (db) => {
        return new Promise((res, rej) => {
            const sql = `
            SELECT department.id, department.name
            FROM department
            ORDER BY department.id
            `;

            db.query(sql, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(rows);
            });
        });

    },

}
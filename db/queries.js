let employeeList = [];

module.exports = {

    logThis: (str) => {
        console.log(str);
        return;
    },

    // VIEW QUERIES
    viewDepartments: (db) => {
        return new Promise((res, rej) => {
            db.query('SELECT * FROM department', (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.log(rows));
            });
        });
    },

    viewRoles: (db) => {
        return new Promise((res, rej) => {
            const sql = `SELECT role.id, role.title, role.salary, department.name 
            AS department
            FROM role 
            LEFT JOIN department 
            ON role.department_id = department.id`;

            db.query(sql, (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.log(rows));
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
            role.salary, 
            IF( e.manager_id , CONCAT_WS(" ", manager.first_name, manager.last_name), e.manager_id ) AS manager
           
            FROM employee e

            JOIN role 
                ON e.role_id = role.id
            JOIN department 
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
                res(console.log(rows));
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
                res(console.log(rows));
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
                res(console.log(rows));
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
                res(console.log(rows));
            });
        });
    },

    // UPDATE QUERIES
    updateEmployee: (db, data) => {
        let count = 0;
        let sql = `UPDATE employee SET ` //role_id = ? WHERE id = ?`;
        const params = [];

        if (data.firstName) {
            sql += `first_name = ?`;
            params.push(data.firstName);
            count++;
        }
        if (data.lasttName) {
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
                res(console.log(rows));
            });
        });
    },

    updateRole: (db, data) => {
        let count = 0;
        let sql = `UPDATE role SET ` //role_id = ? WHERE id = ?`;
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
                res(console.log(rows));
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
                res(console.log(rows));
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
                res(console.log(rows));
            });
        });
    },

    /* SPECIAL METHODS */

    getListOfEmployees: (db) => {
        return new Promise((res, rej) => {
            const sql = `
            SELECT  CONCAT_WS(" ", e.first_name, e.last_name) AS full_name
            FROM employee e
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
            SELECT role.title, department.name AS department
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
            SELECT department.name
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
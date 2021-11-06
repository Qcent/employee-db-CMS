module.exports = {

    logThis: (str) => {
        console.log(str);
        return;
    },

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
                console.log('NEW DATA BELOW');
                res(console.log(rows));
            });
        });
    },
}
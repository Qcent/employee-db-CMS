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
            db.query('SELECT * FROM role', (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.log(rows));
            });
        });
    },

    viewEmployees: (db) => {
        return new Promise((res, rej) => {
            db.query('SELECT * FROM employee', (err, rows) => {
                if (err) {
                    rej(err.message);
                }
                res(console.log(rows));
            });
        });
    },
}
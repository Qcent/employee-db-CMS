const mysql = require('mysql2');

const db = mysql.createConnection({
    // The Network Path to Your MySQL Server
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'MySQLpassword',
    // Dont Change This
    database: 'employeeManagement'
});

module.exports = db;
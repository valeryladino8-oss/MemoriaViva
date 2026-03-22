const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'memoriaviva'
});


// Esto es lo que permite que el server.js lo use
module.exports = db;
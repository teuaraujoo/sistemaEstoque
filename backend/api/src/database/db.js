const mysql = require('mysql2/promise');

exports.db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456AA',
    database: 'sistemaestoque',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

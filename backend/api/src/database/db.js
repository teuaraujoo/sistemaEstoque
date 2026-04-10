const mysql = require('mysql2/promise');

// exports.db = mysql.createPool({
//     host: 'mysql.railway.internal',
//     port: 3306,
//     user: 'root',
//     password: 'fNEwvEfyrHjVWwcFghcxthanEyoFaUeP',
//     database: 'railway',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

const pool = mysql.createPool(process.env.DATABASE_URL);
module.exports = pool;
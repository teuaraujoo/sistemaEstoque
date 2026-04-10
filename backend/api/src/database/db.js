require('dotenv').config();
const mysql = require('mysql2/promise');

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não está definida.');
};

const pool = mysql.createPool(process.env.DATABASE_URL);
module.exports = pool;
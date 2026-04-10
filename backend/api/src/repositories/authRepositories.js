const { db } = require('../database/db');

// exports.create = (data) => {
//     const q = 'INSERT INTO USUARIOS(NOME, EMAIL, SENHA_HASH) VALUES (?, ?, ?)';
//     const user = db.query(q, data);
//     return user;
// };

exports.findByEmail = async (email) => {
    const q = 'SELECT * FROM USUARIOS WHERE EMAIL = ? LIMIT 1';
    const [user] = await db.query(q, [email]);
    return user[0];
};

exports.getUsers = async () => {
    const q = 'SELECT * FROM USUARIOS';
    const [user] = await db.query(q, [email]);
    return user[0];
};
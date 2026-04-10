const db = require('../database/db');

exports.getAll = async () => {

    const q = 'SELECT * FROM MOVE_ESTOQUE';
    const [move] = await db.query(q);
    return move;
};

exports.findMoveById = async (conn, id) => {

    const execute = conn || db;
    const q = 'SELECT * FROM MOVE_ESTOQUE WHERE ID = ?';
    const [move] = await execute.query(q, [id]);
    return move;
};

exports.findMoveEstoqueByVendaId = async (conn, id) => {

    const execute = conn || db;
    const q = 'SELECT * FROM MOVE_ESTOQUE WHERE VENDA_ID =  ?';
    const [move] = await execute.query(q, [id]);
    return move;
};

exports.findMoveEstoqueByProdutoId = async (id) => {

    const q =  'SELECT * FROM MOVE_ESTOQUE WHERE PRODUTO_ID = ?';
    const [move] = await db.query(q, [id]);
    return move;
};

exports.createMoveEstoque = async (conn, data) => {
    
    const q = 'INSERT INTO MOVE_ESTOQUE (PRODUTO_ID, NOME_PRODUTO, TIPO, MOTIVO, QTD, VENDA_ID) VALUES (?, ?, ?, ?, ?, ?)';
    const [moveCreate] = await conn.query(q, data);
    return moveCreate.insertId;
};

exports.deleteMoveEstoque = async (conn, id) => {

    const q = 'DELETE FROM MOVE_ESTOQUE WHERE ID = ?';
    const moveDel = await conn.query(q, [id]);
    return moveDel;
};

exports.deleteMoveEstoqueProduto = async (conn, id) => {
    
    const q = 'DELETE FROM MOVE_ESTOQUE WHERE PRODUTO_ID = ?';
    const moveDel = await conn.query(q, [id]);
    return moveDel;
};

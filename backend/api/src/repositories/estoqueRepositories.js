const { db } = require('../database/db');

exports.getAll = async () => {

    const q = 'SELECT * FROM MOVE_ESTOQUE';
    const [move] = await db.query(q);
    return move;
};

exports.findMoveById = async (id) => {

    const q = 'SELECT * FROM MOVE_ESTOQUE WHERE ID = ?';
    const [move] = await db.query(q, [id]);
    return move;
};

exports.findMoveEstoqueByVendaId = async (id) => {

    const q = 'SELECT * FROM MOVE_ESTOQUE WHERE VENDA_ID =  ?';
    const [move] = await db.query(q, [id]);
    return move;
};

exports.findMoveEstoqueByProdutoId = async (id) => {

    const q =  'SELECT * FROM MOVE_ESTOQUE WHERE PRODUTO_ID = ?';
    const [move] = await db.query(q, [id]);
    return move;
};

exports.createMoveEstoque = async (data) => {
    
    const q = 'INSERT INTO MOVE_ESTOQUE (PRODUTO_ID, TIPO, MOTIVO, QTD, VENDA_ID) VALUES (?)';
    const [moveCreate] = await db.query(q, [data]);
    return moveCreate.insertId;
};

exports.deleteMoveEstoque = async (id) => {

    const q = 'DELETE FROM MOVE_ESTOQUE WHERE ID = ?';
    const moveDel = await db.query(q, [id]);
    return moveDel;
};

exports.deleteMoveEstoqueProduto = async (id) => {
    
    const q = 'DELETE FROM MOVE_ESTOQUE WHERE PRODUTO_ID = ?';
    const moveDel = await db.query(q, [id]);
    return moveDel;
};
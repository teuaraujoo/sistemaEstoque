const { db } = require('../database/db');

exports.findAllProdutos = async () => {

    const q = 'SELECT * FROM PRODUTOS';
    const [produtos] = await db.query(q);
    return produtos;
};

exports.getTotalProdutos = async () => {
    const q = 'SELECT COUNT(*) AS TOTAL FROM PRODUTOS';
    const [produtos] = await db.query(q);
    return produtos;
};

exports.findAllProdutosLowEstoque = async () => {
    const q = 'SELECT * FROM PRODUTOS WHERE QTD_ESTOQUE <= 5';
    const [produtos] = await db.query(q);
    return produtos;
};

exports.findProductById = async (conn, productId) => {

    const execute = conn || db;
    const q = 'SELECT * FROM PRODUTOS WHERE ID = ?';
    const [produto] = await execute.query(q, [productId]);
    return produto;
};

exports.newProduto = async (conn, productData) => {

    const q = 'INSERT INTO PRODUTOS (NOME, DESCRICAO, PRECO_COMPRA, PRECO_VENDA, QTD_ESTOQUE) VALUES (?, ?, ?, ?, ?)';
    const [produtoCriado] = await conn.query(q, productData);
    return produtoCriado.insertId;
};

exports.attProduto = async (productData, productId) => {

    const q = 'UPDATE PRODUTOS SET NOME = ?, DESCRICAO = ?, PRECO_COMPRA = ?, PRECO_VENDA = ?, QTD_ESTOQUE = ? WHERE ID = ?';
    const produtoAtt = await db.query(q, [...productData, productId]);
    return produtoAtt;
};

exports.updateQtdProduto = async (conn, qtd, id) => {
    const q = 'UPDATE PRODUTOS SET QTD_ESTOQUE = ? WHERE ID = ?';
    const produtoAtt = await conn.query(q, [qtd, id]);
    return produtoAtt;
};

exports.activateProduto = async (status, id) => {
    const q = ' UPDATE PRODUTOS SET STATUS = ? WHERE ID = ?';
    const activeProduto = await db.query(q, [status, id]);
    return activeProduto;
};

exports.inactiveStatus = async (productId) => {

    const q = `UPDATE PRODUTOS SET STATUS = 'INATIVO' WHERE ID = ?`;
    const produtoDel = await db.query(q, [productId]);
    return produtoDel;
};

const { db } = require('../database/db');

exports.findAllProdutos = async () => {

    const q = 'SELECT * FROM PRODUTOS';
    const [produtos] = await db.query(q);
    return produtos;
};

exports.findProductById = async (productId) => {

    const q = 'SELECT FROM PRODUTOS WHERE ID = ?';
    const [produto] = await db.query(q, [productId]);
    return produto;
};

exports.newProduto = async (productData) => {

    const q = 'INSERT INTO PRODUTOS (NOME, DESCRICAO, PRECO_COMPRA, PRECO_VENDA, QTD_ESTOQUE) VALUES (?)';
    const produtoCriado = await db.query(q, [productData]);
    return produtoCriado;
};

exports.attProduto = async (productData, productId) => {

    const q = 'UPDATE PRODUTOS SET NOME = ?, DESCRICAO = ?, PRECO_COMPRA = ?, PRECO_VENDA = ?, QTD_ESTOQUE = ? WHERE ID = ?';
    const produtoAtt = await db.query(q, [...productData, productId]);
    return produtoAtt;
};

exports.delProduto = async (productId) => {

    const q = 'DELETE FROM PRODUTOS WHERE ID = ? ';
    const produtoDel = await db.query(q, [productId]);
    return produtoDel;
};
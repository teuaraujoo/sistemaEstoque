const { db } = require('../database/db');

exports.findAllVendas = async () => {
    const q = 'SELECT * FROM VENDAS';
    const [vendas] = await db.query(q);
    return vendas;
};

exports.findVendasMes = async (diasAtras, today) => {
    const q = `SELECT * FROM VENDAS WHERE DATA_VENDA BETWEEN ? AND ? `;
    const [vendas] = await db.query(q, [diasAtras, today]);
    return vendas;
};

exports.findReceitaMes = async (diasAtras, today) => {
    const q = 'SELECT SUM(VALOR_TOTAL) AS receitaTotal FROM VENDAS WHERE DATA_VENDA BETWEEN ? AND ?';
    const [receita] = await db.query(q, [diasAtras, today]);
    return receita;
};

exports.findVendaById = async (conn, id) => {

    const execute = conn || db;
    const q = 'SELECT * FROM VENDAS WHERE ID = ?';
    const [vendas] = await execute.query(q, [id]);
    return vendas;
};

exports.finAllVendaItens = async () => {

    const q = 'SELECT * FROM VENDA_ITENS';
    const [vendaItens] = await db.query(q);
    return vendaItens;
}

exports.findAllVendasItensByProdutoId = async (conn, id) => {

    const execute = conn || db;
    const q = 'SELECT * FROM VENDA_ITENS WHERE PRODUTO_ID = ?';
    const [vendas] = await execute.query(q, [id]);
    return vendas;
}

exports.findAllVendasItensByVendaId = async (conn, id) => {

    const execute = conn || db;
    const q = 'SELECT * FROM VENDA_ITENS WHERE VENDA_ID = ?';
    const [vendas] = await execute.query(q, [id]);
    return vendas;
}

exports.newVenda = async (conn, vendaData) => {
    const q = 'INSERT INTO VENDAS (VALOR_TOTAL) VALUES (?)';
    const [vendaCriada] = await conn.query(q, vendaData);
    return vendaCriada.insertId;
};

exports.insertVendaItem = async (conn, data) => {
    const q = `
        INSERT INTO VENDA_ITENS 
        (VENDA_ID, PRODUTO_ID, NOME_PRODUTO, QUANT, PRECO_UNITARIO, VALOR_TOTAL)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const venda = await conn.query(q, data);
    return venda;
};

exports.attVenda = async (conn, vendaData, vendaId) => {

    const q = 'UPDATE VENDAS SET VALOR_TOTAL = ? WHERE ID = ?';
    const vendaAtt = await conn.query(q, [vendaData, vendaId]);
    return vendaAtt;
};

exports.delVenda = async (conn, vendaId) => {

    const q = 'DELETE FROM VENDAS WHERE ID = ?';
    const vendaDel = await conn.query(q, [vendaId]);
    return vendaDel;
};

exports.delItensVendaByProdutoId = async (conn, produtoId) => {

    const q = 'DELETE FROM VENDA_ITENS WHERE PRODUTO_ID = ?';
    const vendaDel = await conn.query(q, [produtoId]);
    return vendaDel;
};

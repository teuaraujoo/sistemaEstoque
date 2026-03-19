const { db } = require('../database/db');

exports.findAllVendas = async () => {
    const q = 'SELECT * FROM VENDAS';
    const [vendas] = await db.query(q);
    return vendas;
};

exports.newVenda = async (vendaData) => {
    const q = 'INSERT INTO VENDAS (VALOR_TOTAL) VALUES (?)';
    const [vendaCriada] = await db.query(q, vendaData);
    return vendaCriada.insertId;
};

exports.insertVendaItem = async (data) => {
    const q = `
        INSERT INTO VENDA_ITENS 
        (VENDA_ID, PRODUTO_ID, QUANT, PRECO_UNITARIO, VALOR_TOTAL)
        VALUES (?, ?, ?, ?, ?)
    `;

    const venda = await db.query(q, data);
    return venda;
};

exports.attVenda = async (vendaData, vendaId) => {

    const q = 'UPDATE VENDAS SET VALOR_TOTAL = ? WHERE ID = ?';
    const vendaAtt = await db.query(q, [vendaData, vendaId]);
    return vendaAtt;
};

exports.delVenda = async (vendaId) => {
    const q = 'DELETE FROM VENDAS WHERE ID = ?';
    const vendaDel = await db.query(q, [vendaId]);
    return vendaDel;
};


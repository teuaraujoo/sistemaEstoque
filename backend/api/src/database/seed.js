const { db } = require('./db');

async function seed() {
    try {

        // PRODUTOS
        const [p1] = await db.query(`
            INSERT INTO PRODUTOS 
            (NOME, DESCRICAO, PRECO_COMPRA, PRECO_VENDA, QTD_ESTOQUE, STATUS)
            VALUES ('Camisa', 'Camisa básica', 20, 50, 10, 'ATIVO')
        `);

        const [p2] = await db.query(`
            INSERT INTO PRODUTOS 
            (NOME, DESCRICAO, PRECO_COMPRA, PRECO_VENDA, QTD_ESTOQUE, STATUS)
            VALUES ('Tênis', 'Tênis esportivo', 100, 200, 5, 'ATIVO')
        `);

        const produto1Id = p1.insertId;
        const produto2Id = p2.insertId;

        // MOVIMENTAÇÕES
        await db.query(`
            INSERT INTO MOVE_ESTOQUE 
            (PRODUTO_ID, TIPO, MOTIVO, QTD, VENDA_ID)
            VALUES (?, 'ENTRADA', 'COMPRA FORNECEDOR', ?, null)
        `, [produto1Id, 10]);

        await db.query(`
            INSERT INTO MOVE_ESTOQUE 
            (PRODUTO_ID, TIPO, MOTIVO, QTD, VENDA_ID)
            VALUES (?, 'ENTRADA', 'COMPRA FORNECEDOR', ?, null)
        `, [produto2Id, 5]);

        // VENDA
        const [venda] = await db.query(`
            INSERT INTO VENDAS (VALOR_TOTAL)
            VALUES (0)
        `);

        const vendaId = venda.insertId;

        // ITENS DA VENDA
        await db.query(`
            INSERT INTO VENDA_ITENS 
            (VENDA_ID, PRODUTO_ID, QUANT, PRECO_UNITARIO, VALOR_TOTAL)
            VALUES (?, ?, ?, ?, ?)
        `, [vendaId, produto1Id, 2, 50, 100]);

        await db.query(`
            INSERT INTO VENDA_ITENS 
            (VENDA_ID, PRODUTO_ID, QUANT, PRECO_UNITARIO, VALOR_TOTAL)
            VALUES (?, ?, ?, ?, ?)
        `, [vendaId, produto2Id, 1, 200, 200]);

        // ATUALIZA TOTAL
        await db.query(`
            UPDATE VENDAS 
            SET VALOR_TOTAL = 300 
            WHERE ID = ?
        `, [vendaId]);

        // MOVIMENTAÇÕES
        await db.query(`
            INSERT INTO MOVE_ESTOQUE 
            (PRODUTO_ID, TIPO, MOTIVO, QTD, VENDA_ID)
            VALUES (?, 'SAIDA', 'VENDA', ?, ?)
        `, [produto1Id, 2, vendaId]);

        await db.query(`
            INSERT INTO MOVE_ESTOQUE 
            (PRODUTO_ID, TIPO, MOTIVO, QTD, VENDA_ID)
            VALUES (?, 'SAIDA', 'VENDA', ?, ?)
        `, [produto2Id, 1, vendaId]);


        await db.query(`UPDATE PRODUTOS SET QTD_ESTOQUE = 8 WHERE ID = ?`, [produto1Id]);
        await db.query(`UPDATE PRODUTOS SET QTD_ESTOQUE = 4 WHERE ID = ?`, [produto2Id]);
        
        console.log('Seed executado com sucesso!');

    } catch (err) {
        console.error('Erro no seed:', err);
    } finally {
        process.exit();
    };
};

seed();
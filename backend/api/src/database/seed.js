const { db } = require('./db');

async function seed() {
    try {
        // =========================
        // PRODUTOS
        // =========================
        const produtos = [
            ['Camisa', 'Camisa básica algodão', 20, 50, 10],
            ['Tênis', 'Tênis esportivo corrida', 100, 200, 5],
            ['Boné', 'Boné streetwear', 15, 40, 20],
            ['Calça Jeans', 'Calça jeans slim', 60, 150, 8],
            ['Jaqueta', 'Jaqueta corta vento', 120, 250, 6],
        ];

        const produtosInseridos = [];

        for (const p of produtos) {
            const [result] = await db.query(`
                INSERT INTO PRODUTOS 
                (NOME, DESCRICAO, PRECO_COMPRA, PRECO_VENDA, QTD_ESTOQUE, STATUS)
                VALUES (?, ?, ?, ?, ?, 'ATIVO')
            `, p);

            produtosInseridos.push({
                id: result.insertId,
                nome: p[0],
                precoVenda: p[3]
            });
        }

        // =========================
        // MOVIMENTAÇÕES INICIAIS
        // =========================
        for (const produto of produtosInseridos) {
            await db.query(`
                INSERT INTO MOVE_ESTOQUE 
                (PRODUTO_ID, NOME_PRODUTO, TIPO, MOTIVO, QTD, VENDA_ID)
                VALUES (?, ?, 'ENTRADA', 'COMPRA FORNECEDOR', ?, null)
            `, [produto.id, produto.nome, 10]);
        }

        // =========================
        // VENDA 1
        // =========================
        const [venda1] = await db.query(`
            INSERT INTO VENDAS (VALOR_TOTAL)
            VALUES (0)
        `);

        const venda1Id = venda1.insertId;

        await db.query(`
            INSERT INTO VENDA_ITENS 
            (VENDA_ID, PRODUTO_ID, NOME_PRODUTO, QUANT, PRECO_UNITARIO, VALOR_TOTAL)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [venda1Id, produtosInseridos[0].id, produtosInseridos[0].nome, 2, 50, 100]);

        await db.query(`
            INSERT INTO VENDA_ITENS 
            (VENDA_ID, PRODUTO_ID, NOME_PRODUTO, QUANT, PRECO_UNITARIO, VALOR_TOTAL)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [venda1Id, produtosInseridos[1].id, produtosInseridos[1].nome, 1, 200, 200]);

        await db.query(`
            UPDATE VENDAS SET VALOR_TOTAL = 300 WHERE ID = ?
        `, [venda1Id]);

        // movimentações venda 1
        await db.query(`
            INSERT INTO MOVE_ESTOQUE 
            (PRODUTO_ID, NOME_PRODUTO, TIPO, MOTIVO, QTD, VENDA_ID)
            VALUES (?, ?, 'SAIDA', 'VENDA', ?, ?)
        `, [produtosInseridos[0].id, produtosInseridos[0].nome, 2, venda1Id]);

        await db.query(`
            INSERT INTO MOVE_ESTOQUE 
            (PRODUTO_ID, NOME_PRODUTO, TIPO, MOTIVO, QTD, VENDA_ID)
            VALUES (?, ?, 'SAIDA', 'VENDA', ?, ?)
        `, [produtosInseridos[1].id, produtosInseridos[1].nome, 1, venda1Id]);

        // =========================
        // VENDA 2
        // =========================
        const [venda2] = await db.query(`
            INSERT INTO VENDAS (VALOR_TOTAL)
            VALUES (0)
        `);

        const venda2Id = venda2.insertId;

        await db.query(`
            INSERT INTO VENDA_ITENS 
            (VENDA_ID, PRODUTO_ID, NOME_PRODUTO, QUANT, PRECO_UNITARIO, VALOR_TOTAL)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [venda2Id, produtosInseridos[2].id, produtosInseridos[2].nome, 3, 40, 120]);

        await db.query(`
            INSERT INTO VENDA_ITENS 
            (VENDA_ID, PRODUTO_ID, NOME_PRODUTO, QUANT, PRECO_UNITARIO, VALOR_TOTAL)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [venda2Id, produtosInseridos[3].id, produtosInseridos[3].nome, 2, 150, 300]);

        await db.query(`
            UPDATE VENDAS SET VALOR_TOTAL = 420 WHERE ID = ?
        `, [venda2Id]);

        // movimentações venda 2
        await db.query(`
            INSERT INTO MOVE_ESTOQUE 
            (PRODUTO_ID, NOME_PRODUTO, TIPO, MOTIVO, QTD, VENDA_ID)
            VALUES (?, ?, 'SAIDA', 'VENDA', ?, ?)
        `, [produtosInseridos[2].id, produtosInseridos[2].nome, 3, venda2Id]);

        await db.query(`
            INSERT INTO MOVE_ESTOQUE 
            (PRODUTO_ID, NOME_PRODUTO, TIPO, MOTIVO, QTD, VENDA_ID)
            VALUES (?, ?, 'SAIDA', 'VENDA', ?, ?)
        `, [produtosInseridos[3].id, produtosInseridos[3].nome, 2, venda2Id]);

        // =========================
        // MOVIMENTAÇÕES EXTRAS
        // =========================
        await db.query(`
            INSERT INTO MOVE_ESTOQUE 
            (PRODUTO_ID, NOME_PRODUTO, TIPO, MOTIVO, QTD, VENDA_ID)
            VALUES (?, ?, 'SAIDA', 'AVARIA', ?, null)
        `, [produtosInseridos[4].id, produtosInseridos[4].nome, 1]);

        await db.query(`
            INSERT INTO MOVE_ESTOQUE 
            (PRODUTO_ID, NOME_PRODUTO, TIPO, MOTIVO, QTD, VENDA_ID)
            VALUES (?, ?, 'ENTRADA', 'DEVOLUCAO CLIENTE', ?, null)
        `, [produtosInseridos[0].id, produtosInseridos[0].nome, 1]);

        console.log('Seed completo executado com sucesso!');

    } catch (err) {
        console.error('Erro no seed:', err);
    } finally {
        process.exit();
    }
}

seed();
const estoqueRepositories = require('../repositories/estoqueRepositories');
const produtosRepositories = require('../repositories/produtosRepositories');
const validaQuant = require('../utils/validaQuant');
const { db } = require('../database/db');

exports.getAllMoveEstoque = async (data) => {

    const moves = await estoqueRepositories.getAll(data);
    return moves;
}

exports.getMoveEstoqueById = async (id) => {

    const move = await estoqueRepositories.findMoveByID(id);
    return move;
};

exports.createMoveEstoque = async (data) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        let newQtd;
        const [produto] = await produtosRepositories.findProductById(connection, data.PRODUTO_ID);
        const qtdEstoqueProduto = produto.QTD_ESTOQUE;

        if (produto.STATUS === 'INATIVO') {
            throw new Error(`${produto.NOME} está inativo!`);
        };

        if (!validaQuant(data.QTD)) {
            throw new Error('Quantidade da movimentação inválida');
        };

        if (data.TIPO === 'SAIDA' && qtdEstoqueProduto > data.QTD) {
            newQtd = qtdEstoqueProduto - data.QTD;
        } else {
            newQtd = qtdEstoqueProduto + data.QTD;
        };

        const body = [
            data.PRODUTO_ID,
            data.TIPO,
            data.MOTIVO,
            data.QTD,
            data.VENDA_ID ?? null
        ];

        // atualizando qtd estoque produto
        await produtosRepositories.updateQtdProduto(connection, newQtd, data.PRODUTO_ID);

        const moveId = await estoqueRepositories.createMoveEstoque(connection, body);
        const moveCreate = await estoqueRepositories.findMoveById(connection, moveId);

        await connection.commit();
        return moveCreate[0];

    } catch (err) {

        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    };
};

exports.deleteMoveEstoque = async (id) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const [move] = await estoqueRepositories.findMoveById(connection, id);
        const [produto] = await produtosRepositories.findProductById(connection, move.PRODUTO_ID);
        let qtdEstoque;

        if (move.MOTIVO === 'VENDA DE MERCADORIA') {
            throw new TypeError('Permissão negada para deletar uma movimentação de uma venda');
        };

        if (move.TIPO === "ENTRADA") {
            qtdEstoque = produto.QTD_ESTOQUE - move.QTD;
            await produtosRepositories.updateQtdProduto(connection, qtdEstoque, move.PRODUTO_ID);
        } else {
            qtdEstoque = produto.QTD_ESTOQUE + move.QTD;
            await produtosRepositories.updateQtdProduto(connection, qtdEstoque, move.PRODUTO_ID);
        }

        const moveDel = await estoqueRepositories.deleteMoveEstoque(connection, id);

        connection.commit();
        return moveDel;

    } catch (err) {

        connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

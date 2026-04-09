const estoqueRepositories = require('../repositories/estoqueRepositories');
const produtosRepositories = require('../repositories/produtosRepositories');
const validarMove = require('../validators/validarMove');
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

        validarMove(produto, data);

        if (data.TIPO === 'SAIDA') {
            if (qtdEstoqueProduto < data.QTD) {
                throw new Error('Produto com estoque insuficiente!');
            } else {
                newQtd = qtdEstoqueProduto - data.QTD;
            }
        } else {
            newQtd = qtdEstoqueProduto + data.QTD;
        };

        const body = [
            data.PRODUTO_ID,
            produto.NOME,
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

const estoqueRepositories = require('../repositories/estoqueRepositories');
const produtosRepositories = require('../repositories/produtosRepositories');
const validaQuant = require('../utils/validaQuant');

exports.getAllMoveEstoque = async (data) => {

    const moves = await estoqueRepositories.getAll(data);
    return moves;
}

exports.getMoveEstoqueById = async (id) => {

    const move = await estoqueRepositories.findMoveByID(id);
    return move;
};

exports.createMoveEstoque = async (data) => {

    let newQtd;
    const [produto] = await produtosRepositories.findProductById(data.PRODUTO_ID);
    const qtdEstoqueProduto = produto.QTD_ESTOQUE;

    // verificação de quantidade
    if (!validaQuant(data.QTD)) {
        throw new Error('Quantidade da movimentação inválida');
    };

    // verificação de tipo e quantidade
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

    await produtosRepositories.updateQtdProduto(newQtd, data.PRODUTO_ID);
    const moveId = await estoqueRepositories.createMoveEstoque(body);
    const moveCreate = await estoqueRepositories.findMoveById(moveId);
    return moveCreate[0];
}

exports.deleteMoveEstoque = async (id) => {

    const [move] = await estoqueRepositories.findMoveById(id);
    const [produto] = await produtosRepositories.findProductById(move.PRODUTO_ID);
    let qtdEstoque;

    if (move.MOTIVO === 'VENDA DE MERCADORIA') {
        throw new TypeError('Permissão negada para deletar uma movimentação de uma venda');
    };
    
    if (move.TIPO === "ENTRADA") {
        qtdEstoque = produto.QTD_ESTOQUE - move.QTD;
        await produtosRepositories.updateQtdProduto(qtdEstoque, move.PRODUTO_ID);
    } else {
        qtdEstoque = produto.QTD_ESTOQUE + move.QTD;
        await produtosRepositories.updateQtdProduto(qtdEstoque, move.PRODUTO_ID);
    }

    const moveDel = await estoqueRepositories.deleteMoveEstoque(id);
    return moveDel;
};
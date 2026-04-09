const validaQuant = require('../utils/validaQuant');

function validarMove(produto, data, qtdProduto) {

    let newQtd;

    if (produto.STATUS === 'INATIVO') {
        throw new Error(`${produto.NOME} está inativo!`);
    };

    if (!validaQuant(data.QTD)) {
        throw new Error('Quantidade da movimentação inválida');
    };

    if (data.TIPO === 'SAIDA') {
        if (qtdProduto < data.QTD) {
            throw new Error('Produto com estoque insuficiente!');
        } else {
            newQtd = qtdProduto - data.QTD;
        }
    } else {
        newQtd = qtdProduto + data.QTD;
    };

    return newQtd;
};

module.exports = validarMove;
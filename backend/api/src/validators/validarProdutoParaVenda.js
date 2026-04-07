const validaQuant = require('../utils/validaQuant');

function validarProdutoParaVenda(produto, item) {

    if (!validaQuant(item.QUANT)) {
        throw new RangeError('Quantidade inválida!');
    };

    if (!produto) {
        throw new Error('Produto não encontrado!');
    };

    if (produto.STATUS === 'INATIVO') {
        throw new Error(`${produto.NOME} está inativo!`);
    };

    // valida estoque do produto
    if (produto.QTD_ESTOQUE < item.QUANT) {
        throw new RangeError(`${produto.NOME} com estoque insuficiente!`);
    };
};

module.exports = validarProdutoParaVenda;
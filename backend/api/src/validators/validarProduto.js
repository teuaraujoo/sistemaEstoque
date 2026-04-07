function validarProduto(produto) {

    if (produto.QTD_ESTOQUE < 0) {
        throw new RangeError('Valor do estoque inválido');
    };

    if (Number(produto.PRECO_COMPRA) > Number(produto.PRECO_VENDA)) {
        throw new RangeError('Valor de venda inválido');
    };
};

module.exports = validarProduto;
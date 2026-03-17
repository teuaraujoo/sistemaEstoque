const produtosRepositories = require('../repositories/produtosRepositories');
const produtoValidators = require('../validators/produtosValidators');

exports.getAllProdutos = async () => {

    const produtos = await produtosRepositories.findAllProdutos();
    return produtos;
};

exports.getProdutoById = async (productId) => {

    const produto = await produtosRepositories.findProductById(productId);
    return produto;
};

exports.createProduto = async (productData) => {

    if (!produtoValidators.validaQtdEstoque(productData.QTD_ESTOQUE)) {
        throw new RangeError('Valor do estoque inválido');
    };

    if (!produtoValidators.validaPrecos(productData.PRECO_VENDA, productData.PRECO_COMPRA)) {
        throw new RangeError('Valor de venda inválido')
    }

    const data = [
        productData.NOME,
        productData.DESCRICAO,
        productData.PRECO_COMPRA,
        productData.PRECO_VENDA,
        productData.QTD_ESTOQUE,
    ];

    const produtoCriado = await produtosRepositories.newProduto(data);
    return produtoCriado;
};

exports.updateProduto = async (productData, productId) => {

    if (!produtoValidators.validaNome(productData.NOME)) {
        throw new Error('Nome inválido!');
    }

    if (!produtoValidators.validaPrecos(productData.PRECO_VENDA, productData.PRECO_COMPRA)) {
        throw new RangeError('Valor de venda inválido')
    }

    if (!produtoValidators.validaQtdEstoque(productData.QTD_ESTOQUE)) {
        throw new RangeError('Valor do estoque inválido');
    };

    const data = [
        productData.NOME,
        productData.DESCRICAO,
        productData.PRECO_COMPRA,
        productData.PRECO_VENDA,
        productData.QTD_ESTOQUE,
    ];

    const produtoAtt = await produtosRepositories.attProduto(data, productId);
    return produtoAtt;
};

exports.deleteProduto = async (productId) => {

    const produtoDel = await produtosRepositories.delProduto(productId);
    return produtoDel;
};
const produtosRepositories = require('../repositories/produtosRepositories');
const estoqueRepositories = require('../repositories/estoqueRepositories');
const vendasRepositories = require('../repositories/vendasRepositories');
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
        throw new RangeError('Valor de venda inválido');
    }

    const data = [
        productData.NOME,
        productData.DESCRICAO,
        productData.PRECO_COMPRA,
        productData.PRECO_VENDA,
        productData.QTD_ESTOQUE,
    ];

    const TIPO = 'ENTRADA';
    const MOTIVO = 'NOVAS MERCADORIAS';

    // registro de uma nova movimentação do estoque
    const produtoId = await produtosRepositories.newProduto(data);
    const produto = await produtosRepositories.findProductById(produtoId);

    if (productData.QTD_ESTOQUE > 0) {
        
        const moveCreate = await estoqueRepositories.createMoveEstoque([
            produtoId,
            TIPO,
            MOTIVO,
            productData.QTD_ESTOQUE,
            null
        ]);
    }
    return produto[0];
};

exports.updateProduto = async (productData, productId) => {

    if (!produtoValidators.validaNome(productData.NOME)) {
        throw new Error('Nome inválido!');
    };

    if (!produtoValidators.validaPrecos(productData.PRECO_VENDA, productData.PRECO_COMPRA)) {
        throw new RangeError('Valor de venda inválido')
    };

    let [produto] = await produtosRepositories.findProductById(productId);
    const qtdEstoqueProduto = produto.QTD_ESTOQUE;

    const data = [
        productData.NOME,
        productData.DESCRICAO,
        productData.PRECO_COMPRA,
        productData.PRECO_VENDA,
        qtdEstoqueProduto
    ];

    const produtoAtt = await produtosRepositories.attProduto(data, productId);
    produto = await produtosRepositories.findProductById(productId);
    return produto[0];
};

exports.deleteProduto = async (productId) => {

    const vendaItens = await vendasRepositories.findAllVendasItensByProdutoId(productId);
    let newValor;
    
    if (vendaItens.length >= 1) {

        for (item of vendaItens) {
            
            const [venda] = await vendasRepositories.findVendaById(item.VENDA_ID);
            newValor = venda.VALOR_TOTAL - item.VALOR_TOTAL;
            
            await vendasRepositories.attVenda(newValor, item.VENDA_ID);
            await vendasRepositories.delVendaByProdutoId(item.PRODUTO_ID);
            await estoqueRepositories.deleteMoveEstoqueProduto(item.PRODUTO_ID);
        };
    } else {
        await estoqueRepositories.deleteMoveEstoqueProduto(productId);
    }

    const produtoDel = await produtosRepositories.delProduto(productId);
    return produtoDel;
};
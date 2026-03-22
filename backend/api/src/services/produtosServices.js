const produtosRepositories = require('../repositories/produtosRepositories');
const produtoValidators = require('../validators/produtosValidators');
const estoqueRepository = require('../repositories/estoqueRepositories');
const vendaRepository = require('../repositories/vendasRepositories');

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
    if (productData.QTD_ESTOQUE > 0) {
        
        const moveCreate = await estoqueRepository.createMoveEstoque([
            produtoId,
            TIPO,
            MOTIVO,
            productData.QTD_ESTOQUE,
            null
        ]);
        console.log(!moveCreate);
        if (!moveCreate) {
            await produtosRepositories.delProduto(produtoId);
        };
    }
    return produtoId;
};

exports.updateProduto = async (productData, productId) => {

    if (!produtoValidators.validaNome(productData.NOME)) {
        throw new Error('Nome inválido!');
    };

    if (!produtoValidators.validaPrecos(productData.PRECO_VENDA, productData.PRECO_COMPRA)) {
        throw new RangeError('Valor de venda inválido')
    };

    const [produto] = await produtosRepositories.findProductById(productId);
    const qtdEstoqueProduto = produto.QTD_ESTOQUE;

    const data = [
        productData.NOME,
        productData.DESCRICAO,
        productData.PRECO_COMPRA,
        productData.PRECO_VENDA,
        qtdEstoqueProduto
    ];

    const produtoAtt = await produtosRepositories.attProduto(data, productId);
    return produtoAtt;
};

exports.deleteProduto = async (productId) => {

    const vendaItens = await vendaRepository.findAllVendasItensByProdutoId(productId);
    let newValor;
    
    for (item of vendaItens) {
        
        const [venda] = await vendaRepository.findVendaById(item.VENDA_ID);
        newValor = venda.VALOR_TOTAL - item.VALOR_TOTAL;

        await vendaRepository.attVenda(newValor, item.VENDA_ID);
        await vendaRepository.delVendaByProdutoId(item.PRODUTO_ID);
        await estoqueRepository.deleteMoveEstoqueProduto(item.PRODUTO_ID);
    };

    const produtoDel = await produtosRepositories.delProduto(productId);
    return produtoDel;
};
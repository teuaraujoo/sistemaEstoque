const produtosRepositories = require('../repositories/produtosRepositories');
const estoqueRepositories = require('../repositories/estoqueRepositories');
const validarProduto = require('../validators/validarProduto');
const { db } = require('../database/db');

exports.getAllProdutos = async () => {

    const produtos = await produtosRepositories.findAllProdutos();
    return produtos;
};

exports.getTotalProdutos = async () => {
    const produtos = await produtosRepositories.getTotalProdutos();
    return produtos;
};

exports.getAllProdutosLowEstoque = async () => {
    const produtos = await produtosRepositories.findAllProdutosLowEstoque();
    return produtos;
}


exports.getProdutoById = async (productId) => {

    const produto = await produtosRepositories.findProductById(db, productId);
    return produto;
};

exports.createProduto = async (productData) => {

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        validarProduto(productData);

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
        const produtoId = await produtosRepositories.newProduto(connection, data);
        const produto = await produtosRepositories.findProductById(connection, produtoId);

        if (productData.QTD_ESTOQUE > 0) {

            await estoqueRepositories.createMoveEstoque(connection, [
                produtoId,
                produto.NOME,
                TIPO,
                MOTIVO,
                productData.QTD_ESTOQUE,
                null
            ]);

        };

        await connection.commit();
        return produto[0];
    } catch (err) {

        await connection.rollback();
        throw err;

    } finally {
        connection.release();
    }
};

exports.updateProduto = async (productData, productId) => {

    let [produto] = await produtosRepositories.findProductById(db, productId);
    const qtdEstoqueProduto = produto.QTD_ESTOQUE;

    validarProduto(productData);

    const data = [
        productData.NOME,
        productData.DESCRICAO,
        productData.PRECO_COMPRA,
        productData.PRECO_VENDA,
        qtdEstoqueProduto
    ];

    // atualização do produto
    await produtosRepositories.attProduto(data, productId);
    produto = await produtosRepositories.findProductById(db, productId);
    return produto[0];
};

exports.activateProduto = async (status, id) => {

    const activeProduto = await produtosRepositories.activateProduto(status, id);
    return activeProduto;
};

exports.inactiveStatus = async (productId) => {

    await produtosRepositories.inactiveStatus(productId);
    const produto = produtosRepositories.findProductById(db, productId);
    return produto;
};
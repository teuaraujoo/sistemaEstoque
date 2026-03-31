const vendasRepositories = require('../repositories/vendasRepositories');
const validaQuant = require('../utils/validaQuant');
const daysAgo = require('../utils/daysAgo');
const produtosRepositories = require('../repositories/produtosRepositories');
const estoqueRepositories = require('../repositories/estoqueRepositories');
const estoqueServices = require('../services/estoqueServices');
const { db } = require('../database/db');

exports.getAllVendas = async () => {
    const vendas = await vendasRepositories.findAllVendas();
    return vendas;
};

exports.getReceitaMes = async () => {
    const today = new Date();
    const diasAtras = daysAgo(today);
    
    const receita = await vendasRepositories.findReceitaMes(diasAtras, today);
    return receita;
};

exports.getVendasMes = async () => {
    const today = new Date();
    const diasAtras = daysAgo(today);
    const vendas = await vendasRepositories.findVendasMes(diasAtras, today);
    return vendas;
};

exports.getAllVendaItens = async () => {

    const vendaItens = await vendasRepositories.finAllVendaItens();
    return vendaItens;
};

exports.createVenda = async (vendaData) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const vendaId = await vendasRepositories.newVenda(connection, [0]);

        const { itens } = vendaData;

        let valorTotal = 0;

        for (let item of itens) {

            const [produto] = await produtosRepositories.findProductById(connection, item.PRODUTO_ID);
            let newQtdEstoque;

            if (!validaQuant(item.QUANT)) {
                throw new RangeError('Quantidade de venda inválida!');
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


            // calcula subtotal de 1 dos ITENS
            const subtotal = Number(produto.PRECO_VENDA) * item.QUANT;
            // soma do valor total da VENDA
            valorTotal += subtotal;

            // insere item em ITENS_VENDA
            await vendasRepositories.insertVendaItem(connection, [
                vendaId,
                item.PRODUTO_ID,
                item.QUANT,
                Number(produto.PRECO_VENDA),
                subtotal
            ]);

            newQtdEstoque = produto.QTD_ESTOQUE - item.QUANT;

            const TIPO = 'SAIDA';
            const MOTIVO = 'VENDA DE MERCADORIA';

            // cria movimentação
            await estoqueRepositories.createMoveEstoque(connection, [
                produto.ID,
                TIPO,
                MOTIVO,
                item.QUANT,
                vendaId
            ]);

            await produtosRepositories.updateQtdProduto(connection, newQtdEstoque, item.PRODUTO_ID);
        };

        // atualiza valor total da venda
        await vendasRepositories.attVenda(connection, valorTotal, vendaId);
        const venda = await vendasRepositories.findVendaById(connection, vendaId);

        await connection.commit();
        return venda[0];

    } catch (err) {

        await connection.rollback();
        throw err;

    } finally {
        connection.release();
    };
};

exports.deleteVenda = async (vendaId) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const moves = await estoqueRepositories.findMoveEstoqueByVendaId(connection, vendaId);
        let qtdEstoque;

        for (let move of moves) {
            const [produto] = await produtosRepositories.findProductById(connection, move.PRODUTO_ID);
            qtdEstoque = produto.QTD_ESTOQUE + move.QTD;

            // atualizando qtd estoque produto
            await produtosRepositories.updateQtdProduto(connection, qtdEstoque, move.PRODUTO_ID);
            // deletando movimentações do estoque
            await estoqueRepositories.deleteMoveEstoque(connection, move.ID);
        };
        const vendaDel = await vendasRepositories.delVenda(connection, vendaId);

        await connection.commit();
        return vendaDel;

    } catch (err) {

        await connection.rollback();
        throw err;

    } finally {
        connection.release();
    };
};

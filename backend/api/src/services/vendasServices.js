const vendasRepositories = require('../repositories/vendasRepositories');
const validaQuant = require('../utils/validaQuant');
const produtosRepositories = require('../repositories/produtosRepositories');
const estoqueRepositories = require('../repositories/estoqueRepositories');
const estoqueServices = require('../services/estoqueServices');

exports.getAllVendas = async () => {
    const vendas = await vendasRepositories.findAllVendas();
    return vendas;
};

exports.createVenda = async (vendaData) => {

    //TODO: aplicar transaction (beginTransaction, commit, rollback)

    // cria VENDA e guarda apenas o ID
    const vendaId = await vendasRepositories.newVenda([0]);

    // desestruturação do corpo da req
    const { itens } = vendaData;
    // valorTotal da VENDA
    let valorTotal = 0;

    // Percorre o corpo da req
    for (item of itens) {

        // Busca PRODUTO
        const [produto] = await produtosRepositories.findProductById(item.PRODUTO_ID);

        // valida qtd enviada
        if (!validaQuant(item.QUANT)) {
            const delVenda = await vendasRepositories.delVenda(vendaId);
            throw new RangeError('Quantidade de venda inválida!');
        };

        // valida PRODUTO
        if (!produto) {
            const delVenda = await vendasRepositories.delVenda(vendaId);
            throw new Error('Produto não encontrado!');
        };

        // valida estoque do produto
        if (produto.QTD_ESTOQUE < item.QUANT) {
            const delVenda = await vendasRepositories.delVenda(vendaId);
            throw new RangeError(`${produto.NOME} com estoque insuficiente!`);
        };

        // calcula subtotal de 1 dos ITENS
        const subtotal = Number(produto.PRECO_VENDA) * item.QUANT;
        // soma do valor total da VENDA
        valorTotal += subtotal;

        // insere item em ITENS_VENDA
        await vendasRepositories.insertVendaItem([
            vendaId,
            item.PRODUTO_ID,
            item.QUANT,
            Number(produto.PRECO_VENDA),
            subtotal
        ]);

        const TIPO = 'SAIDA';
        const MOTIVO = 'VENDA DE MERCADORIA';
        
        const data = {
            PRODUTO_ID: produto.ID,
            TIPO,
            MOTIVO,
            QTD: item.QUANT,
            VENDA_ID: vendaId
        }

        const move = await estoqueServices.createMoveEstoque(data);

        if (!move) {
            const delVenda = await vendasRepositories.delVenda(vendaId);
            throw new Error('Error ao criar movimentação no estoque');
        };
    };


    // atualiza VENDA com o valor total
    const vendaAtt = await vendasRepositories.attVenda(valorTotal, vendaId);
    const venda = await vendasRepositories.findVendaById(vendaId);
    return venda[0];
};

exports.deleteVenda = async (vendaId) => {

    const moves = await estoqueRepositories.findMoveEstoqueByVendaId(vendaId);
    let qtdEstoque;

    for (let move of moves) {
        const [produto] = await produtosRepositories.findProductById(move.PRODUTO_ID);
        qtdEstoque = produto.QTD_ESTOQUE + move.QTD;
        await produtosRepositories.updateQtdProduto(qtdEstoque, move.PRODUTO_ID);
        await estoqueRepositories.deleteMoveEstoque(move.ID);
    };
    const vendaDel = await vendasRepositories.delVenda(vendaId);
    return vendaDel;
};
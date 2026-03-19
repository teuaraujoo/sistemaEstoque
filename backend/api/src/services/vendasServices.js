const vendasRepositories = require('../repositories/vendasRepositories');
const validaQuant = require('../utils/validaQuant');
const produtoRepository = require('../repositories/produtosRepositories');

exports.getAllVendas = async() => {
    const vendas = await vendasRepositories.findAllVendas();
    return vendas;
};

exports.createVenda = async (vendaData) => {

    /*
        1. cria venda
        2. busca produto e valida
        3. faz calculos
        4. adiciona itens da venda
        5. atualiza venda
    */

    // cria VENDA e guarda apenas o ID
    const vendaId = await vendasRepositories.newVenda([0]);

    // desestruturação do corpo da req
    const { itens } = vendaData;
    // valorTotal da VENDA
    let valorTotal = 0;

    // Percorre o corpo da req
    for (item of itens) {

        // Busca PRODUTO
        const produto = await produtoRepository.findProductById(item.PRODUTO_ID);

        // valida PRODUTO
        if (!produto) {
            throw new Error('Produto não encontrado!');
        }

        // calcula subtotal de 1 dos ITENS
        const subtotal = produto[0].PRECO_VENDA * item.QUANT;
        // soma do valor total da VENDA
        valorTotal += subtotal;

        // insere item em ITENS_VENDA
        await vendasRepositories.insertVendaItem([
            vendaId,
            item.PRODUTO_ID,
            item.QUANT,
            produto[0].PRECO_VENDA,
            subtotal
        ]);
    };

    // atualiza VENDA com o valor total
    const vendaAtt = await vendasRepositories.attVenda(valorTotal, vendaId);
    return vendaAtt;
};  

exports.deleteVenda = async (vendaId) => {

    const vendaDel = await vendasRepositories.delVenda(vendaId);
    return vendaDel;
};
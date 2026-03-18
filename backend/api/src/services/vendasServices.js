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
        const subtotal = produto.PRECO_VENDA * item.QUANT;
        // soma do valor total da VENDA
        valorTotal += subtotal;

        // insere item em ITENS_VENDA
        await vendasRepositories.insertVendaItem([
            vendaId,
            item.PRODUTO_ID,
            item.QUANT,
            produto.PRECO_VENDA,
            subtotal
        ]);
    };

    // atualiza VENDA com o valor total
    const vendaAtt = await vendasRepositories.attVenda(valorTotal, vendaId);
    return vendaAtt;
};  

// exports.addItem = async (vendaId, data) => {
//     const produto = await produtoRepository.findProductById(data.PRODUTO_ID);

//     if (!produto) {
//         throw new Error('Produto não encontrado');
//     };
    
//     if (produto.QTD_ESTOQUE < quantidade) {
//         throw new RangeError('Estoque do produto insuficiente!');
//     };

//     const preco = produto.PRECO_VENDA;
//     const valorTotal = preco * quantidade;

//     await vendasRepositories.insertVendaItem([
//         vendaId,
//         data.PRODUTO_ID,
//         data.QUANT,
//         preco,
//         valorTotal
//     ]);

//     const newEstoque = produto.estoque - quantidade;
//     await produtoRepository.updateProduto(data.PRODUTO_ID, newEstoque);

//     const totalVenda = await vendasRepositories.sumVendaTotal(vendaId);

//     await vendasRepositories.updateVendaTotal(totalVenda, vendaId);

//     return {
//         message: 'Item adicionado com sucesso!'
//     };
// };

exports.updateVenda = async (vendaData, vendaId) => {

    if (!validaQuant(vendaData.VALOR_TOTAL)) {
        throw new Error('Preço inválido');
    }

    const vendaAtt = await vendasRepositories.attVenda([vendaData.VALOR_TOTAL], vendaId);
    return vendaAtt;
};

exports.deleteVenda = async (vendaId) => {

    const vendaDel = await vendasRepositories.delVenda(vendaId);
    return vendaDel;
};
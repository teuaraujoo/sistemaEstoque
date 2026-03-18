const vendasRepositories = require('../repositories/vendasRepositories');
const validaQuant = require('../utils/validaQuant');

exports.getAllVendas = async() => {
    const vendas = await vendasRepositories.findAllVendas();
    return vendas;
};

exports.createVenda = async (vendaData) => {

    if (!validaQuant(vendaData.VALOR_TOTAL)) {
        throw new Error('Preço inválido');
    }

    const data = [ vendaData.VALOR_TOTAL ];

    const vendaCriada = await vendasRepositories.newVenda(data);
    return vendaCriada;
};  

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
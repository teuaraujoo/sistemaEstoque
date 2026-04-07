const validaQuant = require('../utils/validaQuant');

function validarMove(produto, data) {

    if (produto.STATUS === 'INATIVO') {
        throw new Error(`${produto.NOME} está inativo!`);
    };

    if (!validaQuant(data.QTD)) {
        throw new Error('Quantidade da movimentação inválida');
    };
};

module.exports = validarMove;
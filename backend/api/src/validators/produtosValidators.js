exports.validaNome = (nomeEnviado) => {

    if (typeof nomeEnviado !== 'string') return false;
    if (nomeEnviado.length < 3 || nomeEnviado.length > 50) return false;

    return true;
};

exports.validaQtdEstoque = (estoqueEnviado) => {
    return estoqueEnviado >= 0
};

exports.validaPrecos = (precoVenda, precoCompra) => {
    return precoVenda > precoCompra
};
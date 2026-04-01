export function limparFormulario(form) {
    form.nome.value = '';
    form.descricao.value = '';
    form.preco_compra.value = '';
    form.preco_venda.value = '';
    form.quant.value = '';
};

export function formsPayload(form, onEdit) {

    if (!form.quant.value) form.quant.value = 0;
    if (!form.descricao.value) form.descricao.value = '';

    return {
        ...(onEdit && { id: onEdit.ID }),
        nome: form.nome.value,
        descricao: form.descricao.value,
        preco_compra: form.preco_compra.value,
        preco_venda: form.preco_venda.value,
        quant: form.quant.value,
    };
};


export function validarFormulario(form) {
    return (
        form.nome.value &&
        form.preco_compra.value &&
        form.preco_venda.value
    );
};

export function preencherFormulario(form, produto = {}) {
    if (!produto) return;

    form.nome.value = produto.NOME;
    form.descricao.value = produto.DESCRICAO ?? '';
    form.preco_compra.value = produto.PRECO_COMPRA;
    form.preco_venda.value = produto.PRECO_VENDA;
    form.quant.value = produto.QTD_ESTOQUE === 0 ? 0 : produto.QTD_ESTOQUE ?? '';
}
export function limparFormulario(form) {
    form.nome.value = '';
    form.descricao.value = '';
    form.preco_compra.value = '';
    form.preco_venda.value = '';
    form.quant.value = '';
};

export function formsPayload(form, onEdit) {

    const quant = form.quant.value === '' ? 0 : Number(form.quant.value);
    const descricao = form.descricao.value.trim();

    return {
        ...(onEdit && { id: onEdit.ID }),
        nome: form.nome.value,
        descricao,
        preco_compra: form.preco_compra.value,
        preco_venda: form.preco_venda.value,
        quant
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
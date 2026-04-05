export function formsPayload(form, tipo) {
    return {
        produto: form.produto.value,
        tipo: tipo,
        quant: form.quant.value,
        motivo: form.motivo.value
    };
};

export function limparFormulario(form) {
    form.produto.value = '';
    form.motivo.value = '';
    form.quant.value = '';
};

export function validarFormulario(form, tipo) {
    return (
        form.produto.value &&
        tipo &&
        form.motivo.value &&
        form.quant.value
    );
};
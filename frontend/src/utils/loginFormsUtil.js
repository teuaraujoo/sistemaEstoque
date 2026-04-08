export function formsPayload(form) {
    return {
        email: form.email.value,
        senha: form.senha.value
    };
};

export function validarFormulario(form) {
    return (
        form.email.value &&
        form.senha.value
    );
};

export function limparForms(form) {
    form.email.value = ''
    form.senha.value = ''
};
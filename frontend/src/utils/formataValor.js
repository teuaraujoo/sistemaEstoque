export function formataValor(valor) {
    return Number(valor).toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
    });
};
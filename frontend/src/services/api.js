const API_URL = import.meta.env.VITE_API_URL;

export const api = {
    url: API_URL,
    produtos: `${API_URL}/produtos`,
    vendas: `${API_URL}/vendas`,
    estoque: `${API_URL}/estoque`,
    venda_itens: `${API_URL}/vendas/itens`,
    usuario: `${API_URL}/usuario`
};
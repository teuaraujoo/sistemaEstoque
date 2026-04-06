import axios from 'axios';

const API_URL = 'http://localhost:8800/api/v1/vendas/itens';

export async function fetchVendasItensDashboard() {
    const response = await axios.get(API_URL);
    const data = response.data;

    if (!Array.isArray(data)) {
        return [];
    };

    const vendasRecentes = data.sort((a, b) => new Date(b.DATA_VENDA) - new Date(a.DATA_VENDA)).slice(0, 3);
    return vendasRecentes;
};

export async function fetchVendasItensInfoCard(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    const data = response.data;

    if (!Array.isArray(data)) {
        return [];
    };

    const vendas = data.map((venda) => {
        return {
            NOME: venda.NOME_PRODUTO,
            QUANT: venda.QUANT,
            PRECO_UNITARIO: venda.PRECO_UNITARIO,
            VALOR_TOTAL: venda.VALOR_TOTAL,
        };
    });

    return vendas;
};

export async function fetchVendasItens() {
    const response = await axios.get(API_URL);
    const data = await response.data;

    if (!Array.isArray(data)) {
        return [];
    };

    return data;
};
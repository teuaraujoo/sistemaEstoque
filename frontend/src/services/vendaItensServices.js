import axios from 'axios';
import { getToken } from './token/setToken';

const API_URL = 'http://localhost:8800/api/v1/vendas/itens';

export async function fetchVendasItensDashboard() {
    const token = getToken("token");

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.data;

    if (!Array.isArray(data)) {
        return [];
    };

    const vendasRecentes = data.sort((a, b) => new Date(b.DATA_VENDA) - new Date(a.DATA_VENDA)).slice(0, 3);
    return vendasRecentes;
};

export async function fetchVendasItensInfoCard(id) {
    const token = getToken("token");

    const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.data;

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
    const token = getToken("token");

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.data;

    if (!Array.isArray(data)) {
        return [];
    };

    return data;
};
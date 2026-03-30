import axios from 'axios';

const API_URL = 'http://localhost:8800/api/v1/produtos';

export async function fetchProdutosResumo() {
    const response = await axios.get(API_URL);
    const data = response.data;

    if (!Array.isArray(data)) {
        return {
            total: 0,
            baixoEstoque: 0,
        };
    }

    const total = data.length;
    const baixoEstoque = data.filter((produto) => Number(produto.QTD_ESTOQUE) < 10).length;

    return {
        total,
        baixoEstoque,
    };
};


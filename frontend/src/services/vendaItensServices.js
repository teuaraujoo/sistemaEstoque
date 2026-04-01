import axios from 'axios';

const API_URL = 'http://localhost:8800/api/v1/vendas/itens';
const produtos_API_URL = 'http://localhost:8800/api/v1/produtos';

async function getProdutoById(id) {
    try {
        const response = await axios.get(`${produtos_API_URL}/${id}`);
        const produtoData = response.data;
        return Array.isArray(produtoData) ? produtoData[0] ?? null : produtoData;
    } catch {
        return null;
    }
}

export async function fetchVendasItensDashboard() {
    const response = await axios.get(API_URL);
    const data = response.data;
    const produtosResponse = await axios.get(produtos_API_URL);
    const produtos = produtosResponse.data;

    if (!Array.isArray(data)) {
        return [];
    };

    const vendasRecentes = data.sort((a, b) => new Date(b.DATA_VENDA) - new Date(a.DATA_VENDA)).slice(0, 3);

    const vendasRecentesComProduto = vendasRecentes.map((venda) => {
        const produto = produtos.find((p) => p.ID === venda.PRODUTO_ID);
        return {
            ...venda,
            produto: produto ? { NOME: produto.NOME } : null,
        };
    });
    return {
        vendasRecentes: vendasRecentesComProduto,
    };
};

export async function fetchVendasItens() {
    const response = await axios.get(API_URL);
    const data = response.data;

    if (!Array.isArray(data)) {
        return [];
    }

    const produtosMap = {};
    await Promise.all(data.map(async (venda) => {
        const produtoId = venda.PRODUTO_ID;
        if (produtoId && !produtosMap[produtoId]) {
            produtosMap[produtoId] = await getProdutoById(produtoId);
        }
    }));

    const vendas = data.map((venda) => {
        const produto = produtosMap[venda.PRODUTO_ID];
        return {
            ...venda,
            NOME: produto ? produto.NOME : 'Produto Desconhecido',
            PRECO_VENDA: venda.VALOR_TOTAL,
            QUANT: venda.QUANT,
        };
    });

    return vendas;
};
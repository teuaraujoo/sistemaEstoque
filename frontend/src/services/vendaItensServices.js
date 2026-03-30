import axios from 'axios';

const API_URL = 'http://localhost:8800/api/v1/vendas/itens';

export async function fetchVendasItens() {
    const response = await axios.get(API_URL);
    const data = response.data;
    const produtosResponse = await axios.get('http://localhost:8800/api/v1/produtos');
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
    console.log('Vendas Recentes com Produto:', vendasRecentesComProduto);
    return {
        vendasRecentes: vendasRecentesComProduto,
    };
};


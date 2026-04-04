import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8800/api/v1/estoque';

export async function fetchMoves() {
    const response = await axios.get(API_URL);
    const data = response.data;
    const produtos = await axios.get('http://localhost:8800/api/v1/produtos');
    const produtosData = produtos.data;

    if (!Array.isArray(data)) {
        return {
            moves: []
        };
    }

    const movesRecentes = data.sort((a, b) => new Date(b.CREATED_AT) - new Date(a.CREATED_AT)).slice(0, 3);
    const movesRecentesComProduto = movesRecentes.map((move) => {
        const produto = produtosData.find((p) => p.ID === move.PRODUTO_ID);
        return {
            ...move,
            produto: produto ? { NOME: produto.NOME } : null
        };
    });

    return movesRecentesComProduto;
};

export async function getAllMoves() {
    try {
        const response = await axios.get(API_URL);
        const data = await response.data;
        return data;
    } catch (err) {
        toast.error(err.response.data);
    }
}
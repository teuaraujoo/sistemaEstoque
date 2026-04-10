import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from './token/setToken';

const API_URL = 'http://localhost:8800/api/v1/produtos';

export async function fetchProdutosResumo() {
    const token = getToken("token");

    try {
        const responseTotal = await axios.get(`${API_URL}/total`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const total = await responseTotal.data[0].TOTAL;

        const responseLowEstoque = await axios.get(`${API_URL}/estoqueMin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const dataLowEstoque = await responseLowEstoque.data.length;

        return {
            totalProdutos: total,
            baixoEstoque: dataLowEstoque,
        };
    } catch (err) {
        toast.error(err.response.data);
    };
};

export async function getAllProdutos() {
    const token = getToken("token");

    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.data;

        return data;
    } catch (err) {
        toast.error(err.response.data);
    }
};

export async function updateProduto(produto) {
    const token = getToken("token");
    
    const response = await axios.put(`${API_URL}/${produto.id}`, {
        NOME: produto.nome,
        DESCRICAO: produto.descricao,
        PRECO_COMPRA: produto.preco_compra,
        PRECO_VENDA: produto.preco_venda,
        QTD_ESTOQUE: produto.quant,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export async function createProduto(produto) {
    const token = getToken("token");

    const response = await axios.post(`${API_URL}`, {
        NOME: produto.nome,
        DESCRICAO: produto.descricao,
        PRECO_COMPRA: produto.preco_compra,
        PRECO_VENDA: produto.preco_venda,
        QTD_ESTOQUE: produto.quant,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};
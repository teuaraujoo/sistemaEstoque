import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from './api';

export async function fetchProdutosResumo() {

    try {
        const responseTotal = await fetch(`${api.produtos}/total`, {
            method: 'GET',
            credentials: 'include'
        });
        const total = await responseTotal.json();

        const responseLowEstoque = await fetch(`${api.produtos}/estoqueMin`, {
            method: 'GET',
            credentials: 'include'
        })
        const dataLowEstoque = await responseLowEstoque.json();

        return {
            totalProdutos: total[0].TOTAL,
            baixoEstoque: dataLowEstoque.length,
        };
    } catch (err) {
        toast.error(err.message);
    };
};

export async function getAllProdutos() {

    try {
        const response = await fetch(api.produtos, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();

        return data;
    } catch (err) {
        toast.error(err.message);
    }
};

export async function updateProduto(produto) {

    const response = await fetch(`${api.produtos}/${produto.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            NOME: produto.nome,
            DESCRICAO: produto.descricao,
            PRECO_COMPRA: produto.preco_compra,
            PRECO_VENDA: produto.preco_venda,
            QTD_ESTOQUE: produto.quant
        })
    });

    return response.json();
};

export async function createProduto(produto) {

    const response = await fetch(api.produtos, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            NOME: produto.nome,
            DESCRICAO: produto.descricao,
            PRECO_COMPRA: produto.preco_compra,
            PRECO_VENDA: produto.preco_venda,
            QTD_ESTOQUE: produto.quant
        })
    });

    return response.json();
};
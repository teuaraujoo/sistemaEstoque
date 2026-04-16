import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from './api';

export async function fetchVendasResumo() {

    try {
        const responseTotal = await fetch(`${api.vendas}/vendasMes`, {
            method: 'GET',
            credentials: 'include'
        });
        const dataTotal = await responseTotal.json();

        const responseReceita = await fetch(`${api.vendas}/receitaMes`, {
            method: 'GET',
            credentials: 'include'
        });
        const receitaTotal = await responseReceita.json();

        return {
            qtdVendasMes: dataTotal.length,
            receita: receitaTotal[0].receitaTotal
        };
    } catch (err) {
        toast.error(err.message);
    }
};

export async function fetchVendas() {

    const response = await fetch(api.vendas, {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();

    if (!Array.isArray(data)) {
        return [];
    };

    return data;
};

export async function createVenda(itens) {
    const response = await fetch(api.vendas, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itens })
    });
    const data = await response.json();

    return data;
};

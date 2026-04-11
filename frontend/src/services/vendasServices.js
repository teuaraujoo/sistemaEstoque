import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from './token/setToken';
import { api } from './api';

export async function fetchVendasResumo() {
    const token = getToken("token");

    try {
        const responseTotal = await axios.get(`${api.vendas}/vendasMes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const dataTotal = await responseTotal.data.length;

        const responseReceita = await axios.get(`${api.vendas}/receitaMes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const receitaTotal = await responseReceita.data[0].receitaTotal;

        return {
            qtdVendasMes: dataTotal,
            receita: receitaTotal
        };
    } catch (err) {
        toast.error(err.response.data);
    }
};

export async function fetchVendas() {
    const token = getToken("token");

    const response = await axios.get(api.vendas, {
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

export async function createVenda(itens) {
    const token = getToken("token");

    const response = await axios.post(api.vendas, { itens }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.data;

    return data;
};

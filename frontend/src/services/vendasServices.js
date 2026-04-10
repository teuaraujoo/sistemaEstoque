import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from './token/setToken';

const API_URL = 'http://localhost:8800/api/v1/vendas';

export async function fetchVendasResumo() {
    const token = getToken("token");

    try {
        const responseTotal = await axios.get(`${API_URL}/vendasMes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const dataTotal = await responseTotal.data.length;

        const responseReceita = await axios.get(`${API_URL}/receitaMes`, {
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

export async function createVenda(itens) {
    const token = getToken("token");

    const response = await axios.post(API_URL, { itens }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.data;

    return data;
};

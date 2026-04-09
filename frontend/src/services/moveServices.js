import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from './token/setToken';

const API_URL = 'http://localhost:8800/api/v1/estoque';
const token = getToken("token");

export async function fetchMoves() {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.data;

    if (!Array.isArray(data)) {
        return {
            moves: []
        };
    }

    const movesRecentes = data.sort((a, b) => new Date(b.CREATED_AT) - new Date(a.CREATED_AT)).slice(0, 3);
    return movesRecentes;
};

export async function getAllMoves() {
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
    };
};

export async function createMove(move, tipo) {

    const response = await axios.post(`${API_URL}`, {
        PRODUTO_ID: move.produto,
        TIPO: tipo,
        MOTIVO: move.motivo,
        QTD: Number(move.quant),
        VENDA_ID: null
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};
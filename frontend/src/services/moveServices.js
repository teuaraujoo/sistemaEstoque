import { toast } from 'react-toastify';
import { api } from './api';

export async function fetchMoves() {
    const response = await fetch(api.estoque, {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();

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
        const response = await fetch(api.estoque, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        toast.error(err.message);
    };
};

export async function createMove(move, tipo) {

    const response = await fetch(api.estoque, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            PRODUTO_ID: move.produto,
            TIPO: tipo,
            MOTIVO: move.motivo,
            QTD: Number(move.quant),
            VENDA_ID: null
        })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};
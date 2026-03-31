import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:8800/api/v1/produtos';

export async function fetchProdutosResumo() {
    try {
        const responseTotal = await axios.get(`${API_URL}/total`);
        const total = responseTotal.data[0].TOTAL;
        const responseLowEstoque = await axios.get(`${API_URL}/estoqueMin`);
        const lowEstoque = responseLowEstoque.data.length;

        return {
            totalProdutos: total,
            baixoEstoque: lowEstoque,
        };
    } catch (err) {
        toast.error(err.response.data);
    };

};

export async function getAllProdutos() {

    try {
        const response = await axios.get(API_URL);
        const data = await response.data;

        return data;
    } catch (err) {
        toast.error(err.response.data);
    }
};
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:8800/api/v1/vendas';

export async function fetchVendasResumo() {

    try {
        const responseTotal = await axios.get(`${API_URL}/vendasMes`);
        const dataTotal = await responseTotal.data.length;

        const responseReceita = await axios.get(`${API_URL}/receitaMes`);
        const receitaTotal = await responseReceita.data[0].receitaTotal;

        return {
            qtdVendasMes: dataTotal,
            receita: receitaTotal
        };
    } catch (err) {
        toast.error(err.response.data);
    }
};


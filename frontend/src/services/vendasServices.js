import axios from 'axios';

const API_URL = 'http://localhost:8800/api/v1/vendas';

export async function fetchVendasResumo() {
    const response = await axios.get(API_URL);
    const data = response.data;

    if (!Array.isArray(data)) {
        return {
            qtdVendasMes: 0,
            receita: 0,
        };
    }

    const qtdVendasMes = () => {
        const hoje = new Date();
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();

        return data.filter((venda) => {
            const dataVenda = new Date(venda.DATA_VENDA);
            return (
                dataVenda.getMonth() === mesAtual &&
                dataVenda.getFullYear() === anoAtual
            );
        }).length;

    }
    const receita = data.reduce((total, venda) => total + Number(venda.VALOR_TOTAL), 0);

    return {
        qtdVendasMes: qtdVendasMes(),
        receita,
    };
};


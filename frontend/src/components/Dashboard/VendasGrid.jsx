import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchVendasItensDashboard } from '../../services/vendaItensServices';
import { formataValor } from '../../utils/formataValor';
import { formataData } from '../../utils/formataData';



function SalesGrid() {

    const [vendasRecentes, setVendasRecentes] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const { vendasRecentes } = await fetchVendasItensDashboard();
                setVendasRecentes(vendasRecentes);
            } catch (error) {
                console.error('Erro ao buscar resumo de produtos:', error);
            }
        }
        fetchData();
    }, []);
    return (

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm bg-neutral-primary-soft shadow-xs rounded-base border border-default w-full">
            <div className="mb-4 flex items-baseline justify-between border-b border-gray-100">
                <h2 className="text-2xl font-bold text-slate-1000 mb-6">Vendas Recentes</h2>
                <NavLink to="/vendas/todas" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    Ver tudo
                </NavLink>
            </div>
            <table className="text-sm text-left rtl:text-right text-body w-full border-collapse">
                <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium text-gray-500">
                            Nome do produto
                        </th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-500 text-left">
                            Preço
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium text-gray-500">
                            Data
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {vendasRecentes.map((venda) => (
                        <tr key={venda.ID} className="bg-neutral-primary border-t border-gray-100 hover:bg-gray-200 h-20">
                            <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                {venda.produto ? venda.produto.NOME : 'Produto Desconhecido'}
                            </td>

                            <td className="px-6 py-4 text-left whitespace-nowrap font-medium">
                                {formataValor(venda.VALOR_TOTAL)}
                            </td>
                            <td className="px-6 py-4 font-medium ">
                                {formataData(venda.CREATED_AT)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesGrid;
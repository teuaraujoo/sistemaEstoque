import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchMoves } from '../../services/moveServices';
import { IoMdAddCircle, IoIosRemoveCircle } from "react-icons/io";



function MovesGrid() {

    const [movesRecentes, setmovesRecentes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const moves = await fetchMoves();
                setmovesRecentes(moves);
            } catch (error) {
                console.error('Erro ao buscar resumo de produtos:', error);
            }
        }
        fetchData();
    }, []);
    return (

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm bg-neutral-primary-soft shadow-xs rounded-base border border-default w-full">
            <div className="mb-4 flex items-baseline justify-between border-b border-gray-100">
                <h2 className="text-2xl font-bold text-slate-1000 mb-6">Movimentações Recentes</h2>
                <NavLink to="/movimentacoes" className="text-sm font-medium text-indigo-600  hover:text-indigo-800">
                    Ver tudo
                </NavLink>
            </div>
            <table className="text-sm text-left rtl:text-left text-body w-full border-collapse table-fixed">
                <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium text-gray-500">
                            Tipo
                        </th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-500 text-left">
                            Produto
                        </th>
                        <th scope="col" className="w-[20%] px-6 py-3 font-medium text-gray-500">
                            Quantidade
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {movesRecentes.length > 0 ? (
                        movesRecentes.map((move) => (
                            <tr key={move.ID} className="bg-neutral-primary border-t border-gray-100 h-20">
                                <th scope="row" className="px-3 py-4 font-medium text-heading whitespace-nowrap w-16">
                                    {move.TIPO === 'ENTRADA' ?
                                        <div className='bg-green-300 w-10 h-10 p-2 border-transparent rounded-lg flex justify-center items-center'>
                                            <IoMdAddCircle className='text-green-700 w-7 h-7' />
                                        </div>
                                        :
                                        <div className='bg-red-300 w-10 h-10 p-2 border-transparent rounded-lg flex justify-center items-center'>
                                            <IoIosRemoveCircle className='text-red-700 w-7 h-7' />
                                        </div>
                                    }
                                </th>

                                <td className="px-6 py-4 text-left whitespace-nowrap font-medium text-gray-600">
                                    {move.NOME_PRODUTO}
                                </td>
                                {
                                    move.TIPO === 'ENTRADA' ?
                                        <td className="px-6 py-4 text-left whitespace-nowrap  font-bold text-green-700">
                                            +{move.QTD}
                                        </td>
                                        :
                                        <td className="px-6 py-4 text-left whitespace-nowrap font-bold text-red-700">
                                            -{move.QTD}
                                        </td>
                                }
                            </tr>
                        ))
                    )
                        :
                        (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                                    Nenhuma venda recente encontrada.
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MovesGrid;
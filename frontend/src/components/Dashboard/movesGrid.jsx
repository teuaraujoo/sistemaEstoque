import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchMoves } from '../../services/moveServices';
import { IoMdAddCircle, IoIosRemoveCircle } from "react-icons/io";



function MovesGrid() {

    const [moveRecentes, setmoveRecentes] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const moves = await fetchMoves();
                setmoveRecentes(moves);
            } catch (error) {
                console.error('Erro ao buscar resumo de produtos:', error);
            }
        }
        fetchData();
    }, []);
    return (

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm bg-neutral-primary-soft shadow-xs rounded-base border border-default w-full">
            <div className="mb-4 flex items-baseline justify-between">
                <h2 className="text-2xl font-bold text-slate-1000 mb-6">Movimentações Recentes</h2>
                <NavLink to="/movimentacoes" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    Ver tudo
                </NavLink>
            </div>
            <table className="text-sm text-left rtl:text-left text-body w-full border-collapse">
                <tbody>
                    {moveRecentes.map((move) => (
                        <tr key={move.ID} className="bg-neutral-primary border-t border-gray-100 hover:bg-gray-200 h-20">
                            <th scope="row" className="px-3 py-4 font-medium text-heading whitespace-nowrap w-16">
                                {move.TIPO === 'ENTRADA' ?
                                    <div className='bg-green-300 w-full h-full p-2 border-transparent rounded-lg'>
                                        <IoMdAddCircle className='text-green-700 w-7 h-7' />
                                    </div>
                                    :
                                    <div className='bg-red-300 w-full h-full p-2 border-transparent rounded-lg'>
                                        <IoIosRemoveCircle className='text-red-700 w-7 h-7' />
                                    </div>
                                }
                            </th>

                            <td className="px-6 py-4 text-left whitespace-nowrap font-medium text-gray-600">
                                {move.produto.NOME}
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MovesGrid;
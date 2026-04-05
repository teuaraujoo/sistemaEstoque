import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { formataData } from '../../utils/formataData';
import { toast } from 'react-toastify';

function EstoqueGrid({ moves, refreshMoves }) {

    async function handleDelete(id) {
        try {
            const response = await axios.delete(`http://localhost:8800/api/v1/estoque/${id}`);
            toast.error(response.data.message);
            await refreshMoves();
        } catch (err) {
            toast.error(err.response.data);
        };
    };

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-200 bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                                Produto
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                                Tipo
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                                Motivo
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                                Quantidade
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                                Data
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500 text-center">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {moves.length > 0 ? (
                            moves.map((move) => (
                                <tr
                                    key={move.ID}
                                    className="border-b border-slate-100 transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-slate-800">
                                            {move.NOME_PRODUTO}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="font-medium text-slate-700">
                                            {move.TIPO}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="font-medium text-slate-700">
                                            {move.MOTIVO}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {move.TIPO === 'ENTRADA'
                                                ? (
                                                    <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600">
                                                        + {move.QTD}
                                                    </span>
                                                )
                                                : (
                                                    <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-rose-50 text-rose-600">
                                                        - {move.QTD}
                                                    </span>
                                                )
                                            }
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="font-medium text-slate-700">
                                            {formataData(move.CREATED_AT)}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition cursor-pointer hover:bg-red-50 hover:text-red-600"
                                                title="Editar produto"
                                                onClick={() => handleDelete(move.ID)}
                                            >
                                                <FaTrash className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                                    Nenhuma movimentação encontrada
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default EstoqueGrid;


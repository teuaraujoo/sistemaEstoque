import { FaTrash } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import { formataValor } from "../../utils/formataValor";
import { api } from "../../services/api";

function VendasGrid({ vendas = [], refreshVendas, onInformation }) {

    async function handleDelete(id) {
        try {
            const response = await fetch(`${api.vendas}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            toast.success(response.data.message);
            await refreshVendas();
        } catch (err) {
            toast.error(err.data.messsage);
        }
    };

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="max-h-[400px] overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                                Valor
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
                        {vendas.length > 0 ? (
                            vendas.map((venda) => (
                                <tr
                                    key={venda.ID}
                                    className="border-b border-slate-100 transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-slate-800">
                                            {formataValor(venda.VALOR_TOTAL)}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-slate-600 font-medium">
                                        {new Date(venda.DATA_VENDA).toLocaleDateString("pt-BR")}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => handleDelete(venda.ID)}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 cursor-pointer transition hover:bg-red-50 hover:text-red-600"
                                                title="Excluir venda"
                                            >
                                                <FaTrash className="h-4 w-4" />
                                            </button>

                                            <button
                                                onClick={() => onInformation(venda.ID)}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 cursor-pointer transition hover:bg-indigo-50 hover:text-indigo-600"
                                                title="Ver detalhes"
                                            >
                                                <IoInformationCircle className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )
                            :
                            (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                                        Nenhuma venda encontrada.
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default VendasGrid;
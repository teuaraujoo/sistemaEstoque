import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { GiShieldDisabled } from "react-icons/gi";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaPen } from 'react-icons/fa';
import { formataValor } from '../../utils/formataValor';
import { getToken } from '../../services/token/setToken';

function ProdutosGrid({ produtos = [], onEditProduct, refreshProdutos }) {
    const token = getToken("token")

    function getBarColor(qtd) {
        if (qtd <= 5) {
            return 'bg-red-500'
        } else if (qtd > 5 && qtd < 10) {
            return 'bg-yellow-400'
        } else {
            return 'bg-green-500'
        }
    }

    function getBarWidth(estoque) {
        const max = 500
        return `${Math.min((estoque / max) * 1000, 100)}%`
    }

    async function handleDelete(id) {

        try {
            const response = await axios.delete(`http://localhost:8800/api/v1/produtos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            await refreshProdutos();
        } catch (err) {
            toast.error(err.response.data);
        };
    };

    async function handleActive(id) {
        try {
            const response = await axios.patch(`http://localhost:8800/api/v1/produtos/${id}/status`, { STATUS: 'ATIVO' }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success(response.data.message);
            await refreshProdutos();
        } catch (err) {
            toast.error(err.response.data);
        };
    };

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="max-h-[350px] overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-200 bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                                Produto
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                                Preço
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                                Estoque
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                                Status
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500 text-center">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.length > 0 ? (
                            produtos.map((produto) => (
                                <tr
                                    key={produto.ID}
                                    className="border-b border-slate-100 transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-slate-800">
                                            {produto.NOME}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="font-medium text-slate-700">
                                            {formataValor(produto.PRECO_VENDA)}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200">
                                                <div
                                                    className={`h-full rounded-full ${getBarColor(produto.QTD_ESTOQUE)}`}
                                                    style={{ width: getBarWidth(produto.QTD_ESTOQUE) }}
                                                />
                                            </div>

                                            <span className="text-sm font-medium text-slate-600">
                                                {produto.QTD_ESTOQUE} un
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${produto.STATUS === "ATIVO"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-rose-50 text-rose-600"
                                                }`}
                                        >
                                            {produto.STATUS}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => onEditProduct && onEditProduct(produto)}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition cursor-pointer hover:bg-amber-50 hover:text-amber-600"
                                                title="Editar produto"
                                            >
                                                <FaPen className="h-4 w-4" />
                                            </button>

                                            {produto.STATUS === "INATIVO" ? (
                                                <button
                                                    onClick={() => handleActive(produto.ID)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 cursor-pointer  transition hover:bg-emerald-50 hover:text-emerald-600"
                                                    title="Ativar produto"
                                                >
                                                    <BsShieldFillCheck className="h-5 w-5" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleDelete(produto.ID)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 cursor-pointer  transition hover:bg-rose-50 hover:text-rose-600"
                                                    title="Inativar produto"
                                                >
                                                    <GiShieldDisabled className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                                    Nenhum produto encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProdutosGrid;
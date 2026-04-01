import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { GiShieldDisabled } from "react-icons/gi";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaPen } from 'react-icons/fa';

function ProdutosGrid({ produtos = [], onEditProduct, refreshProdutos }) {

    function getBarColor(qtd) {
        if (qtd < 5) {
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
            const response = await axios.delete(`http://localhost:8800/api/v1/produtos/${id}`);
            toast.success(response.data.message);
            await refreshProdutos();
        } catch (err) {
            toast.error(err.response.data);
        };
    };

    async function handleActive(id) {
        try {
            const response = await axios.patch(`http://localhost:8800/api/v1/produtos/${id}/status`, { STATUS: 'ATIVO' });
            
            toast.success(response.data.message);
            await refreshProdutos();
        } catch (err) {
            toast.error(err.response.data);
        };
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden p-2 max-w-full">
            {/* HEADER */}
            <div className="grid grid-cols-[6fr_2fr_3fr_3fr_1fr]  px-6 py-4 text-sm font-semibold text-slate-500 border-b border-gray-200">
                <span>Produto</span>
                <span>Preço</span>
                <span>Estoque</span>
                <span>Status</span>
                <span>Actions</span>
            </div>

            {produtos.map((produto) => (
                <div
                    key={produto.ID}
                    className="grid grid-cols-[6fr_2fr_3fr_3fr_1fr] items-center px-6 py-4 border-b border-gray-200 last:border-none hover:bg-slate-100 transition"
                >
                    <div>
                        <p className="font-medium text-slate-900">{produto.NOME}</p>
                    </div>

                    {/* PREÇO */}
                    <span className="text-slate-700 font-medium">
                        R$ {produto.PRECO_VENDA}
                    </span>

                    {/* ESTOQUE */}
                    <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${getBarColor(produto.QTD_ESTOQUE)}`}
                                style={{ width: getBarWidth(produto.QTD_ESTOQUE) }}
                            />
                        </div>

                        <span className="text-sm text-slate-600 font-medium">
                            {produto.QTD_ESTOQUE} un
                        </span>
                    </div>

                    {/* STATUS */}
                    <span className={`text-sm font-semibold ${produto.STATUS === 'ATIVO' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {produto.STATUS}
                    </span>
                    <div className="flex gap-4 justify-start">
                        <FaPen className="h-7 w-7 cursor-pointer text-gray-500 hover:text-gray-800" onClick={() => onEditProduct && onEditProduct(produto)} />

                        {produto.STATUS === 'INATIVO'
                            ?
                            <BsShieldFillCheck
                                className="w-7 h-7 cursor-pointer text-gray-500 hover:text-gray-800"
                                onClick={() => handleActive(produto.ID)}
                            />
                            :
                            <GiShieldDisabled
                                className="h-7 w-7 cursor-pointer text-gray-500 hover:text-gray-800"
                                onClick={() => handleDelete(produto.ID)}
                            />}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProdutosGrid;
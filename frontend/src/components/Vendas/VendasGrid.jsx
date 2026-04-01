import { FaTrash } from "react-icons/fa";

function VendasGrid({ vendas = [], refreshVendas }) {

    async function handleDelete() {


        await refreshVendas();
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden p-2 max-w-full">
            {/* HEADER */}
            <div className="grid grid-cols-[6fr_2fr_3fr_1fr]  px-6 py-4 text-sm font-semibold text-slate-500 border-b border-gray-200">
                <span>Produto</span>
                <span>Preço</span>
                <span>Quantidade</span>
                <span>Actions</span>
            </div>

            {vendas.map((venda) => (
                <div
                    key={venda.VENDA_ID}
                    className="grid grid-cols-[6fr_2fr_3fr_1fr] items-center px-6 py-4 border-b border-gray-200 last:border-none hover:bg-slate-100 transition"
                >
                    {/* NOME */}
                    <div>
                        <p className="font-medium text-slate-900">{venda.NOME}</p>
                    </div>

                    {/* PREÇO */}
                    <span className="text-slate-700 font-medium">
                        R$ {venda.PRECO_VENDA}
                    </span>

                    {/* QUANTIDADE */}

                    <span
                        className="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-bold text-indigo-400 inset-ring inset-ring-indigo-400/30 w-15 flex justify-center">
                        {venda.QUANT} un
                    </span>

                    {/* ACTIONS */}
                    <div className="flex gap-4 justify-start">
                        <FaTrash
                            className="h-7 w-7 cursor-pointer text-gray-500 hover:text-gray-800"
                            onClick={() => handleDelete(venda.ID)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default VendasGrid;
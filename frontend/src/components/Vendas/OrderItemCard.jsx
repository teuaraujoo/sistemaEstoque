import { IoClose } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { formataValor } from "../../utils/formataValor";

function OrderItemCard({ item, onRemove, tam, tamMax, more, less, reset, addAll, removeAll }) {


    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                        {item.NOME}
                    </h4>
                    <p className="mt-1 text-lg font-bold text-indigo-600">
                        {formataValor(item.PRECO_VENDA)}
                    </p>
                </div>

                <button
                    onClick={() => { onRemove(item.ID); reset(item.ID) }}
                    className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-red-500 transition"
                >
                    <IoClose className="w-5 h-5" />
                </button>
            </div>

            {/* Quantidade */}
            <div className="mt-5 flex items-center justify-center gap-4">

                <button
                    onClick={less}
                    disabled={tam <= 0}
                    className="h-9 w-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    -
                </button>

                <span className="text-base font-semibold text-slate-800 min-w-[24px] text-center">
                    {tam}
                </span>

                <button
                    onClick={more}
                    disabled={tam >= tamMax}
                    className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    +
                </button>
            </div>

            {/* Divider */}
            <div className="mt-5 border-t border-slate-100"></div>

            {/* Ações */}
            <div className="mt-4 flex gap-3">

                <button
                    onClick={addAll}
                    className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                >
                    Adicionar tudo
                </button>

                <button
                    onClick={removeAll}
                    className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition"
                >
                    Limpar
                </button>

            </div>
        </div>
    );
};

export default OrderItemCard;
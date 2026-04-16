import { useState } from "react";
import OrderItemCard from "./OrderItemCard";
import { createVenda } from "../../services/vendasServices";
import { toast } from "react-toastify";
import { formataValor } from "../../utils/formataValor";

function OrderSummary({ items, onRemove, onFinish, refreshProdutos }) {

    const [quant, setQuantidades] = useState({});

    const valor = items.reduce((acc, item) => {
        const qtd = quant[item.ID] || 0;
        return acc + (Number(item.PRECO_VENDA) * qtd);
    }, 0)

    function addQtd(id) {
        setQuantidades((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    function addAll(id, qtd) {
        setQuantidades((prev) => ({
            ...prev,
            [id]: qtd
        }));
    };

    function removeAll(id) {
        setQuantidades((prev) => ({
            ...prev,
            [id]: 0
        }));
    };

    function removerQtd(id) {
        setQuantidades((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0)
        }));
    };

    function handleRemoveQtdItem(id) {
        onRemove(id);

        setQuantidades((prev) => {
            const novo = { ...prev };
            delete novo[id];
            return novo;
        });
    };

    async function handleFinalizarVenda() {
        try {
            const pedido = items.map((item) => ({
                PRODUTO_ID: item.ID,
                QUANT: quant[item.ID]
            }));
            const response = await createVenda(pedido);
            toast.success(response.message);
            onFinish();
            refreshProdutos();
            setQuantidades({});
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <aside className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <h2 className="text-[18px] font-semibold text-slate-800">
                    Pedido Atual
                </h2>

                <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-indigo-50 px-2 text-xs font-semibold text-indigo-600">
                    {items.length}
                </span>
            </div>

            <div className="custom-scrollbar flex-1 overflow-y-auto px-5 py-5">
                <div className="space-y-3">
                    {items.length > 0
                        ?
                        items.map((item) => (
                            <OrderItemCard
                                key={item.ID}
                                item={item}
                                onRemove={onRemove}
                                tam={quant[item.ID] || 0}
                                tamMax={item.QTD_ESTOQUE}
                                more={() => addQtd(item.ID)}
                                less={() => removerQtd(item.ID)}
                                addAll={() => addAll(item.ID, item.QTD_ESTOQUE)}
                                removeAll={() => removeAll(item.ID)}
                                calcValor={valor}
                                reset={handleRemoveQtdItem}
                            />
                        ))
                        :
                        (
                            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
                                Nenhum item no pedido ainda.
                            </div>
                        )}
                </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-5">
                <div className="mb-5 flex items-center justify-between">
                    <span className="text-[18px] font-bold text-slate-800">Total</span>
                    <span className="text-[18px] font-bold text-slate-900">
                        {formataValor(valor)}
                    </span>
                </div>

                <button
                    className="w-full rounded-2xl bg-indigo-600 px-4 py-3.5 text-base font-semibold text-white shadow-sm transition cursor-pointer hover:bg-indigo-700"
                    onClick={() => handleFinalizarVenda()}
                >
                    Finalizar Venda
                </button>
            </div>
        </aside>
    );
};

export default OrderSummary;
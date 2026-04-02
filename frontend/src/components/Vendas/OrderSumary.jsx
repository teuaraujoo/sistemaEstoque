import OrderItemCard from "./OrderItemCard";

function OrderSummary({ items, onRemove }) {
    return (
        <aside className="flex h-[calc(100vh-250px)] flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
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
                        R$ 100,20
                    </span>
                </div>

                <button
                    className="w-full rounded-2xl bg-indigo-600 px-4 py-3.5 text-base font-semibold text-white shadow-sm transition cursor-pointer hover:bg-indigo-700"

                >
                    Finalizar Venda
                </button>
            </div>
        </aside>
    );
};

export default OrderSummary;
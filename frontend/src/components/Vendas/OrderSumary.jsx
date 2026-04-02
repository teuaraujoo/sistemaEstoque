import OrderItemCard from "./OrderItemCard";

function OrderSummary() {
    const flag = true;
    return (
        <aside className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 className="text-xl font-semibold text-slate-800">Pedido Atual</h2>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                    1
                </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                {flag ? (
                    <OrderItemCard
                    />
                )
                    : (
                        <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
                            Nenhum item no pedido ainda.
                        </div>
                    )}
            </div>

            <div className="border-t border-slate-200 px-5 py-4">
                <div className="mb-4 flex items-center justify-between pt-4">
                    <span className="text-2xl font-bold text-slate-800">Total</span>
                    <span className="text-2xl font-bold text-slate-900">
                        RS 100,20
                    </span>
                </div>
                <button className="mt-3 w-full rounded-xl bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition cursor-pointer hover:bg-indigo-700">
                    Finalizar Venda
                </button>
            </div>
        </aside>
    );
}

export default OrderSummary;
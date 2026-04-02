import { IoClose } from "react-icons/io5";

function OrderItemCard() {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-800">Nome</h4>
                    <p className="mt-1 text-sm font-bold text-indigo-600">
                        R$ 10,00
                    </p>
                </div>

                <IoClose
                    className="h-5 w-5 cursor-pointer shrink-0 rounded-md border border-slate-200 hover:bg-slate-100 hover:text-slate-800"
                />
            </div>

            <div className="mt-4 flex items-center gap-3">
                <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition cursor-pointer hover:bg-slate-200"
                >
                    -
                </button>

                <span className="min-w-[20px] text-center text-sm font-semibold text-slate-800">
                    10
                </span>

                <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition cursor-pointer hover:bg-indigo-200"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default OrderItemCard;
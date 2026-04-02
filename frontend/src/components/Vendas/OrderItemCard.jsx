import { IoClose } from "react-icons/io5";

function OrderItemCard() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <h4 className="text-[15px] font-semibold text-slate-800">Nome</h4>
                    <p className="mt-1 text-base font-bold text-indigo-600">
                        R$ 10,00
                    </p>
                </div>

                <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 cursor-pointer">
                    <IoClose className="h-4 w-4" />
                </button>
            </div>

            <div className="mt-5 flex items-center gap-4">
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition cursor-pointer hover:bg-slate-300">
                    -
                </button>

                <span className="min-w-[20px] text-center text-sm font-semibold text-slate-800">
                    10
                </span>

                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition cursor-pointer hover:bg-indigo-200">
                    +
                </button>
            </div>
        </div>
    );
}

export default OrderItemCard;
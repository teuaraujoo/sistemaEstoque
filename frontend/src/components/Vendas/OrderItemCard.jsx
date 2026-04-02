import { useState } from "react";
import { IoClose } from "react-icons/io5";

function OrderItemCard({ item, onRemove }) {

    const tamMin = 0;
    const tamMax = item.QTD_ESTOQUE;

    let [tam, setTam] = useState(0);

    function addQtd() {
        return setTam(tam + 1)
    };

    function removeQtd() {
        return setTam(tam - 1);
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <h4 className="text-[15px] font-semibold text-slate-800">{item.NOME}</h4>
                    <p className="mt-1 text-base font-bold text-indigo-600">
                        {item.PRECO_VENDA}
                    </p>
                </div>

                <button
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
                    onClick={() => onRemove(item.ID)}
                >
                    <IoClose
                        className="h-5 w-5"
                    />
                </button>
            </div>

            <>

                {tam >= tamMax ? (

                    <div className="mt-5 flex items-center gap-4">

                        <>
                            {tam <= tamMin ? (
                                <button
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition opacity-50 cursor-not-allowed hover:bg-slate-300 "
                                >
                                    -
                                </button>
                            )
                                :
                                (
                                    <button
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition cursor-pointer hover:bg-slate-300 "
                                        onClick={removeQtd}
                                    >
                                        -
                                    </button>
                                )
                            }
                        </>

                        <span className="min-w-[20px] text-center text-sm font-semibold text-slate-800">
                            {tam}
                        </span>

                        <button
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition opacity-50 cursor-not-allowed hover:bg-indigo-200"
                        >
                            +
                        </button>
                    </div>
                )
                    :
                    (
                        <div className="mt-5 flex items-center gap-4">
                            <>
                                {tam <= tamMin ? (
                                    <button
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition opacity-50 cursor-not-allowed hover:bg-slate-300 "
                                    >
                                        -
                                    </button>
                                )
                                    :
                                    (
                                        <button
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition cursor-pointer hover:bg-slate-300 "
                                            onClick={removeQtd}
                                        >
                                            -
                                        </button>
                                    )
                                }
                            </>
                            <span className="min-w-[20px] text-center text-sm font-semibold text-slate-800">
                                {tam}
                            </span>

                            <button
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition cursor-pointer hover:bg-indigo-200"
                                onClick={addQtd}
                            >
                                +
                            </button>
                        </div>
                    )

                }
            </>
        </div>
    );
};

export default OrderItemCard;
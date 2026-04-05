import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import {
    IoIosClose,
    IoMdSave
} from "react-icons/io";
import { useRef, useState } from "react";
import { useMoveForm } from "../../hooks/Moves/useMoveForm";


function EstoqueModalForm({ produtos = [], isOpen, onClose, refreshMoves }) {

    const ref = useRef(null);
    const [tipo, setTipo] = useState("ENTRADA");

    const { handleSubmit } = useMoveForm({ onClose, refreshMoves, ref, tipo });

    if (!isOpen) return null;

    const motivos = [
        'COMPRA FORNECEDOR',
        'PERDA DE MERCADORIA',
        'DEVOLUÇÕES DO CLIENTE',
        'TRANSFERÊNCIA ENTRE FILIAIS',
        'CORREÇÃO / ESTORNO'
    ];

    function handleTipoChange(novoTipo) {
        setTipo(novoTipo);
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

                {/* HEADER */}
                <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Nova Movimentação
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Registre uma entrada ou saída de estoque
                        </p>
                    </div>
                    <button
                        className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                        onClick={() => onClose()}
                    >
                        <IoIosClose className="h-6 w-6" />
                    </button>
                </div>

                {/* FORM */}
                <form
                    ref={ref}
                    onSubmit={handleSubmit}
                >
                    <div className="px-6 py-6">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* PRODUTO */}
                            <div className="md:col-span-2">
                                <label
                                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                                    htmlFor="produto"
                                >
                                    Produto
                                </label>

                                <select
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                                    name="produto"
                                    id="produto"
                                >
                                    <option value="">Selecione um produto</option>
                                    {produtos.map((produto) => (
                                        <option
                                            key={produto.ID}
                                            value={produto.ID}
                                        >
                                            {produto.NOME}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* TIPO */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Tipo de movimentação
                                </label>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleTipoChange("ENTRADA")}
                                        className={`cursor-pointer flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition
                                            ${tipo === "ENTRADA"
                                                ? "border-green-600 bg-green-50 text-green-700"
                                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        <ArrowDownCircle className="h-4 w-4" />
                                        Entrada
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleTipoChange("SAIDA")}
                                        className={`cursor-pointer flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition
                                            ${tipo === "SAIDA"
                                                ? "border-rose-600 bg-rose-50 text-rose-700"
                                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        <ArrowUpCircle className="h-4 w-4" />
                                        Saída
                                    </button>
                                </div>
                            </div>

                            {/* QUANTIDADE */}
                            <div>
                                <label
                                    htmlFor="quant"
                                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                                >
                                    Quantidade
                                </label>

                                <input
                                    id="quant"
                                    name="quant"
                                    type="number"
                                    placeholder="Digite a quantidade"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            {/* MOTIVO */}
                            <div>
                                <label
                                    htmlFor="motivo"
                                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                                >
                                    Motivo
                                </label>
                                <select
                                    name="motivo"
                                    id="motivo"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                                >
                                    <option value="">Selecione um motivo</option>
                                    {motivos.map((motivo) => (
                                        <option>{motivo}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                            <button
                                type="button"
                                onClick={onClose}
                                className="cursor-pointer rounded-2xl px-5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
                            >
                                Cancelar
                            </button>

                            <button className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition cursor-pointer hover:bg-indigo-700">
                                <IoMdSave />
                                Salvar Movimentação
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EstoqueModalForm;
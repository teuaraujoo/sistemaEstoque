import {
    IoIosClose,
    IoMdSave
} from "react-icons/io";
import { useEffect, useRef } from "react";
import { limparFormulario, preencherFormulario } from "../../utils/produtoFormsUtils";
import { useProdutoForm } from "../../hooks/Produto/useProdutoForm";

function ProdutoModalForm({ isOpen, onClose, onEdit, setOnEdit, refreshProdutos }) {

    const ref = useRef(null);

    useEffect(() => {
        const form = ref.current;

        if (!form) return;

        if (onEdit) {
            preencherFormulario(form, onEdit);
        } else {
            limparFormulario(form);
        };
    }, [onEdit, isOpen]);

    const { handleSubmit } = useProdutoForm({
        onEdit,
        setOnEdit,
        onClose,
        refreshProdutos,
        ref
    });

    if (!isOpen) return null;

    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
        >
            <div className="relative w-full max-w-2xl">
                <div className="relative rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] border border-slate-200 px-5 py-5 md:px-7 md:py-6">
                    <div className="border-b border-slate-200 pb-4 md:pb-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-[28px] leading-tight font-bold tracking-[-0.02em] text-slate-900">
                                    Cadastro de produto
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Preencha os detalhes essenciais para cadastrar um item no catálogo.
                                </p>
                            </div>

                            <IoIosClose
                                type="button"
                                onClick={onClose}
                                data-modal-hide="authentication-modal"
                                className="h-10 w-10 shrink-0 cursor-pointer rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                            />
                        </div>
                    </div>

                    <form action="#" ref={ref} onSubmit={handleSubmit} className="pt-5 md:pt-6 space-y-5">
                        <div>
                            <label
                                htmlFor="nome"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Nome do produto
                            </label>
                            <input
                                type="text"
                                id="nome"
                                className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                placeholder="e.g. Headset Gamer HyperX"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="descricao"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Descrição
                            </label>
                            <textarea
                                name="descricao"
                                id="descricao"
                                rows={5}
                                cols={45}
                                className="block w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                placeholder="Descreva seu produto, especificações técnicas"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="preco_compra"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Preço da compra
                                </label>
                                <input
                                    type="number"
                                    id="preco_compra"
                                    step="0.01"
                                    className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                    placeholder="R$ 00,00"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="preco_venda"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Preço da venda
                                </label>
                                <input
                                    type="number"
                                    id="preco_venda"
                                    step="0.01"
                                    className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                    placeholder="R$ 00,00"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="quant"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Quantidade
                            </label>
                            <input
                                type="number"
                                id="quant"
                                className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                placeholder="0"
                                disabled={onEdit}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(79,70,229,0.28)] transition hover:bg-indigo-700 cursor-pointer"
                            >
                                <IoMdSave />
                                Salvar produto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProdutoModalForm;
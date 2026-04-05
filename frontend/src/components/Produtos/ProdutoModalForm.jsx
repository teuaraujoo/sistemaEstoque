import {
    IoIosClose,
    IoMdSave
} from "react-icons/io";
import { useEffect, useRef } from "react";
import { limparFormulario, preencherFormulario } from "../../utils/produtoFormsUtils";
import { useProdutoForm } from "../../hooks/Produto/useProdutoForm";

function ProdutoModalForm({ isOpen, onClose, onEdit, setOnEdit, refreshProdutos, mensagem }) {
    const ref = useRef(null);
    const mensagemEdicao = onEdit
        ? (mensagem ?? "Quantidade não pode ser alterada durante a edição.")
        : "";

    useEffect(() => {
        const form = ref.current;

        if (!form) return;

        if (onEdit) {
            preencherFormulario(form, onEdit);
        } else {
            limparFormulario(form);
        }
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
                <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">
                            Cadastro de produto
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Preencha os detalhes essenciais para cadastrar um item no catálogo.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <IoIosClose className="h-6 w-6 cursor-pointer" />
                    </button>
                </div>

                <form
                    ref={ref}
                    onSubmit={handleSubmit}
                    className="px-6 py-6"
                >
                    <div className="space-y-5">
                        <div>
                            <label
                                htmlFor="nome"
                                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                            >
                                Nome do produto
                            </label>
                            <input
                                type="text"
                                id="nome"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                                placeholder="e.g. Headset Gamer HyperX"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="descricao"
                                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                            >
                                Descrição
                            </label>
                            <textarea
                                name="descricao"
                                id="descricao"
                                rows={5}
                                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                                placeholder="Descreva seu produto, especificações técnicas"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="preco_compra"
                                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                                >
                                    Preço da compra
                                </label>
                                <input
                                    type="number"
                                    id="preco_compra"
                                    step="0.01"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                                    placeholder="R$ 00,00"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="preco_venda"
                                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                                >
                                    Preço da venda
                                </label>
                                <input
                                    type="number"
                                    id="preco_venda"
                                    step="0.01"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                                    placeholder="R$ 00,00"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="quant"
                                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                            >
                                Quantidade
                            </label>
                            <input
                                type="number"
                                id="quant"
                                disabled={!!onEdit}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                                placeholder="0"
                            />
                            {!!mensagemEdicao && (
                                <p className="mt-2 text-sm text-slate-500">
                                    {mensagemEdicao}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-2xl px-5 py-3 text-sm font-semibold text-slate-500 transition cursor-pointer hover:bg-slate-100"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition cursor-pointer hover:bg-indigo-700"
                        >
                            <IoMdSave />
                            Salvar produto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProdutoModalForm;
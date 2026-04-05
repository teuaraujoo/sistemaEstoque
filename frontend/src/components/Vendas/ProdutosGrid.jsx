
import ProdutoCard from "./ProdutoCard";

function ProdutosGrid({ produtos, onAddItem }) {
    return (

        <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {produtos.length > 0 ? (
                    produtos.map((produto) => (
                        <ProdutoCard
                            key={produto.ID}
                            produto={produto}
                            onAddItem={onAddItem}
                        />
                    ))
                )
                    :
                    (
                        <div className="col-span-full flex items-center justify-center rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
                                Nenhum produto encontrado
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ProdutosGrid;
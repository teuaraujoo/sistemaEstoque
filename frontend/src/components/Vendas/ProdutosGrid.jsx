
import ProdutoCard from "./ProdutoCard";

function ProdutosGrid({ produtos, onAddItem }) {
    return (

        <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {produtos.map((produto) => (

                    <ProdutoCard
                        key={produto.ID}
                        produto={produto}
                        onAddItem={onAddItem}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProdutosGrid;
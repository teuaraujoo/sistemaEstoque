import ProdutosGrid from "../components/Produtos/ProdutosGrid";

function ProdutosPage() {
    
    return (
        <div>
            <h2>Produtos</h2>
            <p>Gerencie seu catálogo</p>
            <div className="p-7">
                <ProdutosGrid />
            </div>
        </div>
    )
}

export default ProdutosPage;
import PageTitle from "../components/ui/PageTitle";
import AddButton from "../components/ui/AddButton";
import ProdutosGrid from "../components/Vendas/ProdutosGrid";
import OrderSummary from "../components/Vendas/OrderSumary";
import SearchBar from "../components/ui/SearchBar";
import { getAllProdutos } from "../services/produtosServices";
import { toast } from "react-toastify";
import { RxArrowTopRight } from "react-icons/rx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeAcentos } from "../utils/removeAcentos";


function VendasPage() {
    const [produtos, setProdutos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [orderItems, setOrderItems] = useState([]);
    const navigate = useNavigate();

    const produtosFiltrados = produtos.filter((produto) =>
        removeAcentos(produto.NOME?.toLowerCase()).includes(removeAcentos(searchTerm.toLowerCase()))
    );

    useEffect(() => {

        async function carregarProdutos() {
            const produtosList = await getAllProdutos();
            setProdutos(produtosList || []);
        };

        carregarProdutos();
    }, []);

    function addItem(produto) {

        const exists = orderItems.some((item) => produto.ID === item.ID);

        if (exists) {
            toast.error('Produto já adicionado');
            return
        };

        setOrderItems((prev) => [...prev, produto]);
    };

    function removeItem(id) {
        setOrderItems((prev) => prev.filter((item) => item.ID !== id));
    };


    function limparOrder() {
        setOrderItems([])
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* TOPO */}
            <div className="flex items-end justify-between p-7">
                <div>
                    <PageTitle
                        Nome={"Nova Venda"}
                        Descricao={"Crie novas vendas com os produtos disponíveis"}
                    />
                </div>

                <AddButton
                    Name={"Ver todas"}
                    Icon={<RxArrowTopRight className="h-5 w-5 text-white" />}
                    onClick={() => navigate("/vendas/todas")}
                />
            </div>

            {/* CONTEÚDO */}
            <div className="grid gap-8 px-8 pb-8 pt-6 xl:grid-cols-[1fr_360px]">
                {/* ESQUERDA */}
                <section className="flex h-[calc(100vh-270px)] flex-col">
                    {/* BUSCA */}
                    <div className="mb-6 relative hidden md:block">
                        <SearchBar
                            placeholder={'Busque pelos produtos'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <ProdutosGrid
                        produtos={produtosFiltrados}
                        onAddItem={addItem}
                    />
                </section>

                {/* DIREITA */}
                <section className="h-full">
                    <OrderSummary
                        items={orderItems}
                        onRemove={removeItem}
                        onFinish={limparOrder}
                    />
                </section>
            </div>
        </div>
    );
};

export default VendasPage;
import PageTitle from "../components/ui/PageTitle";
import AddButton from "../components/ui/AddButton";
import { RxArrowTopRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import ProdutoCard from "../components/Vendas/ProdutoCard";
import OrderSummary from "../components/Vendas/OrderSumary";

function VendasPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50">
            {/* TOPO */}
            <div className="flex items-end justify-between p-7">
                <div>
                    <PageTitle
                        Nome={"Vendas"}
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
                <section className="min-w-0">
                    {/* BUSCA */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Buscar por nome..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                        />
                    </div>

                    {/* GRID DE PRODUTOS */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        <ProdutoCard />
                        <ProdutoCard />
                        <ProdutoCard />
                        <ProdutoCard />
                        <ProdutoCard />
                        <ProdutoCard />
                    </div>
                </section>

                {/* DIREITA */}
                <section className="h-full">
                    <OrderSummary />
                </section>
            </div>
        </div>
    );
}

export default VendasPage;
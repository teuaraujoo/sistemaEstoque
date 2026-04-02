import PageTitle from "../components/ui/PageTitle";
import AddButton from "../components/ui/AddButton";
import { RxArrowTopRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import ProdutoCard from "../components/Vendas/produtoCard";
import OrderItemCard from "../components/Vendas/OrderItemCard";
import OrderSummary from "../components/Vendas/OrderSumary";

function VendasPage() {
    const navigate = useNavigate()

    return (
        <div>
            <div className="flex justify-between p-7 items-end">
                <div>
                    <PageTitle Nome={'Vendas'} Descricao={'Gerencie e crie suas vendas'} />
                </div>
                <AddButton Name={'Ver todas'} Icon={<RxArrowTopRight className="w-5 h-5 text-white" />} onClick={() => navigate('/vendas/todas')} />
            </div>

            <div>
                <div className="flex justify-between">
                    <div className="mb-5 p-7">
                        <input
                            type="text"
                            placeholder="Buscar por nome..."
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>
                    <div>
                        <ProdutoCard />
                    </div>
                    <OrderSummary >
                        <OrderItemCard />
                    </OrderSummary>
                </div>
            </div>
        </div>
    )
};

export default VendasPage;
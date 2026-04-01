import PageTitle from "../components/ui/PageTitle";
import AddButton from "../components/ui/AddButton";
import { RxArrowTopRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function VendasPage() {
    const navigate = useNavigate()

    return (
        <div className="flex justify-between p-7 items-end">
            <div>
                <PageTitle Nome={'Vendas'} Descricao={'Gerencie e crie suas vendas'} />
            </div>
            <AddButton Name={'Ver todas'} Icon={ <RxArrowTopRight className="w-5 h-5 text-white" /> } onClick={() => navigate('/vendas/todas')}  />
        </div>  
    )
};

export default VendasPage;
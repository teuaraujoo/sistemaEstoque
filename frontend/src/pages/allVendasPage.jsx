import PageTitle from "../components/ui/PageTitle";
import { useNavigate } from "react-router-dom";
import AddButton from "../components/ui/AddButton";
import { IoArrowBack } from "react-icons/io5";
import VendasGrid from "../components/Vendas/VendasGrid";
import { useEffect, useState } from "react";
import { fetchVendasItens } from "../services/vendaItensServices";

function AllVendasPage() {
    const [vendas, setVendas] = useState([]);
    const navigate = useNavigate();


    async function fetchVendas() {
        try {
            const vendasList = await fetchVendasItens();
            setVendas(vendasList || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        async function carregarVendas() {
            try {
                const vendasList = await fetchVendasItens();
                setVendas(vendasList || []);
            } catch (err) {
                console.log(err);
            }
        }
        carregarVendas();
    }, []);

    return (
        <div>
            <div className="flex justify-between p-7 items-end">

                <div>
                    <PageTitle Nome={'Vendas'} Descricao={'Gerencie e vizualize todas suas vendas'} />
                </div>
                <AddButton Name={'Voltar'} Icon={<IoArrowBack className="w-5 h-5 text-white" />} onClick={() => navigate('/vendas')} />
            </div>
            <div className="p-7">
                <VendasGrid vendas={vendas} refreshVendas={fetchVendas} />
            </div>
        </div>
    )
};

export default AllVendasPage;
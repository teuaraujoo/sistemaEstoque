import PageTitle from "../components/ui/PageTitle";
import { useNavigate } from "react-router-dom";
import AddButton from "../components/ui/AddButton";
import { IoArrowBack } from "react-icons/io5";
import VendasGrid from "../components/Vendas/VendasGrid";
import MoreInfoCard from "../components/Vendas/MoreInfoCard";
import { useEffect, useState } from "react";
import { fetchVendas } from "../services/vendasServices";
import { fetchVendasItensInfoCard } from "../services/vendaItensServices";

function AllVendasPage() {

    const [isOpen, setIsOpen] = useState(false);
    const [vendas, setVendas] = useState([]);
    const [vendaItens, setVendaItens] = useState([]);
    const navigate = useNavigate();


    async function fetchVendasPage() {
        try {
            const vendasList = await fetchVendas();
            setVendas(vendasList || []);
        } catch (err) {
            console.log(err);
        }
    };

    async function fetchVendaItens(id) {
        try {
            const vendaItensList = await fetchVendasItensInfoCard(id);
            console.log(vendaItensList)
            setVendaItens(vendaItensList || []);
        } catch (err) {
            console.log(err);
            setVendaItens([]);
        }
    }

    const openCard = async (id) => {
        await fetchVendaItens(id);
        setIsOpen(true);
    };

    const closeCard = () => {
        setIsOpen(false);
        setVendaItens([]);
    };

    useEffect(() => {
        async function carregarVendas() {
            try {
                const vendasList = await fetchVendas();
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
                <VendasGrid
                    vendas={vendas}
                    refreshVendas={fetchVendasPage}
                    onInformation={openCard}
                />
                <MoreInfoCard
                    vendaItens={vendaItens}
                    isOpen={isOpen}
                    onClose={closeCard}
                />
            </div>
        </div>
    )
};

export default AllVendasPage;
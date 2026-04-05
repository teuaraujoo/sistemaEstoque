import PageTitle from "../components/ui/PageTitle";
import EstoqueGrid from "../components/Estoque/EstoqueGrid";
import { getAllMoves } from "../services/moveServices";
import { useState, useEffect } from "react";
import AddButton from '../components/ui/AddButton';
import { IoIosAdd } from "react-icons/io";
import EstoqueModalForm from "../components/Estoque/EstoqueModalForm";
import { getAllProdutos } from "../services/produtosServices";

function MovePage() {
    const [moves, setMoves] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function fetchMoves() {
        try {
            const movesList = await getAllMoves();
            setMoves(movesList || []);
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {

        async function carregarMoves() {
            try {
                const movesList = await getAllMoves();
                const produtosList = await getAllProdutos();
                setMoves(movesList || []);
                setProdutos(produtosList || []);
            } catch (err) {
                console.error(err);
            };
        };

        carregarMoves();
    }, []);

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    return (
        <div>
            <div className="flex p-7 justify-between items-end">
                <PageTitle
                    Nome={'Movimentações'}
                    Descricao={'Gerencie seu estoque e crie novas movimentações'}
                />
                <AddButton
                    Name={'Movimentação'}
                    Icon={<IoIosAdd className="w-7 h-7 text-white" />}
                    onClick={handleOpenModal}
                />
            </div>
            <div className="p-7">
                <EstoqueGrid
                    moves={moves}
                    refreshMoves={fetchMoves}
                />
            </div>
            <EstoqueModalForm
                produtos={produtos}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    )
}

export default MovePage;
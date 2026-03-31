import { useState } from "react";
import ProdutosGrid from "../components/Produtos/ProdutosGrid";
import AddButton from "../components/ui/AddButton";
import ProdutoModalForm from "../components/Produtos/ProdutoModalForm";
import PageTitle from "../components/ui/PageTitle";

/*
usuario clica em editar -> abre modal -> preenche informacoes -> clica no botao e atualiza (PUT)
usuario clica em cirar -> abre modal -> preenchje informacoes -> clica no botao e posta (POST)

*/

function ProdutosPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    return (
        <div>
            <div className="flex justify-between p-7 items-end">
                <div>
                    <PageTitle Nome={'Produtos'} Descricao={'Gerencie seu catálogo e quantidade de estoque'} />
                </div>
                <AddButton Name={'Produto'} onClick={toggleModal} />
            </div>
            <div className="p-7">
                <ProdutosGrid />
            </div>
            <ProdutoModalForm isOpen={isModalOpen} onClose={toggleModal} />
        </div>
    )
}

export default ProdutosPage;
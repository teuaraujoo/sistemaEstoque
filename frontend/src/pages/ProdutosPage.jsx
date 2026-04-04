import { useEffect, useState } from "react";
import ProdutosGrid from "../components/Produtos/ProdutosGrid";
import AddButton from "../components/ui/AddButton";
import ProdutoModalForm from "../components/Produtos/ProdutoModalForm";
import PageTitle from "../components/ui/PageTitle";
import { getAllProdutos } from "../services/produtosServices";
import { IoIosAdd } from "react-icons/io";
import SearchBar from "../components/ui/SearchBar";

function ProdutosPage() {

    const [onEdit, setOnEdit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);

    async function fetchProdutos() {
        try {
            const produtosList = await getAllProdutos();
            setProdutos(produtosList || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {

        async function carregarProdutos() {
            const produtosList = await getAllProdutos();
            setProdutos(produtosList || []);
        };

        carregarProdutos();
    }, []);

    const handleOpenNewProduct = () => {
        setOnEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEditProduct = (produto) => {
        setOnEdit(produto);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setOnEdit(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between p-7 items-end">
                <div>
                    <PageTitle Nome={'Produtos'} Descricao={'Gerencie seu catálogo e quantidade de estoque'} />
                </div>
                <AddButton Name={'Produto'} Icon={<IoIosAdd className="w-7 h-7 text-white" />} onClick={handleOpenNewProduct} />
            </div>
            <div className="ml-7 w-xl relative">
                <SearchBar
                    placeholder={'Busque pelos produtos'}
                />
            </div>
            <div className="p-7">
                <ProdutosGrid
                    produtos={produtos}
                    onEditProduct={handleOpenEditProduct}
                    refreshProdutos={fetchProdutos}
                />
            </div>
            <ProdutoModalForm
                onEdit={onEdit}
                setOnEdit={setOnEdit}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                refreshProdutos={fetchProdutos}
            />
        </div>
    )
}

export default ProdutosPage;
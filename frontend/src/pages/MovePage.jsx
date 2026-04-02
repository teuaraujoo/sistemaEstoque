import PageTitle from "../components/ui/PageTitle";

function MovePage() {
    return (
        <div className="flex flex-col p-7">
            <PageTitle Nome={ 'Movimentações' } Descricao={ 'Gerencie seu estoque e crie novas movimentações' } />
        </div>
    )
}

export default MovePage;
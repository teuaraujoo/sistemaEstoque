function PageTitle({ Nome, Descricao }) {

    return (
        <div className="flex flex-col">
            <h1 className="font-bold tracking-tight text-heading md:text-5xl lg:text-1xl"> {Nome} </h1>
            <p className="text-lg font-normal text-body lg:text-base text-gray-500 " > {Descricao} </p>
        </div>
    )
}
export default (PageTitle);
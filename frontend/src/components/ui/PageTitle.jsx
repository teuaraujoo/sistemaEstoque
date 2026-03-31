function PageTitle({ Nome, Descricao }) {

    return (
        <>
            <h1 className="text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl"> {Nome} </h1>
            <p className="text-lg font-normal text-body lg:text-xl text-gray-500 " > {Descricao} </p>
        </>
    )
}
export default (PageTitle);
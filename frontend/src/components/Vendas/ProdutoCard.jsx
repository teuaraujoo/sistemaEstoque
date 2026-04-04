function ProdutoCard({ produto, onAddItem }) {

  const precoFormatado = Number(produto.PRECO_VENDA).toLocaleString('pt-BR', {
    style: "currency",
    currency: "BRL"
  });

  return (
    <>
      {
        produto.QTD_ESTOQUE === 0 || produto.STATUS === 'INATIVO' ? (
          <button
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm opacity-50 cursor-not-allowed"
          >
            {/* NOME */}
            <div className="mb-6">
              <h3 className="text-[17px] font-semibold text-slate-800 line-clamp-2">
                {produto.NOME}
              </h3>
            </div>

            {/* PREÇO */}
            <div className="flex items-end justify-between gap-3">
              <span className="text-xl font-bold text-indigo-300">
                {precoFormatado}
              </span>

              {/* QTD ESTOQUE */}
              <span className="text-sm font-medium text-red-400 text-right">
                {produto.QTD_ESTOQUE === 0 ? (
                  'Sem estoque'
                )
                  :
                  (
                    'Inativo'
                  )
                }
              </span>
            </div>
          </button>
        )
          :
          (

            <button
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md cursor-pointer"
              onClick={() => onAddItem(produto)}
            >
              {/* NOME */}
              < div className="mb-6" >
                <h3 className="text-[17px] font-semibold text-slate-800 line-clamp-2">
                  {produto.NOME}
                </h3>
              </div >

              {/* PREÇO */}
              < div className="flex items-end justify-between gap-3" >
                <span className="text-xl font-bold text-indigo-600">
                  {precoFormatado}
                </span>

                {/* QTD ESTOQUE */}

                <span className="text-sm font-medium text-slate-400">
                  {produto.QTD_ESTOQUE} no estoque
                </span>
              </div >
            </button >
          )
      }
    </>
  );
};

export default ProdutoCard;
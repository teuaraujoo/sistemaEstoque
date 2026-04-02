function ProdutoCard() {
  return (
    <button
      className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md cursor-pointer"
    >
      <div className="mb-6">
        <h3 className="text-[17px] font-semibold text-slate-800 line-clamp-2">
          MousePad gamer preto 23
        </h3>
      </div>

      <div className="flex items-end justify-between gap-3">
        <span className="text-xl font-bold text-indigo-600">
          R$ 10,00
        </span>

        <span className="text-sm font-medium text-slate-400">
          10 no estoque
        </span>
      </div>
    </button>
  );
}

export default ProdutoCard;
function ProdutoCard() {

  return (
    <button
      className="w-full rounded-2xl border p-4 text-left transition shadow-sm"
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-800 line-clamp-2">
          Nome
        </h3>
      </div>

      <div className="flex items-end justify-between">
        <span className="text-lg font-bold text-indigo-600">
          RS 10,00
        </span>

        <span
          className="text-sm font-medium text-slate-400"
        >
          no estoque
        </span>
      </div>
    </button>
  );
}

export default ProdutoCard;
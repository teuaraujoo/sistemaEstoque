import {
    IoIosClose,
} from "react-icons/io";
function MoreInfoCard({ isOpen, onClose, vendaItens = [] }) {

    if (!isOpen) return null;

    console.log(vendaItens[0].NOME)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center align-center bg-black/40">
            <div className="relative w-full max-w-3xl mx-4 rounded-xl bg-white shadow-xl p-6">
                <IoIosClose
                    className="absolute top-4 right-4 w-10 h-10 rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-red-800 rounded transition duration-300 ease cursor-pointer"
                    onClick={onClose}
                />
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-body">
                        <thead className="text-sm text-body bg-neutral-secondary-medium">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-s-base font-medium">
                                    Produto
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Quantidade
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Valor Unidade
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-e-base font-medium">
                                    Valor Total
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {vendaItens.map((item, index) => (
                                <tr key={index} className="bg-neutral-primary border-b border-gray-200">
                                    <td className="px-6 py-4">{item.NOME}</td>
                                    <td className="px-6 py-4">{item.QUANT}</td>
                                    <td className="px-6 py-4">{item.PRECO_UNITARIO}</td>
                                    <td className="px-6 py-4">{item.VALOR_TOTAL}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MoreInfoCard;
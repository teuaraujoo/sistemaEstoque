import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { toast } from "react-toastify";

function VendasGrid({ vendas = [], refreshVendas, onInformation }) {

    async function handleDelete(id) {
        try {
            const response = await axios.delete(`http://localhost:8800/api/v1/vendas/${id}`)
            toast.success(response.data.message);
            await refreshVendas();
        } catch (err) {
            toast.error(err.data.messsage);
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden p-2 max-w-full">
            {/* HEADER */}
            <div className="grid grid-cols-[2fr_1fr_1fr]  px-6 py-4 text-sm font-semibold text-slate-500 border-b border-gray-200">
                <span>Valor</span>
                <span>Data</span>
                <span>Actions</span>
            </div>

            {vendas.map((venda) => (
                <div
                    key={venda.ID}
                    className="grid grid-cols-[2fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-200 last:border-none hover:bg-slate-100 transition"
                >
                    {/* VALOR */}
                    <div>
                        <p className="font-medium text-slate-900">R$ {venda.VALOR_TOTAL}</p>
                    </div>

                    {/* DATA */}
                    <span className="text-slate-700 font-medium">
                        {new Date(venda.DATA_VENDA).toLocaleDateString('pt-BR')}
                    </span>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-4 justify-start">
                        <FaTrash
                            className="h-7 w-7 cursor-pointer text-gray-500 hover:text-gray-800"
                            onClick={() => handleDelete(venda.ID)}
                        />
                        <IoInformationCircle
                            className="h-10 w-10 cursor-pointer text-gray-500 hover:text-gray-800"
                            onClick={() => onInformation(venda.ID)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
};

export default VendasGrid;
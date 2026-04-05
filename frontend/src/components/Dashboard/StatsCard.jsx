import { useState, useEffect } from "react";
import {
    TriangleAlertIcon,
    Package,
    ReceiptText,
    CircleDollarSign,
} from 'lucide-react';
import { fetchProdutosResumo } from "../../services/produtosServices";
import { fetchVendasResumo } from "../../services/vendasServices";
import { NavLink } from "react-router-dom";

function StatsCard() {

    const [totalProdutos, setTotalProdutos] = useState(0);
    const [baixoEstoque, setBaixoEstoque] = useState(0);
    const [qtdVendasMes, setQtdVendasMes] = useState(0);
    const [receita, setReceita] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const { totalProdutos, baixoEstoque } = await fetchProdutosResumo();
            const { qtdVendasMes, receita } = await fetchVendasResumo();
            setTotalProdutos(totalProdutos);
            setBaixoEstoque(baixoEstoque);
            setQtdVendasMes(qtdVendasMes);
            setReceita(receita);
        }
        fetchData();
    }, []);

    const stats = [
        {
            title: 'Total de produtos',
            value: totalProdutos,
            subtextColor: 'text-emerald-500',
            iconBg: 'bg-indigo-100',
            iconColor: 'text-indigo-600',
            icon: <Package />,
            link: "/produtos"
        },
        {
            title: 'Baixo estoque',
            value: baixoEstoque,
            valueColor: 'text-rose-500',
            subtextColor: 'text-rose-500',
            iconBg: 'bg-rose-100',
            iconColor: 'text-rose-500',
            icon: <TriangleAlertIcon />,
            link: '/produtos'
        },
        {
            title: "Vendas do mês",
            value: qtdVendasMes,
            subtextColor: 'text-emerald-500',
            iconBg: 'bg-indigo-100',
            iconColor: 'text-indigo-600',
            icon: <ReceiptText />,
            link: '/vendas'
        },
        {
            title: "Receita do mês",
            value: `R$ ${receita}`,
            subtextColor: 'text-emerald-500',
            iconBg: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
            icon: <CircleDollarSign />,
            link: ''
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
                <>
                    <NavLink to={item.link}>
                        <div
                            key={item.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{item.title}</p>
                                    <h3
                                        className={`mt-3 text-4xl font-bold tracking-tight text-slate-900 ${item.valueColor || ''
                                            }`}
                                    >
                                        {item.value}
                                    </h3>
                                </div>

                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor}`}
                                >
                                    <span>{item.icon}</span>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                </>
            ))}
        </div>
    )
}

export default StatsCard;
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { useEffect, useState } from 'react';
import { fetchVendasItens } from '../../services/vendaItensServices';

function DashboardGrafico() {

    const [itens, setItens] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const vendas = await fetchVendasItens();
                setItens(vendas);
            } catch (error) {
                console.error('Erro ao buscar resumo de produtos:', error);
            };
        };
        fetchData();
    }, []);

    const itensAgrupados = itens.reduce((acc, item) => {
        const id = item.PRODUTO_ID;
        if (!acc[id]) {
            acc[id] = {
                produto: item.NOME_PRODUTO,
                quantidade: 0
            };
        };

        acc[id].quantidade += item.QUANT;

        return acc;
    }, {});

    const data = Object.values(itensAgrupados);

    return (

        <div className="mt-6 w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-slate-1000 text-2xl">Produtos mais vendidos</h2>
                    <p className="mt-1 text-sm text-slate-500 ">
                        Ranking com base nas quantidades vendidas
                    </p>
                </div>
            </div>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid
                            stroke="#E2E8F0"
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="produto"
                            tick={{ fill: "#64748B", fontSize: 13 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{ fill: "#64748B", fontSize: 13 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            cursor={{ fill: "rgba(99, 102, 241, 0.08)" }}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #E2E8F0",
                                backgroundColor: "#FFFFFF",
                                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                            }}
                            labelStyle={{
                                color: "#0F172A",
                                fontWeight: 600,
                            }}
                        />

                        <Bar
                            dataKey="quantidade"
                            radius={[10, 10, 0, 0]}
                            fill="#6366F1"
                            barSize={42}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardGrafico;

// label={renderCustomBarLabel}
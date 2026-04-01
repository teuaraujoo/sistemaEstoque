import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Produtos from '../pages/ProdutosPage';
import Vendas from '../pages/VendasPage';
import AllVendas from '../pages/allVendasPage';
import Movimentacoes from '../pages/MovePage';

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<Dashboard />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/vendas" element={<Vendas />} />
                <Route path="/vendas/todas" element={<AllVendas />} />
                <Route path="/movimentacoes" element={<Movimentacoes />} />
            </Route>
        </Routes>
    )
};

export default AppRoutes;
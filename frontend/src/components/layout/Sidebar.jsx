import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    ArrowLeftRight
} from 'lucide-react';
import logo from '../../assets/images/logo.png';

const menuItems = [
    {
        label: 'Dashboard',
        path: '/',
        icon: LayoutDashboard,
    },
    {
        label: 'Products',
        path: '/produtos',
        icon: Package,
    },
    {
        label: 'Sales',
        path: '/vendas',
        icon: ShoppingCart,
    },
    {
        label: 'Stock Movements',
        path: '/movimentacoes',
        icon: ArrowLeftRight,
    }
]

function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-white border-r border-slate-300 flex flex-col">
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-15 h-15 rounded-xl bg-transparent flex items-center justify-center">
                        <img src={logo} alt="Logo do Saas" />
                    </div>

                    <div>
                        <h1 className="text-1xl font-bold leading-none text-slate-900">
                            StockManager
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">SaaS Inventory</p>
                    </div>
                </div>
            </div>

            <nav className="px-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-lg transition-all
                ${isActive
                                    ? 'bg-indigo-100 text-indigo-600 font-medium'
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-1xl font-semibold">{item.label}</span>
                        </NavLink>
                    )
                })}
            </nav>

            <div className="flex-1" />
        </aside>
    )
}

export default Sidebar;
import { NavLink } from 'react-router-dom';
import {
    Settings,
    Bell,
    Search
} from 'lucide-react';


function Header() {

    return (
        <header className='w-full h-18 bg-white flex items-center p-6 justify-between  border-b border-slate-300'>

            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Pesquise qualquer coisa..."
                    className="w-140 pl-10 pr-4 py-2 border border-gray-200 bg-gray-200 rounded-xl transition-all duration-200 shadow-sm hover:border-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                />
            </div>
            <div className='flex gap-2 items-center'>
                <NavLink to="/settings"><Settings className='text-gray-700 cursor-pointer hover:text-black transition duration-300 ease' /></NavLink>
                <NavLink to="/notifications"><Bell className='text-gray-700 cursor-pointer hover:text-black transition duration-300 ease' /></NavLink>
                <div className="h-6 w-px bg-gray-500/50" />
                <div className='flex flex-col gap-1'>
                    <h1 className="text-1xl font-bold leading-none text-slate-900">Mateus Araujo</h1>
                    <h2 className="text-xs font-regular leading-none text-slate-900">Administrador</h2>
                </div>
            </div>
        </header>
    )
}

export default Header;
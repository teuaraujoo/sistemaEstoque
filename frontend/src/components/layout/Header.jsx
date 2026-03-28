
import {
    Settings,
    Bell,
    Search
} from 'lucide-react';


function Header() {

    return (
        <header className='w-full h-18 bg-white flex items-center p-6 justify-between  border-b border-slate-300'>

            <div className="flex items-center border w-120 pr-1 gap-1 bg-gray-200 border-gray-500/30 h-[46px] rounded-[5px] overflow-hidden">
                <Search className='pl-2  w-6 h-6 text-gray-700' />
                <input className="w-full h-full pl-1 outline-none placeholder-gray-1000 text-sm" placeholder="Search for products" type="text" />
            </div>
            <div className='flex gap-2 items-center'>
                <Settings className='text-gray-700' />
                <Bell className='text-gray-700' />
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
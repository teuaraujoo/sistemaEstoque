
import { Search } from 'lucide-react';

function SearchBar({ placeholder, value, onChange }) {
    return (
        <div>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-2xl pl-10 pr-4 py-2  border border-slate-200 bg-white px-5 py-3.5 text-base text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
        </div>
    );
};

export default SearchBar;
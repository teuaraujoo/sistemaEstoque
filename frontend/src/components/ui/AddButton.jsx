function ActionButton({ Name, Icon, onClick }) {
    return (
        <button
            onClick={onClick}
            className="cursor-pointer group relative inline-flex h-10 items-center overflow-hidden rounded-lg border border-indigo-700 bg-indigo-700 transition active:scale-[0.97]"
        >
            {/* TEXTO */}
            <span
                className="cursor-pointer whitespace-nowrap px-4 pr-12 text-sm font-semibold text-white transition-all duration-300"
            >
                {Name}
            </span>

            {/* ÍCONE */}
            <span
                className="cursor-pointer absolute right-0 flex h-full w-10 items-center justify-center bg-indigo-700 transition-all duration-300 group-hover:w-full"
            >
                {Icon}
            </span>
        </button>
    );
}

export default ActionButton;
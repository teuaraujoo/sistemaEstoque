import {
    IoIosAdd
} from "react-icons/io";

function AddButton({ Name, onClick }) {

    return (
        <>
            <button
                onClick={onClick}
                data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                className="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-indigo-700 bg-indigo-700 group hover:bg-indigo-700 active:bg-indigo-100 active:border-indigo-700"
            >
                <span
                    className="text-white font-semibold ml-8 transform group-hover:translate-x-10 transition-all duration-300"
                >
                    {Name}
                </span>
                <span
                    className="absolute right-0 h-full w-10 rounded-lg bg-indigo-700 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"
                >
                    <IoIosAdd className="w-7 h-7 text-white" />
                </span>
            </button>
        </>
    )
}

export default AddButton;
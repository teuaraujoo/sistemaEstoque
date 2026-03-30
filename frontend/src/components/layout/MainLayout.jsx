import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from "./Header";

function MainLayout() {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

export default MainLayout;
import Title from "../UI/Title";
import { Outlet } from "react-router-dom";
import Navbar from "../UI/Navbar";

const MainLayout = () => {
    return (
        <div className="w-full min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <Title text="Leader Board App" />
                </div>
                <div className="rounded-lg bg-gray-600 shadow-md p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
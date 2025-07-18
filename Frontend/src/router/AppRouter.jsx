import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import LeaderBoard from "../pages/LeaderBoard.jsx";
import AddUser from "../pages/AddUser.jsx";
import History from "../pages/History.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<LeaderBoard />} />
                <Route path="add-user" element={<AddUser />} />
                <Route path="history" element={<History />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
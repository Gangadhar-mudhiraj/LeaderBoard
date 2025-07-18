import NavItem from "../utils/NavItem";
import { FaTrophy, FaHistory, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
    const navItems = [
        {
            name: "Leader Board",
            link: "/",
            icon: FaTrophy
        },
        {
            name: "History",
            link: "/history",
            icon: FaHistory
        },
        {
            name: "Add User",
            link: "/add-user",
            icon: FaUserPlus
        },
    ];

    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">

                <div className="flex justify-between items-center space-x-4">
                    {/* Logo or brand */}
                    <div className="flex items-center py-4 px-2">
                        <span className="font-semibold text-gray-100 text-lg">
                            Task Planet
                        </span>
                    </div>

                    {/* Primary Nav */}
                    <ul className="flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <NavItem
                                key={index}
                                name={item.name}
                                link={item.link}
                                icon={item.icon}
                            />
                        ))}
                    </ul>
                </div>


            </div>

        </nav>
    );
};

export default Navbar;
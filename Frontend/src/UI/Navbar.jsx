import { useState } from 'react';
import NavItem from "../utils/NavItem";
import { FaTrophy, FaHistory, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                <div className="flex justify-between items-center">
                    {/* Logo/Brand */}
                    <div className="flex items-center py-4">
                        <span className="font-semibold text-gray-100 text-lg">
                            <a href="/">Leader Board</a>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <NavItem
                                key={index}
                                name={item.name}
                                link={item.link}
                                icon={item.icon}
                            />
                        ))}
                    </ul>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4">
                        <ul className="flex flex-col space-y-2">
                            {navItems.map((item, index) => (
                                <NavItem
                                    key={index}
                                    name={item.name}
                                    link={item.link}
                                    icon={item.icon}
                                    mobile
                                    onClick={() => setIsMobileMenuOpen(false)}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
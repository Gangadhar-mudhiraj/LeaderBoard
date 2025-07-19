// NavItem.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Assuming you use react-router-dom

const NavItem = ({ name, link, icon: Icon, mobile, onClick }) => {
    const baseClasses = "flex items-center space-x-2 rounded-md";
    const desktopClasses = "px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white";
    const mobileClasses = "block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white";
    const activeClasses = "bg-gray-900 text-white"; // Styles for active link

    return (
        <li>
            <NavLink
                to={link}
                onClick={onClick}
                className={({ isActive }) =>
                    `${baseClasses} ${mobile ? mobileClasses : desktopClasses} ${isActive ? activeClasses : ''}`
                }
            >
                {Icon && <Icon className="h-5 w-5" />} {/* Consistent icon size */}
                <span className="text-sm sm:text-base md:text-sm"> {/* Responsive font sizes */}
                    {name}
                </span>
            </NavLink>
        </li>
    );
};

export default NavItem;
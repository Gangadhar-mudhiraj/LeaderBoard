import { NavLink } from 'react-router-dom';

const NavItem = ({ name, link, icon: Icon }) => {
    return (
        <li className="mx-2">
            <NavLink
                to={link}
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-colors ${isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-200 hover:bg-gray-700'
                    }`
                }
            >
                {Icon && <Icon className="mr-2" />}
                {name}
            </NavLink>
        </li>
    );
};

export default NavItem;
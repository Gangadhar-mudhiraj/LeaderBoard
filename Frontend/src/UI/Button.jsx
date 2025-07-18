import { FaArrowRight } from 'react-icons/fa';

const Button = ({ text, onClickAction, disabled = false, variant = 'primary' }) => {
    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        danger: 'bg-red-600 hover:bg-red-700 text-white'
    };

    return (
        <button
            onClick={onClickAction}
            disabled={disabled}
            className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${variants[variant]
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
        >
            {text}
            <FaArrowRight className="ml-2" />
        </button>
    );
};

export default Button;
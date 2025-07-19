import NormalProfile from "../Assets/normalUser.png";

const NormalCard = ({ user, index, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
                p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between
                cursor-pointer transition-all duration-200 border-l-4
                ${isSelected
                    ? 'bg-blue-900 border-blue-500 shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700 border-transparent'}
                shadow-md hover:shadow-xl text-gray-200 mb-2
            `}
        >
            {/* User Info Section */}
            <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                {/* Rank - Adjusted for mobile, prominent */}
                <span className="font-semibold text-gray-400 w-8 text-left text-lg flex-shrink-0">
                    #{index + 4}
                </span>

                {/* Profile Picture and Name */}
                <div className="flex items-center space-x-3 ml-3 sm:ml-4 flex-grow min-w-0"> {/* min-w-0 to allow shrinking */}
                    <img
                        src={NormalProfile}
                        alt="User Profile"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-600 flex-shrink-0"
                    />
                    <span className="text-base sm:text-lg font-medium text-gray-100 truncate"> {/* truncate for long names */}
                        {user.name}
                    </span>
                </div>
            </div>

            {/* Points and Selected Status */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto pt-2 sm:pt-0 border-t border-gray-700 sm:border-t-0"> {/* Full width on mobile, no border top on sm+ */}
                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-gray-100 flex-shrink-0 mr-2"> {/* mr-2 for spacing */}
                    {user.points} pts
                </span>
                {isSelected && (
                    <span className="bg-blue-700 text-blue-100 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0"> {/* Smaller text for badge on mobile */}
                        ✓ Selected
                    </span>
                )}
            </div>
        </div>
    );
};

export default NormalCard;
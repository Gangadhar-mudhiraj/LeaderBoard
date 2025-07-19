import primeImage from "../Assets/primeUser.png";

const PrimeCard = ({ user, index, isSelected, onClick }) => {
    const rankClasses = [
        'bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-yellow-300 shadow-lg shadow-yellow-200/50', // Gold
        'bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-gray-200 shadow-lg shadow-gray-200/50', // Silver
        'bg-gradient-to-br from-amber-600 to-amber-800 border-2 border-amber-500 shadow-lg shadow-amber-200/50' // Bronze
    ];

    return (
        <div
            onClick={onClick}
            className={`
                p-6 rounded-xl cursor-pointer transition-all relative
                ${rankClasses[index]}
                ${isSelected ? 'ring-4 ring-blue-500 scale-[1.03]' : ''}
                text-white
                min-h-[180px]
                flex flex-col
            `}
        >
            {/* Prime badge for all top 3 users */}
            <div className="absolute top-4 right-4">
                <img
                    src={primeImage}
                    alt="Prime User"
                    className="w-10 h-10 object-contain drop-shadow-md rounded-full"
                />
            </div>

            {/* Crown icon only for top user (gold) */}
            {index === 0 && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <svg className="w-10 h-10 text-yellow-300 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2l2.45 5.5 5.78.53-4.32 3.76 1.28 5.64L10 14.25l-5.19 3.18 1.28-5.64L1.77 8.03l5.78-.53L10 2z" clipRule="evenodd" />
                    </svg>
                </div>
            )}

            <div className="flex gap-4 items-start mb-4">
                <span className="font-bold text-2xl">#{index + 1}</span>
                <span className="text-sm bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full font-medium">
                    {user.points} pts
                </span>
            </div>

            <div className="mt-auto">
                <h3 className="text-2xl font-bold mb-3">
                    {user.name}
                </h3>

                {isSelected && (
                    <div className="text-sm font-medium text-blue-100 bg-blue-600/90 px-3 py-1.5 rounded-full inline-block">
                        ✓ Selected
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrimeCard;
import { useEffect, useState } from "react";
import { useUserContext } from "../context/ContextProvider";

const History = () => {
    const [user, setUser] = useState(null);
    const { selectedUserId, usersData } = useUserContext();

    useEffect(() => {
        if (selectedUserId && usersData) {
            const foundUser = usersData.find(user => user._id === selectedUserId);
            setUser(foundUser);
        }
    }, [selectedUserId, usersData]);

    // Handle no user selected state
    if (!selectedUserId) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center text-gray-300">
                    <p className="text-xl font-semibold mb-2">👋 No User Selected</p>
                    <p>Please select a user from the Leader Board to view their history.</p>
                </div>
            </div>
        );
    }

    // Handle loading state
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center text-gray-300">
                    <p className="text-xl font-semibold animate-pulse">Loading user history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8"> {/* Added responsive padding */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-100 text-center"> {/* Larger font, centered */}
                {user.name}'s Point History
            </h2>

            <div className="bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 border border-gray-700"> {/* Darker background, subtle border */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b border-gray-700 pb-4"> {/* Responsive layout, border bottom */}
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-300">Current Points</h3>
                        <p className="text-4xl sm:text-5xl font-bold text-green-400 mt-1">{user.points}</p> {/* Prominent points */}
                    </div>
                    <div className="bg-gray-700 px-4 py-2 rounded-full text-gray-200 text-lg font-medium"> {/* Darker badge */}
                        Rank #{user.rank}
                    </div>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-300">History Records</h3>

                {user.history?.length > 0 ? (
                    <div className="space-y-4"> {/* Increased space between records */}
                        {user.history.map((record, index) => (
                            <div
                                key={record._id || `${record.awardedAt}-${index}`} // Use unique ID or fallback
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-700 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-gray-600"
                            > {/* Darker record background, subtle hover */}
                                <div className="mb-2 sm:mb-0">
                                    <p className="font-medium text-gray-200 text-base">
                                        {new Date(record.awardedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {new Date(record.awardedAt).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </p>
                                </div>
                                <span className="
                                    px-4 py-1 rounded-full text-sm font-semibold
                                    bg-green-600 text-white
                                    ">
                                    +{record.points} points
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 p-6 text-center bg-gray-700 rounded-lg">No history records found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default History;
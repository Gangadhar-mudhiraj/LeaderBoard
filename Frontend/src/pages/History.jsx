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

    if (!selectedUserId) {
        return <div className="p-4 text-center text-gray-500">Please select a user to view history</div>;
    }

    if (!user) {
        return <div className="p-4 text-center">Loading user history...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">{user.name}'s Point History</h2>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-semibold">Current Points</h3>
                        <p className="text-3xl font-bold text-blue-600">{user.points}</p>
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full">
                        Rank #{user.rank}
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-3">History Records</h3>

                {user.history?.length > 0 ? (
                    <div className="space-y-3">
                        {user.history.map((record, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium">
                                        {new Date(record.awardedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(record.awardedAt).toLocaleTimeString()}
                                    </p>
                                </div>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    +{record.points} points
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 p-4 text-center">No history records found</p>
                )}
            </div>
        </div>
    );
};

export default History;
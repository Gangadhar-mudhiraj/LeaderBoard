
import { useUserContext } from "../context/ContextProvider";
import Button from "../UI/Button";

const LeaderBoard = () => {
    const { usersData, isLoading, selectedUserId, setSelectedUserId, addPoints } = useUserContext();

    const handleSelect = (id) => {
        setSelectedUserId(id); // Simply set the new ID (no toggle)
    };
    usersData.forEach(element => {
        console.log(element);

    });

    if (isLoading) return <div className="text-center py-8">Loading leaderboard...</div>;
    if (!usersData || usersData.length === 0) return <div className="text-center py-8">No users found</div>;

    // Sort users by points (descending)
    const sortedUsers = [...usersData].sort((a, b) => b.points - a.points);

    // Get top 3 users (prime users)
    const primeUsers = sortedUsers.slice(0, 3);

    // Get remaining users (normal users)
    const normalUsers = sortedUsers.slice(3);

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Prime Users Section */}
            <div className="toppers mb-8">
                <h2 className="text-2xl font-bold mb-4">Top Performers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {primeUsers.map((user, index) => (
                        <div
                            key={user._id}
                            onClick={() => handleSelect(user._id)}
                            className={`p-4 rounded-lg shadow-md cursor-pointer transition-all ${index === 0 ? 'bg-gold-100 border-2 border-gold-300' :
                                index === 1 ? 'bg-silver-100 border-2 border-silver-300' :
                                    'bg-bronze-100 border-2 border-bronze-300'
                                } ${selectedUserId === user._id ? 'ring-2 ring-blue-500 scale-[1.02]' : ''
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-bold">#{index + 1}</span>
                                <span className="text-sm bg-white px-2 py-1 rounded-full">
                                    {user.points} pts
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mt-2">{user.name}</h3>
                            {selectedUserId === user._id && (
                                <div className="mt-2 text-xs text-blue-600">Selected</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Normal Users Section */}
            <div className="users mb-8">
                <h2 className="text-2xl font-bold mb-4">All Users</h2>
                <div className="space-y-3">
                    {normalUsers.map((user, index) => (
                        <div
                            key={user._id}
                            onClick={() => handleSelect(user._id)}
                            className={`p-4 rounded-lg shadow-sm flex justify-between items-center cursor-pointer transition-colors ${selectedUserId === user._id
                                ? 'bg-blue-50 border border-blue-200'
                                : 'bg-white hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center space-x-4">
                                <span className="font-medium">#{index + 4}</span>
                                <span className="text-lg">{user.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="bg-gray-100 px-3 py-1 rounded-full">
                                    {user.points} pts
                                </span>
                                {selectedUserId === user.id && (
                                    <span className="text-xs text-blue-600">✓ Selected</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="actions mt-6 flex justify-center">
                <Button
                    onClickAction={() => addPoints(selectedUserId)}
                    text="Claim Points"
                    disabled={!selectedUserId}
                    variant="primary"
                />
            </div>
        </div>
    );
};

export default LeaderBoard;
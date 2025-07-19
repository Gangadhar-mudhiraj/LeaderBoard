import { useUserContext } from "../context/ContextProvider";
import Button from "../UI/Button";
import PrimeCard from "../userProfiles/PrimeCard";
import NormalCard from "../userProfiles/NormalCard";
// Prime User Card Component (for top 3 users)

// Normal User Card Component (for all other users)


const LeaderBoard = () => {
    const { usersData, isLoading, selectedUserId, setSelectedUserId, addPoints } = useUserContext();

    const handleSelect = (id) => {
        setSelectedUserId(id);
    };

    if (isLoading) return <div className="text-center py-8">Loading leaderboard...</div>;
    if (!usersData || usersData.length === 0) return <div className="text-center py-8">No users found</div>;

    const transformedUsers = usersData.map(user => {
        // Check if it's a Mongoose document by checking for `_doc`
        if (user && user._doc) {
            return {
                ...user._doc, // Extract the plain data
                rank: user.rank // Keep the rank which is added directly
            };
        }
        // If it's already a plain object (e.g., from .lean() working correctly), return as is
        return user;
    });
    console.log(usersData);
    console.log(transformedUsers);


    // Get top 3 users (prime users)
    const primeUsers = transformedUsers.slice(0, 3);
    console.log("prime users", primeUsers);



    // Get remaining users (normal users)
    const normalUsers = transformedUsers.slice(3);
    console.log("normal users", normalUsers);

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Prime Users Section */}
            <div className="toppers mb-8">
                <h2 className="text-2xl text-white font-bold mb-4">Top Performers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {primeUsers.map((user, index) => (
                        <PrimeCard
                            key={user._id}
                            user={user}
                            index={index}
                            isSelected={selectedUserId === user._id}
                            onClick={() => handleSelect(user._id)}
                        />
                    ))}
                </div>
            </div>

            {/* Normal Users Section */}
            <div className="users mb-8">
                <h2 className="text-2xl text-white font-bold mb-4">All Users</h2>
                <div className="space-y-3">
                    {normalUsers.map((user, index) => (
                        <NormalCard
                            key={user._id}
                            user={user}
                            index={index}
                            isSelected={selectedUserId === user._id}
                            onClick={() => handleSelect(user._id)}
                        />
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
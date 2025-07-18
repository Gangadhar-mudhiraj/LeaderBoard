import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { SuccessNotify, FailureNotify, WarningNotify } from "../toastNotifications/Notifications";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const URL = import.meta.env.VITE_API_URL;

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${URL}/api/users`);

            const fetchedUsers = response.data.data;
            const plainUsers = fetchedUsers.map(user => {
                if (user && user._doc) {
                    return { ...user._doc, rank: user.rank }; // Ensure rank is carried over if backend adds it
                }
                return user;
            });

            // ✅ 2. SORT THE ARRAY ACCORDING TO POINTS (DESCENDING)
            const sortedUsers = [...plainUsers].sort((a, b) => b.points - a.points);

            // ✅ 3. ADD RANK PROPERTY TO EACH USER AFTER SORTING
            // This ensures ranks are assigned based on the sorted order
            const usersWithRank = sortedUsers.map((user, index) => ({
                ...user,
                rank: index + 1 // Assign rank based on sorted position
            }));

            setUsersData(usersWithRank);
            setSelectedUserId(null);

            // setUsersData(fetchedUsers.data.data);
        } catch (error) {
            FailureNotify("Unable to fetch users");
            console.error("Fetch users error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const addPoints = async () => {
        if (!selectedUserId) {
            WarningNotify("Please select a user");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${URL}/api/users/${selectedUserId}/add-points`);
            if (response.data) {
                SuccessNotify("Points added successfully!");
                setSelectedUserId(null)
                await fetchUsers();
            }
        } catch (error) {
            FailureNotify("Failed to add points");
            console.error("Add points error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addUser = async (newUser) => {
        if (!newUser.trim()) {
            WarningNotify("Please enter a valid name");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${URL}/api/users`, { name: newUser });
            if (response.data) {
                SuccessNotify("User added successfully!");
                await fetchUsers();
            }
        } catch (error) {
            FailureNotify("Failed to add user");
            console.error("Add user error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserContext.Provider
            value={{
                usersData,
                selectedUserId,
                setSelectedUserId,
                addPoints,
                addUser,
                isLoading,
                fetchUsers
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for easy context consumption
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
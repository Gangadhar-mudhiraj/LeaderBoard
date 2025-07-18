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
            setUsersData(response.data.data);
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
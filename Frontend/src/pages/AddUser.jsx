import React, { useState, useEffect } from 'react';
import Button from "../UI/Button.jsx"; // Assuming Button component handles its own dark theme styles
import { useUserContext } from '../context/ContextProvider';
import { FaUserPlus, FaTimes } from 'react-icons/fa';
// Assuming SuccessNotify and FailureNotify are theme-agnostic or handle their own styling
import { SuccessNotify, FailureNotify } from '../toastNotifications/Notifications';

const AddUser = () => {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { addUser, usersData } = useUserContext();

    // Validate username uniqueness
    useEffect(() => {
        if (usersData && name.trim()) {
            const isDuplicate = usersData.some(
                user => user.name.toLowerCase() === name.toLowerCase().trim()
            );
            setError(isDuplicate ? 'Username already exists' : '');
        } else {
            setError('');
        }
    }, [name, usersData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('Username cannot be empty');
            FailureNotify("Username cannot be empty."); // Using your FailureNotify
            return;
        }

        if (error) { // If there's an active error (e.g., duplicate), prevent submission
            FailureNotify(error); // Notify the user about the existing error
            return;
        }

        setIsSubmitting(true);
        try {
            await addUser(name);
            setName('');
        } catch (err) {
            console.error('Add user error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setName('');
        setError('');
    };

    return (
        <div className="max-w-md mx-auto p-4 sm:p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700 mt-8"> {/* Dark theme background, shadow, border, top margin */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-100 flex items-center justify-center"> {/* Larger text, light color, centered */}
                <FaUserPlus className="mr-3 text-blue-400" /> {/* Softer blue icon */}
                Add New User
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1"> {/* Light label text */}
                        Username
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                                bg-gray-700 text-gray-100 placeholder-gray-400`} // Dark input background, light text, placeholder
                            placeholder="Enter user name"
                            aria-invalid={!!error}
                            aria-describedby="username-error"
                        />
                        {name && (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300" // Lighter clear button
                                aria-label="Clear input"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                    {error && (
                        <p id="username-error" className="mt-1 text-sm text-red-400"> {/* Softer red for error */}
                            {error}
                        </p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3"> {/* Responsive buttons */}
                    <Button
                        text={isSubmitting ? 'Adding...' : 'Add User'}
                        onClickAction={handleSubmit}
                        disabled={isSubmitting || !name.trim() || !!error}
                        variant="primary" // Assuming primary button has good dark theme styles
                        className="flex-1"
                    />
                    <Button
                        text="Cancel"
                        onClickAction={handleReset}
                        variant="secondary" // Assuming secondary button has good dark theme styles
                        className="flex-1"
                        type="button"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddUser;
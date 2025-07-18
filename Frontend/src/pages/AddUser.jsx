import React, { useState, useEffect } from 'react';
import Button from "../UI/Button.jsx";
import { useUserContext } from '../context/ContextProvider';
import { FaUserPlus, FaTimes } from 'react-icons/fa';
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
            return;
        }

        if (error) return;

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
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaUserPlus className="mr-2 text-blue-600" />
                Add New User
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                            placeholder="Enter user name"
                            aria-invalid={!!error}
                            aria-describedby="username-error"
                        />
                        {name && (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label="Clear input"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                    {error && (
                        <p id="username-error" className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    )}
                </div>

                <div className="flex space-x-3">
                    <Button
                        text={isSubmitting ? 'Adding...' : 'Add User'}
                        onClickAction={handleSubmit}
                        disabled={isSubmitting || !name.trim() || !!error}
                        variant="primary"
                        className="flex-1"
                    />
                    <Button
                        text="Cancel"
                        onClickAction={handleReset}
                        variant="secondary"
                        className="flex-1"
                        type="button"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddUser;
"use client";

import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
interface User {
    id: number;
    username: string;
    email: string;
}

export default function  UsersPage () {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [newUserForm, setNewUserForm] = useState({
        username: '',
        email: '',
        password:""
    });

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<User[]>('http://localhost:8080/users/v1/');
            setUsers(response.data);
        } catch (error) {
            setError('Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers().then(r => (console.log()));
    }, []);



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserForm({
            ...newUserForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmitNewUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // ... Add input validation if needed ...

        try {
            await axios.post('/api/users', newUserForm);
            // Assuming successful API call:
            setNewUserForm({ username: '', email: '' }); // Clear form
            await fetchUsers(); // Refresh user list
        } catch (error) {
            // Handle the error appropriately
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Users</h1>

            {isLoading && <p className="text-center">Loading...</p>}

            {error && (
                <p className="text-center text-red-600">Error: {error}</p>
            )}

            {!isLoading && !error && (
                <ul className="divide-y divide-gray-200">
                    {users.map((user) => (
                        <li key={user.id} className="py-4">
                            <div className="flex items-center">
                                <img
                                    src={'/hero-mobile.png'}
                                    alt={user.username}
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <div>
                                    <p className="font-medium">{user.username}</p>
                                    <p className="text-gray-500">{user.email}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <form className="mt-6" onSubmit={handleSubmitNewUser}> {/* New Form */}
                <h2 className="text-lg font-semibold mb-2">Add New User</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="block mb-1">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={newUserForm.username}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 w-full"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="block mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={newUserForm.password}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Add User
                </button>
            </form>
        </div>
    );
}
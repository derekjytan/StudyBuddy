'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async () => {
        try {
            const response = await axios.post('/api/auth/register', { username, email, password });
            if (response.status === 201) {
                router.push('/'); // Redirect to the home page after successful signup
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error); // Display specific error from backend
            } else {
                setError('Failed to sign up. Please try again.');
            }
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
                <button
                    onClick={handleSignup}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg"
                >
                    Sign Up
                </button>
                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
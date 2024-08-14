'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            if (response.status === 200) {
                router.push('/'); // Redirect to the home page after successful login
            }
        } catch (error) {
            setError('Invalid email or password');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg"
                >
                    Login
                </button>
                <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-500">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
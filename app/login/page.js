'use client';

import React, { useState, useContext, useRef } from 'react';
import axios from '../api/axios';
import { useRouter } from 'next/navigation';
import AuthContext from "../contexts/authContext";

export default function LoginPage() {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/login', 
                JSON.stringify({ email, password }), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response))
            if (response.status === 200) {
                setSuccess(true) // Redirect to the home page after successful login
            }
        } catch (error) {
            setError('Invalid email or password');
            console.error('Login error:', error);
        }
    };

    return (
        <>
            {success ? (
                <section className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96 ">
                        <h2 className='w-full text-center text-2xl font-semibold mb-4'>You are logged in!</h2>
                        <p className='w-full text-center'>
                            <a href="/">Go to Home</a>
                        </p>
                    </div>
                </section>
            ) : (
            <section className="flex items-center justify-center min-h-screen bg-gray-100">
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
                        <a href="/register" className="text-blue-500">
                            Sign up
                        </a>
                    </p>
                </div>
            </section>
            )}
        </>
    );
}
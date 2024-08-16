'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from '../api/axios';

export default async function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const checkSession = async() => {
        try {
            const session = await axios.get('/api/session');
            console.log("Sesh: ", session);
            if(!session.data.data) {
                setLoggedIn(false)
            }
        } catch(error) {
            console.log("ERR: ", error)
        }
        
    };

    checkSession();
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/auth/logout');
            console.log(JSON.stringify(response))
            if (response.status === 200) {
                console.log('logout success')
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link href="/">StudyBuddy</Link>
                </div>

                {loggedIn ? (
                <div className="hidden md:flex space-x-6">
                    <button onClick={handleLogout} className="text-white hover:text-gray-300">
                        Logout
                    </button>
                    <h1 href="/login" className="text-white hover:text-gray-300">
                        User Filler
                    </h1>
                </div>
                ) : (
                    <div className="hidden md:flex space-x-6">
                    <Link href="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>
                    {/* <Link href="/chat" className="text-white hover:text-gray-300">
                        Chat
                    </Link> */}
                    <Link href="/login" className="text-white hover:text-gray-300">
                        Login
                    </Link>
                    <Link href="/register" className="text-white hover:text-gray-300">
                        Sign Up
                    </Link>
                </div>
                )}
                
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="flex flex-col space-y-4 mt-4">
                        <Link href="/" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                        <Link href="/about" className="text-white hover:text-gray-300">
                            About
                        </Link>
                        <Link href="/chat" className="text-white hover:text-gray-300">
                            Chat
                        </Link>
                        <Link href="/login" className="text-white hover:text-gray-300">
                            Login
                        </Link>
                        <Link href="/register" className="text-white hover:text-gray-300">
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
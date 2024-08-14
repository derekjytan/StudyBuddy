'use client'

import React, { useEffect, useState, useContext, createContext } from 'react'
import axios from 'axios'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/user');
            if (response.data && response.data.username) {
                setUser(response.data.username);
                console.log(response.data.username);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setError(error);
            setUser(null);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, fetchData, loading, error }}>
            {!loading ? (children) : null}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
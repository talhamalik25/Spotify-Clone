import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Since we are using cookies, we might want to check if the user is already logged in
        // For simplicity in this clone, we'll store user data in localStorage if needed, 
        // but the cookie handles the actual auth on the backend.
        const storedUser = localStorage.getItem('spotifyUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('spotifyUser', JSON.stringify(userData));
        return response.data;
    };

    const register = async (username, email, password, role) => {
        const response = await api.post('/auth/register', { username, email, password, role });
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('spotifyUser', JSON.stringify(userData));
        return response.data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('spotifyUser');
        // Optionally call backend logout to clear cookie
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

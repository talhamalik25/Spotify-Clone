import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-spotify-light to-black p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-black rounded-lg p-10 shadow-2xl border border-spotify-light/10"
            >
                <div className="flex flex-col items-center mb-10">
                    <div className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center mb-4">
                        <span className="text-black font-bold text-2xl italic">S</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight text-center">Log in to Spotify</h1>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-6 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-white mb-2">Username</label>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full bg-[#121212] border border-spotify-gray/30 rounded-md p-3 text-white focus:border-white outline-none transition"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-white mb-2">Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-[#121212] border border-spotify-gray/30 rounded-md p-3 text-white focus:border-white outline-none transition"
                            placeholder="Password"
                        />
                    </div>
                    <button 
                        disabled={loading}
                        type="submit"
                        className="w-full bg-spotify-green text-black font-bold p-3 rounded-full hover:scale-105 active:scale-95 transition mt-4 disabled:opacity-50 disabled:scale-100"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <hr className="border-spotify-light my-8" />

                <p className="text-center text-spotify-gray text-sm">
                    Don't have an account? {' '}
                    <Link to="/register" className="text-white font-bold hover:text-spotify-green underline transition">Sign up for Spotify</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;

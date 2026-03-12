import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="hidden md:flex w-64 bg-black h-full flex-col p-6 space-y-6 flex-shrink-0 border-r border-spotify-light/10">
            <div className="text-white flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xl italic">S</span>
                </div>
                <span className="text-2xl font-bold tracking-tight">Spotify Clone</span>
            </div>

            <nav className="flex-1 space-y-4">
                <NavLink to="/" className={({ isActive }) => `flex items-center space-x-4 font-semibold hover:text-white transition ${isActive ? 'text-white' : 'text-spotify-gray'}`}>
                    <Home size={24} />
                    <span>Home</span>
                </NavLink>
                <div className="flex items-center space-x-4 font-semibold text-spotify-gray hover:text-white transition cursor-not-allowed">
                    <Search size={24} />
                    <span>Search</span>
                </div>
                <div className="flex items-center space-x-4 font-semibold text-spotify-gray hover:text-white transition cursor-not-allowed">
                    <Library size={24} />
                    <span>Your Library</span>
                </div>

                <div className="pt-6 space-y-4">
                    {user?.role === 'artist' && (
                        <NavLink to="/upload" className={({ isActive }) => `flex items-center space-x-4 font-semibold hover:text-white transition ${isActive ? 'text-white' : 'text-spotify-gray'}`}>
                            <PlusSquare size={24} />
                            <span>Upload Music</span>
                        </NavLink>
                    )}
                    <div className="flex items-center space-x-4 font-semibold text-spotify-gray hover:text-white transition cursor-not-allowed">
                        <Heart size={24} />
                        <span>Liked Songs</span>
                    </div>
                </div>
            </nav>

            <div className="border-t border-spotify-light pt-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-spotify-light rounded-full flex items-center justify-center text-xs font-bold uppercase">
                        {user?.username?.[0] || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{user?.username || 'User'}</p>
                        <p className="text-xs text-spotify-gray capitalize">{user?.role || 'Guest'}</p>
                    </div>
                </div>
                <button 
                    onClick={logout}
                    className="flex items-center space-x-4 font-semibold text-spotify-gray hover:text-white transition w-full"
                >
                    <LogOut size={24} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

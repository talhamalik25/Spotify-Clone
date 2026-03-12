import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMusic } from '../context/MusicContext';

const Home = () => {
    const [music, setMusic] = useState([]);
    const [loading, setLoading] = useState(true);
    const { playSong, currentSong, isPlaying } = useMusic();

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const response = await api.get('/music');
                setMusic(response.data);
            } catch (err) {
                console.error("Failed to fetch music", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMusic();
    }, []);

    const MusicCard = ({ song, index }) => {
        const isCurrent = currentSong?._id === song._id;
        const activePlaying = isCurrent && isPlaying;

        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-spotify-light/30 p-4 rounded-xl hover:bg-spotify-light/60 transition-all cursor-pointer relative"
                onClick={() => playSong(song)}
            >
                <div className="relative aspect-square mb-4 shadow-xl">
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-800 rounded-lg flex items-center justify-center overflow-hidden">
                        <span className="text-5xl font-black text-white/20 select-none">MUSIC</span>
                    </div>
                    <button 
                        className={`absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${activePlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}
                    >
                        {activePlaying ? <Pause size={24} className="text-black fill-black" /> : <Play size={24} className="text-black fill-black ml-1" />}
                    </button>
                </div>
                <h3 className={`font-bold truncate mb-1 ${isCurrent ? 'text-spotify-green' : 'text-white'}`}>{song.title}</h3>
                <p className="text-sm text-spotify-gray truncate">{song.artist?.username || 'Artist'}</p>
            </motion.div>
        );
    };

    return (
        <div className="p-8 pb-32">
            <header className="flex items-center justify-between mb-8 sticky top-0 bg-spotify-black/80 backdrop-blur-md py-4 z-10">
                <h1 className="text-3xl font-bold tracking-tight">Welcome to Spotify</h1>
            </header>

            <section className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold hover:underline cursor-pointer">Recently added</h2>
                    <span className="text-sm font-bold text-spotify-gray hover:underline cursor-pointer">Show all</span>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="bg-spotify-light/20 p-4 rounded-xl animate-pulse">
                                <div className="aspect-square bg-spotify-light rounded-lg mb-4"></div>
                                <div className="h-4 bg-spotify-light rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-spotify-light rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : music.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {music.map((song, idx) => (
                            <MusicCard key={song._id || idx} song={song} index={idx} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-spotify-gray">
                        <p className="text-lg">No music found. Start by uploading some!</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;

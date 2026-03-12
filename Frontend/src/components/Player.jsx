import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Maximize2 } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

const Player = () => {
    const { currentSong, isPlaying, togglePlay, progress, duration, volume, setVolume, seek } = useMusic();

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleProgressChange = (e) => {
        seek(parseFloat(e.target.value));
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-spotify-black border-t border-spotify-light/10 px-4 flex items-center justify-between z-50">
            {/* Current Song Info */}
            <div className="flex items-center w-1/3">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-800 rounded-md flex-shrink-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white/40">SONG</span>
                </div>
                <div className="ml-4 truncate">
                    <p className="text-sm font-semibold text-white hover:underline cursor-pointer truncate">
                        {currentSong?.title || "Select a song"}
                    </p>
                    <p className="text-xs text-spotify-gray hover:underline cursor-pointer">
                        {currentSong?.artist?.username || "Unknown Artist"}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center w-2/5 max-w-xl">
                <div className="flex items-center space-x-6 mb-2">
                    <Shuffle size={18} className="text-spotify-gray hover:text-white cursor-pointer transition" />
                    <SkipBack size={24} className="text-spotify-gray hover:text-white cursor-pointer transition" />
                    <button 
                        onClick={togglePlay}
                        disabled={!currentSong}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition disabled:opacity-50"
                    >
                        {isPlaying ? <Pause size={20} className="text-black fill-black" /> : <Play size={20} className="text-black fill-black ml-0.5" />}
                    </button>
                    <SkipForward size={24} className="text-spotify-gray hover:text-white cursor-pointer transition" />
                    <Repeat size={18} className="text-spotify-gray hover:text-white cursor-pointer transition" />
                </div>
                <div className="w-full flex items-center space-x-2 group">
                    <span className="text-[10px] text-spotify-gray min-w-[30px] text-right">{formatTime(progress)}</span>
                    <input 
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={progress}
                        onChange={handleProgressChange}
                        className="flex-1 h-1 bg-spotify-light rounded-full appearance-none cursor-pointer accent-white hover:accent-spotify-green transition-all"
                    />
                    <span className="text-[10px] text-spotify-gray min-w-[30px]">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume & Misc */}
            <div className="flex items-center justify-end w-1/3 space-x-3">
                <Volume2 size={20} className="text-spotify-gray hover:text-white cursor-not-allowed" />
                <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-24 h-1 bg-spotify-light rounded-full appearance-none cursor-pointer accent-white hover:accent-spotify-green transition-all"
                />
                <Maximize2 size={18} className="text-spotify-gray hover:text-white cursor-not-allowed" />
            </div>
        </div>
    );
};

export default Player;

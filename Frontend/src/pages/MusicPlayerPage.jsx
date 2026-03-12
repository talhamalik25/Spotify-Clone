import React from 'react';

const MusicPlayerPage = () => {
    return (
        <div className="p-8 flex items-center justify-center h-full">
            <div className="text-center">
                <div className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-800 rounded-lg shadow-2xl mx-auto mb-8 flex items-center justify-center">
                     <span className="text-7xl font-black text-white/20 select-none tracking-tighter">SPOTIFY</span>
                </div>
                <h1 className="text-4xl font-black mb-4">Now Playing</h1>
                <p className="text-spotify-gray text-xl mb-12">Select a song to start listening to your favorite tracks.</p>
                
                <div className="flex items-center justify-center space-x-6 text-spotify-gray">
                    <div className="flex flex-col items-center">
                         <div className="w-12 h-12 rounded-full bg-spotify-light flex items-center justify-center mb-2">
                            <span className="text-white font-bold">1</span>
                         </div>
                         <span className="text-xs uppercase tracking-widest font-bold">Queue</span>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="w-12 h-12 rounded-full bg-spotify-light flex items-center justify-center mb-2">
                             <span className="text-white font-bold">2</span>
                         </div>
                         <span className="text-xs uppercase tracking-widest font-bold">Lyrics</span>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="w-12 h-12 rounded-full bg-spotify-light flex items-center justify-center mb-2">
                             <span className="text-white font-bold">3</span>
                         </div>
                         <span className="text-xs uppercase tracking-widest font-bold">Devices</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayerPage;

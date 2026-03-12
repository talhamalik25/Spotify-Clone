import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Upload as UploadIcon, Music, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error'
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !title) return;

        setLoading(true);
        setStatus(null);
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('music', file);

        try {
            await api.post('/music/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatus('success');
            setMessage('Music uploaded successfully!');
            setTitle('');
            setFile(null);
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.message || 'Failed to upload music. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <h1 className="text-4xl font-black mb-8">Beatmaker Studio</h1>
                
                <AnimatePresence>
                    {status && (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className={`p-4 rounded-lg mb-8 flex items-center space-x-3 ${status === 'success' ? 'bg-spotify-green/20 border border-spotify-green text-spotify-green' : 'bg-red-500/20 border border-red-500 text-red-500'}`}
                        >
                            {status === 'success' ? <CheckCircle2 /> : <AlertCircle />}
                            <span className="font-bold">{message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-8 bg-spotify-light/20 p-10 rounded-2xl border border-spotify-light/10">
                    <div>
                        <label className="block text-sm font-bold text-spotify-gray mb-3 uppercase tracking-widest">Song Title</label>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-spotify-light/40 border-none rounded-lg p-5 text-xl font-bold text-white focus:ring-2 focus:ring-spotify-green outline-none transition"
                            placeholder="Enters your masterpiece title..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-spotify-gray mb-3 uppercase tracking-widest">Music File (MP3, WAV)</label>
                        <div className="relative">
                            <input 
                                type="file"
                                id="music-upload"
                                onChange={handleFileChange}
                                accept="audio/*"
                                className="hidden"
                                required
                            />
                            <label 
                                htmlFor="music-upload"
                                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer ${file ? 'border-spotify-green bg-spotify-green/5' : 'border-spotify-gray/30 hover:border-white bg-spotify-light/20'}`}
                            >
                                {file ? (
                                    <div className="flex flex-col items-center text-spotify-green">
                                        <div className="w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center mb-4">
                                            <Music className="text-black" />
                                        </div>
                                        <p className="font-bold text-xl">{file.name}</p>
                                        <p className="text-sm opacity-70 mt-1">Ready to release</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-spotify-gray">
                                        <UploadIcon size={48} className="mb-4" />
                                        <p className="font-bold text-xl text-white mb-2">Select your audio file</p>
                                        <p className="text-sm">Drag and drop or browse files</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <button 
                        disabled={loading || !file || !title}
                        type="submit"
                        className="w-full bg-white text-black font-black text-lg py-5 rounded-full hover:bg-spotify-green hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-white"
                    >
                        {loading ? 'Processing Beats...' : 'Release to the World'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Upload;

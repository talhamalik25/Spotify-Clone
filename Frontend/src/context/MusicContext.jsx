import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(new Audio());

    const playSong = (song) => {
        if (currentSong?._id === song._id) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
            return;
        }

        setCurrentSong(song);
        audioRef.current.src = song.uri;
        audioRef.current.play();
        setIsPlaying(true);
    };

    const togglePlay = () => {
        if (!currentSong) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const audio = audioRef.current;

        const setAudioData = () => {
            setDuration(audio.duration);
        };

        const setAudioTime = () => {
            setProgress(audio.currentTime);
        };

        const onEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        };

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const seek = (time) => {
        audioRef.current.currentTime = time;
        setProgress(time);
    };

    return (
        <MusicContext.Provider value={{ 
            currentSong, 
            isPlaying, 
            playSong, 
            togglePlay, 
            volume, 
            setVolume, 
            progress, 
            duration,
            seek
        }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => useContext(MusicContext);

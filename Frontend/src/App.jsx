import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Upload from './pages/Upload';
import MusicPlayerPage from './pages/MusicPlayerPage';
import Sidebar from './components/Sidebar';
import Player from './components/Player';

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full"
    >
        {children}
    </motion.div>
);

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="flex items-center justify-center h-screen bg-spotify-black text-white">Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

function AppContent() {
    const { user } = useAuth();
    const location = useLocation();

    return (
        <div className="flex h-screen bg-spotify-black overflow-hidden font-sans">
            {user && <Sidebar />}
            <div className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden">
                <main className="flex-1 pb-24">
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/" element={<PrivateRoute><PageWrapper><Home /></PageWrapper></PrivateRoute>} />
                            <Route path="/upload" element={<PrivateRoute><PageWrapper><Upload /></PageWrapper></PrivateRoute>} />
                            <Route path="/player" element={<PrivateRoute><PageWrapper><MusicPlayerPage /></PageWrapper></PrivateRoute>} />
                        </Routes>
                    </AnimatePresence>
                </main>
                {user && <Player />}
            </div>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <MusicProvider>
                <Router>
                    <AppContent />
                </Router>
            </MusicProvider>
        </AuthProvider>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { onAuthChange } from './auth/firebase';

import Header from './components/Header.jsx';
import AuthModal from './auth/AuthModal.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import BlogPage from './pages/BlogPage.jsx';

const App = () => {
    const [page, setPage] = useState('home');
    const [user, setUser] = useState(null); // State for the current user
    const [isAuthReady, setIsAuthReady] = useState(false); // State to check if Firebase auth has loaded
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Listen for authentication changes when the app loads
    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            setUser(user);
            // Firebase has finished its initial check, so we can consider auth ready.
            setIsAuthReady(true);
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // New effect to show the modal on initial load if not logged in
    useEffect(() => {
        // Only run this logic after Firebase has confirmed the auth state
        if (isAuthReady && !user) {
            // Use a small timeout to prevent the modal from appearing too abruptly
            const timer = setTimeout(() => {
                setShowAuthModal(true);
            }, 1000); // 1-second delay
            
            // Cleanup the timer if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [isAuthReady, user]);


    const renderPage = () => {
        switch (page) {
            case 'about': return <AboutPage />;
            case 'pricing': return <PricingPage />;
            case 'contact': return <ContactPage />;
            case 'blog': return <BlogPage />;
            case 'home':
            default: return <HomePage />;
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-900 font-sans relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow opacity-30"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow-reverse opacity-30"></div>
            
            <div className="relative z-10 min-h-screen flex flex-col">
                <Header setPage={setPage} user={user} onSignInClick={() => setShowAuthModal(true)} />
                
                <AnimatePresence mode="wait">
                    <div key={page} className="flex-grow flex items-center justify-center">
                        {renderPage()}
                    </div>
                </AnimatePresence>
            </div>

            <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </div>
    );
};

export default App;

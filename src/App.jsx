import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Import the main Header component
import Header from './components/Header.jsx';

// Import all the page components
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import BlogPage from './pages/BlogPage.jsx';

// The main App component now manages the routing
const App = () => {
    // State to keep track of the current page
    const [page, setPage] = useState('home');

    // Function to render the correct page based on the state
    const renderPage = () => {
        switch (page) {
            case 'about':
                return <AboutPage />;
            case 'pricing':
                return <PricingPage />;
            case 'contact':
                return <ContactPage />;
            case 'blog':
                return <BlogPage />;
            case 'home':
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-900 font-sans relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow opacity-30"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow-reverse opacity-30"></div>
            
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* The Header component is passed the setPage function so it can change the page state */}
                <Header setPage={setPage} />
                
                {/* AnimatePresence allows for smooth transitions between pages */}
                <AnimatePresence mode="wait">
                    {/* This div now controls the main content alignment */}
                    <div key={page} className="flex-grow flex items-center justify-center">
                        {renderPage()}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default App;

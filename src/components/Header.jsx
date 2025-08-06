import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Utensils, Salad } from 'lucide-react';

// The Header now takes a 'setPage' function as a prop to control navigation
const Header = ({ setPage }) => (
    <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center text-white"
    >
        <button onClick={() => setPage('home')} className="flex items-center gap-2 focus:outline-none">
            <ChefHat className="w-8 h-8 text-pink-400" />
            <span className="text-2xl font-bold">ChefAI</span>
        </button>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {/* Added an explicit Home button for clarity */}
            <button onClick={() => setPage('home')} className="hover:text-pink-400 transition-colors">Home</button>
            <button onClick={() => setPage('about')} className="hover:text-pink-400 transition-colors">About Us</button>
            <button onClick={() => setPage('pricing')} className="hover:text-pink-400 transition-colors">Pricing</button>
            <button onClick={() => setPage('contact')} className="hover:text-pink-400 transition-colors">Contact Us</button>
            <button onClick={() => setPage('blog')} className="hover:text-pink-400 transition-colors">Blog</button>
        </nav>
        <div className="flex items-center gap-4">
            <Utensils className="w-5 h-5 hover:text-pink-400 transition-colors cursor-pointer"/>
            <Salad className="w-5 h-5 hover:text-pink-400 transition-colors cursor-pointer"/>
            <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
        </div>
    </motion.header>
);

export default Header;

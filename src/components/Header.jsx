import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Utensils, Salad, LogOut, Bookmark } from 'lucide-react';
import { doSignOut } from '../auth/firebase';

const Header = ({ setPage, user, onSignInClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    doSignOut();
    setPage('home'); // Redirect to home on sign out
    setShowDropdown(false);
  };

  return (
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
            <button onClick={() => setPage('home')} className="hover:text-pink-400 transition-colors">Home</button>
            <button onClick={() => setPage('about')} className="hover:text-pink-400 transition-colors">About Us</button>
            <button onClick={() => setPage('pricing')} className="hover:text-pink-400 transition-colors">Pricing</button>
            <button onClick={() => setPage('contact')} className="hover:text-pink-400 transition-colors">Contact Us</button>
            <button onClick={() => setPage('blog')} className="hover:text-pink-400 transition-colors">Blog</button>
        </nav>
        <div className="flex items-center gap-4">
            <Utensils className="w-5 h-5 hover:text-pink-400 transition-colors cursor-pointer"/>
            <Salad className="w-5 h-5 hover:text-pink-400 transition-colors cursor-pointer"/>
            <div className="relative">
              {user ? (
                <button onClick={() => setShowDropdown(!showDropdown)} onBlur={() => setTimeout(() => setShowDropdown(false), 200)}>
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email || 'C'}&background=d85c8b&color=fff`} alt="Profile" className="w-9 h-9 rounded-full border-2 border-pink-400" />
                </button>
              ) : (
                <button onClick={onSignInClick} className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"></button>
              )}
              
              <AnimatePresence>
                {showDropdown && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 right-0 bg-gray-800 rounded-lg shadow-lg w-48 border border-white/10 z-20"
                  >
                    <div className="p-2">
                      <p className="text-sm font-semibold px-2 py-1 truncate">{user.displayName || user.email}</p>
                      <hr className="border-gray-700 my-1" />
                      {/* New "My Recipes" button */}
                      <button onClick={() => { setPage('my-recipes'); setShowDropdown(false); }} className="w-full flex items-center gap-2 text-left px-2 py-2 text-sm hover:bg-white/5 rounded">
                        <Bookmark className="w-4 h-4" />
                        My Recipes
                      </button>
                      <button onClick={handleSignOut} className="w-full flex items-center gap-2 text-left px-2 py-2 text-sm text-red-400 hover:bg-white/5 rounded">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
    </motion.header>
  );
};

export default Header;

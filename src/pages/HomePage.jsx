import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import ImageCollage from '../components/ImageCollage.jsx';
import RecipeModal from '../components/RecipeModal.jsx';
import { generateRecipe as generateRecipeAPI } from '../api/gemini.js';

// HomePage now accepts the 'user' prop
const HomePage = ({ user }) => {
    const [prompt, setPrompt] = useState('');
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showRecipe, setShowRecipe] = useState(false);

    const handleGenerateClick = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        const result = await generateRecipeAPI(prompt);
        setIsLoading(false);

        if (result.error) {
            setError(result.error);
        } else {
            setRecipe(result.data);
            setShowRecipe(true);
        }
    };

    const handlePromptExampleClick = (example) => {
        setPrompt(example);
        const generateFromExample = async () => {
            if (isLoading) return;
            setIsLoading(true);
            setError(null);
            const result = await generateRecipeAPI(example);
            setIsLoading(false);
            if (result.error) {
                setError(result.error);
            } else {
                setRecipe(result.data);
                setShowRecipe(true);
            }
        };
        generateFromExample();
    };

    const handleCloseRecipe = () => {
        setShowRecipe(false);
        setTimeout(() => setRecipe(null), 300);
    };

    return (
        <>
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl w-full px-4">
                {/* Left Column: Input & Controls */}
                <div className="flex flex-col justify-center text-white">
                    <motion.h1 
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                    >
                        Create Delicious Recipes in Seconds!
                    </motion.h1>
                    <motion.p 
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        className="text-gray-400 mb-8 text-lg"
                    >
                        Enter your ingredients, choose your preferences, and let our AI create the perfect recipe for you.
                    </motion.p>
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                        className="flex items-center gap-2 bg-white/10 p-2 rounded-full border border-white/20 shadow-lg"
                    >
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter recipe name, ingredients..."
                            className="w-full bg-transparent p-3 text-white placeholder-gray-400 focus:outline-none"
                            onKeyPress={(e) => e.key === 'Enter' && handleGenerateClick()}
                        />
                        <button
                            onClick={handleGenerateClick}
                            disabled={isLoading}
                            className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-800 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-pink-500/20"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    <span>Generate</span>
                                </>
                            )}
                        </button>
                    </motion.div>
                    {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
                    <motion.div 
                         initial={{ y: 50, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                         className="mt-8"
                    >
                        <p className="text-gray-400 mb-3 text-sm font-medium">Example Prompts:</p>
                        <div className="flex flex-wrap gap-2">
                            {['Eggs, spinach, and mushrooms', 'Healthy recipe with lentils, kale, and carrots', 'I have tomatoes, onions, and pasta'].map(ex => (
                                <button 
                                    key={ex} 
                                    onClick={() => handlePromptExampleClick(ex)}
                                    className="text-xs bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 py-2 px-4 rounded-full transition-colors"
                                >
                                    {ex}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
                {/* Right Column: Image Collage */}
                <ImageCollage />
            </main>
            {/* Pass the user prop down to the RecipeModal */}
            <RecipeModal recipe={recipe} show={showRecipe} onClose={handleCloseRecipe} user={user} />
        </>
    );
};

export default HomePage;

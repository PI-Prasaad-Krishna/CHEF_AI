import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bookmark, Check, Trash2 } from 'lucide-react';
import { saveRecipe } from '../auth/firebase';

// The modal now accepts 'isSaved' and 'onDelete' props
const RecipeModal = ({ recipe, show, onClose, user, isSaved = false, onDelete }) => {
    const [saveStatus, setSaveStatus] = useState('idle');

    const handleSaveRecipe = async () => {
        if (!user || !recipe) return;
        setSaveStatus('saving');
        const result = await saveRecipe(user.uid, recipe);
        if (result.success) {
            setSaveStatus('saved');
        } else {
            setSaveStatus('idle');
        }
    };

    return (
        <AnimatePresence>
            {show && recipe && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 50, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 50, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-gray-800/50 backdrop-blur-xl border border-pink-500/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-pink-500/10 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-8 text-white">
                            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                            <div className="flex justify-between items-start gap-4">
                                <h2 className="text-3xl font-bold mb-6 text-pink-400">{recipe.recipeName}</h2>
                                {user && (
                                    isSaved ? (
                                        // If the recipe is already saved, show a "Remove" button
                                        <button 
                                            onClick={onDelete} 
                                            className="flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-full hover:bg-red-500/40 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" /> Remove
                                        </button>
                                    ) : (
                                        // Otherwise, show the "Save" button
                                        <button 
                                            onClick={handleSaveRecipe} 
                                            disabled={saveStatus !== 'idle'}
                                            className="flex items-center gap-2 bg-pink-500/20 text-pink-300 px-4 py-2 rounded-full hover:bg-pink-500/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {saveStatus === 'idle' && <><Bookmark className="w-5 h-5" /> Save</>}
                                            {saveStatus === 'saving' && <>Saving...</>}
                                            {saveStatus === 'saved' && <><Check className="w-5 h-5" /> Saved!</>}
                                        </button>
                                    )
                                )}
                            </div>
                            
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-3 border-b-2 border-pink-400/50 pb-2">Ingredients</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-300">
                                    {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold mb-3 border-b-2 border-pink-400/50 pb-2">Instructions</h3>
                                <ol className="list-decimal list-inside space-y-3 text-gray-300">
                                    {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
                                </ol>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RecipeModal;

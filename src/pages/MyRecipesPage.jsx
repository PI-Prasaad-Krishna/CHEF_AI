import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSavedRecipes, deleteRecipe } from '../auth/firebase';
import { Trash2, BookOpen, Clock } from 'lucide-react';

// This page now accepts a 'user' prop
const MyRecipesPage = ({ user }) => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch recipes only if a user is logged in
        if (user) {
            const fetchRecipes = async () => {
                setIsLoading(true);
                const savedRecipes = await getSavedRecipes(user.uid);
                setRecipes(savedRecipes);
                setIsLoading(false);
            };
            fetchRecipes();
        } else {
            // If no user, set loading to false and recipes to empty
            setIsLoading(false);
            setRecipes([]);
        }
    }, [user]); // Rerun effect if user changes

    const handleDelete = async (recipeId) => {
        // Optimistically update the UI
        setRecipes(recipes.filter(r => r.id !== recipeId));
        await deleteRecipe(recipeId);
    };

    if (isLoading) {
        return <div className="text-white">Loading your recipes...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-white max-w-6xl mx-auto p-8 w-full"
        >
            <h1 className="text-5xl font-bold mb-8 text-center text-pink-400">My Saved Recipes</h1>

            {recipes.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-pink-300">{recipe.recipeName}</h2>
                                <h3 className="text-lg font-semibold mb-2 border-b border-white/20 pb-1">Ingredients</h3>
                                <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
                                    {recipe.ingredients.slice(0, 4).map((ing, i) => <li key={i}>{ing}</li>)}
                                    {recipe.ingredients.length > 4 && <li>...and more</li>}
                                </ul>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"><BookOpen className="w-4 h-4" /> View Full Recipe</button>
                                <button onClick={() => handleDelete(recipe.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-full transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-400 mt-16">
                    <Clock className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-2xl">No recipes saved yet.</h2>
                    <p>Generate a recipe on the home page and save it to see it here!</p>
                </div>
            )}
        </motion.div>
    );
};

export default MyRecipesPage;

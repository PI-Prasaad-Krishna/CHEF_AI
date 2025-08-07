import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSavedRecipes, deleteRecipe } from '../auth/firebase';
import { Trash2, BookOpen, Clock } from 'lucide-react';
import RecipeModal from '../components/RecipeModal.jsx'; // Import the modal

const MyRecipesPage = ({ user }) => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State for the recipe modal
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchRecipes = async () => {
                setIsLoading(true);
                const savedRecipes = await getSavedRecipes(user.uid);
                setRecipes(savedRecipes);
                setIsLoading(false);
            };
            fetchRecipes();
        } else {
            setIsLoading(false);
            setRecipes([]);
        }
    }, [user]);

    const handleDelete = async (recipeId) => {
        // This function is now used by both the card's delete button and the modal's remove button
        setRecipes(recipes.filter(r => r.id !== recipeId));
        await deleteRecipe(recipeId);
    };

    const handleViewRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRecipe(null);
    };

    // New function to handle deletion from within the modal
    const handleRemoveFromModal = () => {
        if (!selectedRecipe) return;
        handleDelete(selectedRecipe.id);
        handleCloseModal();
    };

    if (isLoading) {
        return <div className="text-white text-center">Loading your saved recipes...</div>;
    }

    return (
        <>
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
                                    <button onClick={() => handleViewRecipe(recipe)} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"><BookOpen className="w-4 h-4" /> View Full Recipe</button>
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

            {/* The RecipeModal now gets the isSaved and onDelete props */}
            <RecipeModal 
                recipe={selectedRecipe} 
                show={showModal} 
                onClose={handleCloseModal} 
                user={user}
                isSaved={true} 
                onDelete={handleRemoveFromModal}
            />
        </>
    );
};

export default MyRecipesPage;

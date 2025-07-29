import React, {useEffect, useState} from "react";
import { Route, useNavigate, useParams } from "react-router-dom";

const EditRecipe = ({onRecipeUpdate}) => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [recipeName, setRecipeName] = useState("");
    const [instructions, setInstructions] = useState("");
    const [servings, setServings] = useState("");
    const [cookTimeMinutes, setCookTimeMinutes] = useState("");
    const [prepTimeMinutes, setPrepTimeMinutes] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await fetch(`http://localhost:5000/api/recipes/${id}`);
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.msg || 'Failed to fetch recipe for editing');
                }
                const data = await res.json();
                // Pre-populate form fields with fetched data
                setRecipeName(data.recipeName || '');
                setInstructions(data.instructions || '');
                setServings(data.servings || '');
                setCookTimeMinutes(data.cookTimeMinutes || '');
                setPrepTimeMinutes(data.prepTimeMinutes || '');
                setIngredients(Array.isArray(data.ingredients) ? data.ingredients.join(', ') : data.ingredients || ''); // Join array to string
                setImageUrl(data.imageUrl || '');
            } catch (err) {
                console.error("Error fetching recipe for edit:", err);
                setError(err.message || 'Error loading recipe for editing.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRecipe();
        } else {
            setError('No recipe ID provided for editing.');
            setLoading(false);
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!recipeName || !instructions || !ingredients) {
            setError('Recipe Name, Instructions, and Ingredients are required fields');
            return;
        }
        setSubmitting(true); 

        try {
            const response = await fetch(`http://localhost:5000/api/recipes/${id}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipeName,
                    instructions,
                    servings,
                    cookTimeMinutes: Number(cookTimeMinutes) || 0,
                    prepTimeMinutes: Number(prepTimeMinutes) || 0,
                    ingredients: ingredients.split(',').map(item => item.trim()),
                    imageUrl
                })
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.message || 'Recipe updated successfully!');
                onRecipeUpdate(data.recipe); 
                navigate('/dashboard', { replace: true });
            } else {
                setError(data.message || 'Failed to update recipe');
            }
        } catch (err) {
            console.error('Update recipe network error:', err);
            setError('Network error: Could not connect to the server.');
        }
        setSubmitting(false);
    };

    const handleCancel = () => {
        navigate('/dashboard', { replace: true });
    };

    if (loading) return <div className="text-center text-lg mt-8">Loading recipe for editing...</div>;

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Edit Recipe</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 text-red-500 text-center">{error}</div>
                    )}
                    {successMessage && (
                        <div className="mb-4 text-green-500 text-center">{successMessage}</div>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700">Recipe Name</label>
                            <div className="mt-1">
                                <input
                                    id="recipeName"
                                    name="recipeName"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    value={recipeName}
                                    onChange={(e) => setRecipeName(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                            <div className="mt-1">
                                <input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    autoComplete="off"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="e.g., https://example.com/my-recipe-image.jpg"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients (comma-separated)</label>
                            <div className="mt-1">
                                <textarea
                                    id="ingredients"
                                    name="ingredients"
                                    rows="3"
                                    required
                                    value={ingredients}
                                    onChange={(e) => setIngredients(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
                            <div className="mt-1">
                                <textarea
                                    id="instructions"
                                    name="instructions"
                                    rows="5"
                                    required
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="servings" className="block text-sm font-medium text-gray-700">Servings</label>
                            <div className="mt-1">
                                <input
                                    id="servings"
                                    name="servings"
                                    type="text"
                                    value={servings}
                                    onChange={(e) => setServings(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="prepTimeMinutes" className="block text-sm font-medium text-gray-700">Preparation Time (minutes)</label>
                            <div className="mt-1">
                                <input
                                    id="prepTimeMinutes"
                                    name="prepTimeMinutes"
                                    type="number"
                                    value={prepTimeMinutes}
                                    onChange={(e) => setPrepTimeMinutes(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cookTimeMinutes" className="block text-sm font-medium text-gray-700">Cook Time (minutes)</label>
                            <div className="mt-1">
                                <input
                                    id="cookTimeMinutes"
                                    name="cookTimeMinutes"
                                    type="number"
                                    value={cookTimeMinutes}
                                    onChange={(e) => setCookTimeMinutes(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center space-x-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {submitting ? 'Updating...' : 'Update Recipe'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditRecipe;

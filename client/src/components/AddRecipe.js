import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = ({onAddRecipe}) => {
    const [recipeName, setRecipeName] = useState("");
    const [instructions, setInstructions] = useState("");
    const [servings, setServings] = useState("");
    const [cookTimeMinutes, setCookTimeMinutes] = useState("");
    const [prepTimeMinutes, setPrepTimeMinutes] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if(!recipeName || !instructions || !ingredients){
            setError('Recipe Name, Instruction and Ingredients are required fields');
            return;
        }
        setLoading(true);

        try{
            const response = await fetch('http://localhost:5000/api/addRecipe',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipeName, 
                    instructions, 
                    servings,
                    cookTimeMinutes: Number(cookTimeMinutes) || 0,
                    prepTimeMinutes: Number(prepTimeMinutes) || 0,
                    ingredients: ingredients.split(',').map(item => item.trim()),
                imageUrl})
            });
            const data = await response.json();
            if(response.ok){
                setSuccessMessage(data.message || 'Recipe added successfully!');
                setRecipeName('');
                setInstructions('');
                setServings('');
                setCookTimeMinutes('');
                setPrepTimeMinutes('');
                setIngredients('');
                setImageUrl('');
                onAddRecipe(data.recipe);
                navigate('/dashboard',{replace: true})
            }else{
                setError(data.message || 'Failed to add recipe');
            }
        }catch(err){
            setError('Network error');
        }
        setLoading(false);
}

return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add New Recipe</h2>
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

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Adding...' : 'Add Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
};

export default AddRecipe;

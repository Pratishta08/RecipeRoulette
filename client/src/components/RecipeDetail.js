import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const RecipeDetails=()=>{
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/recipes/edit/${id}`);}
    
        // const handleDeleteClick = () => {
        // navigate(`/recipes/delete/${id}`);}

    const placeholderImg = "https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg";
    useEffect(()=>{
        const fetchRecipeById = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await fetch(`http://localhost:5000/api/recipes/${id}`);
                if(!res.ok){
                    const errData = await res.json();
                    throw new error(errData.msg || 'Failed to fetch recipe');
                }
                const data = await res.json();
                setRecipe(data);
            }catch(err){
                console.log('Error fetching recipes', err);
                setError(err.message || 'Error fetching recipe');
            }finally{
                setLoading(false);
            }
    };
    if(id){
        fetchRecipeById();
    }else{
    console.warn("No ID found in URL params for RecipeDetailPage.");
            setError('No recipe ID provided in the URL.');
            setLoading(false);
    }
}, [id]);

    if (loading){return<div>loading recipe details</div>;}
    if(error){return <div>{Error}</div>}
    if(!recipe){return <div>Recipe not found</div>}

    return(
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto my-8 border border-purple-200 relative">
            <button
                onClick={() => navigate('/dashboard')} // Navigate back to the dashboard
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
                aria-label="Back to Dashboard"
            >
                &times; {/* This is an 'X' symbol */}
            </button>
            <button
                onClick={handleEditClick}
                className="absolute top-4 right-14 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
            >
                Edit
            </button>
            <h2 className="text-3xl font-extrabold text-purple-800 mb-4">{recipe.recipeName}</h2>
            <img
                src={recipe.imageUrl || placeholderImg}
                alt={recipe.recipeName}
                className="w-full h-64 object-cover rounded-md mb-6 shadow-md"
                onError={e => (e.target.src = placeholderImg)}
            />
            <div className="space-y-4 text-gray-700">
                {recipe.cuisine && <p><strong>Cuisine:</strong> {recipe.cuisine}</p>}
                {recipe.servings && <p><strong>Servings:</strong> {recipe.servings}</p>}
                {recipe.instructions && <p><strong>Instructions: <br></br></strong>{recipe.instructions}</p>}
                {recipe.ingredients && (
                    <div>
                        <h3 className="text-xl font-semibold text-purple-700 mt-6 mb-2">Ingredients:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {Array.isArray(recipe.ingredients) ? (
                                recipe.ingredients.map((ingredient, i) => (
                                    <li key={i}>{ingredient}</li>
                                ))
                            ) : (
                                <li>{recipe.ingredients}</li>
                            )}
                        </ul>
                    </div>
                )}
                {recipe.cookTimeMinutes > 0 && <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>}
                {recipe.prepTimeMinutes > 0 && <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>}
            </div>
            {/* <button
                onClick={handleDeleteClick}
                className="absolute top-4 right-14 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
            >
                Delete
            </button> */}
        </div>
    );
};
export default RecipeDetails;


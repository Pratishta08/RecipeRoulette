import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AllRecipes = ({searchQuery, refreshRecipes}) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const navigate = useNavigate();

    const placeholderImg = "https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg";

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            setError('');
            try {
                const url = searchQuery
                    ? `http://localhost:5000/api/recipes?query=${encodeURIComponent(searchQuery)}`
                    : 'http://localhost:5000/api/recipes';
                const res = await fetch(url);
                if (!res.ok) throw new Error('Failed to fetch recipes');
                const data = await res.json();
                setRecipes(data);
            } catch (err) {
                setError('Error fetching recipes');
            }
            setLoading(false);
        };
        fetchRecipes();
    }, [searchQuery, refreshRecipes]);

    if (loading) return <div>Loading recipes .....</div>;
    if (error) return <div>{error}</div>;

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipes/${recipeId}`);
    };

        console.log("Selected Recipe for Detail:", selectedRecipe);
    return (
        <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recipes.length>0 ? (
                    recipes.map((recipe, idx) => (
                        <div
                            key={recipe._id || idx}
                            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                            onClick={() => handleRecipeClick(recipe._id)} // Pass the whole recipe object
                        >
                            <img
                                src={recipe.imageUrl || placeholderImg}
                                alt={recipe.recipeName}
                                className="w-full h-48 object-cover"
                                onError={e => (e.target.src = placeholderImg)}
                            />
                            <div className="p-4 flex-1 flex flex-col">
                                <h2 className="text-lg font-bold text-purple-700 mb-1 truncate">{recipe.recipeName}</h2>
                                {recipe.rating && (
                                    <p className="text-sm text-gray-600">Rating: {recipe.rating}</p>
                                )}
                                {/* Only show image and rating here, remove other details */}
                            </div>
                        </div>
                    ))
                    ): (
                    <div className="col-span-full text-center text-gray-600 py-10">No recipes found matching your criteria.</div>
                )}
                </div>
        </div>
    );
};

export default AllRecipes;  
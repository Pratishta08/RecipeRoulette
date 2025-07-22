const axios = require('axios');

exports.filterByIngredient = async (req, res) => {
  const { ingredient } = req.query;
  if (!ingredient) {
    return res.status(400).json({ message: 'Ingredient is required' });
  }
  try {
    // Fetch all recipes from DummyJSON
    const response = await axios.get('https://dummyjson.com/recipes');
    // Filter recipes by ingredient (case-insensitive)
    const filtered = (response.data.recipes || []).filter(recipe =>
      recipe.ingredients.some(i =>
        i.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
    res.json({ meals: filtered });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
};
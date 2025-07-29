const axios = require('axios');
const Recipe = require('../models/Recipes');

exports.getAllAndSearchRecipes = async (req, res) => {
  const { query } = req.query;
  let filter={};
  try{
  if (query) {
    filter = {
              $or: [
                  { recipeName: { $regex: query, $options: 'i' } }, 
                  { ingredients: { $regex: query, $options: 'i' } } 
              ]
            };
  }
  const recipes = await Recipe.find(filter);
  res.json(recipes);
}catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
};

exports.recipeUpdate = async(req, res) => {
  try{
    const {id} = req.params;
    const {recipeName, ingredients, instructions, cookTimeMinutes, prepTimeMinutes, servings, imageUrl} = req.body;
    if (!recipeName || !instructions || !ingredients || ingredients.length === 0) {
            return res.status(400).json({ message: 'Recipe Name, Instructions, and Ingredients are required fields for update.' });
    }
    const recipeToUpdate = await Recipe.findById(id);
    if(!recipeToUpdate){
      return res.status(404).json({message: 'Recipe not found'});
    }
    recipeToUpdate.recipeName = recipeName;
    recipeToUpdate.ingredients=ingredients;
    recipeToUpdate.instructions=instructions;
    recipeToUpdate.cookTimeMinutes=cookTimeMinutes;
    recipeToUpdate.servings=servings;
    recipeToUpdate.imageUrl=imageUrl || '';

    await recipeToUpdate.save();
    res.status(200).json({
      recipe: {
        id: recipeToUpdate._id,
        recipeName: recipeToUpdate.recipeName,
        servings: recipeToUpdate.servings,
        instructions: recipeToUpdate.instructions,
        prepTimeMinutes: recipeToUpdate.prepTimeMinutes,
        cookTimeMinutes: recipeToUpdate.cookTimeMinutes,
        ingredients: recipeToUpdate.ingredients,
        imageUrl: recipeToUpdate.imageUrl
      },
      message: "Recipe updated successfully!"
    });
  }catch(err){
    console.log('Recipe update error', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid recipe ID format.' });
    }
    if (err.name === 'ValidationError') {
      let messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: "Failed to update recipe. Server error." });
  }
};

// exports.deleteRecipe = async(req, res) => {
//   try{
//     const {id} = req.params;
//     const recipeToDelete = await Recipe.findById(id);
//     if(!recipeToDelete){
//       return res.status(404).json({message: 'Recipe not found'});
//     }
//     await recipeToDelete.remove();
//     res.status(200).json({message: 'Recipe deleted successfully!'});
//     }catch(err){
//       console.log('Recipe delete error', err);
//     }

// }
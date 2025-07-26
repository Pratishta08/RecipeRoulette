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
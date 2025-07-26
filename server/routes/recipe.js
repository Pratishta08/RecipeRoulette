const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipes');
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.getAllAndSearchRecipes)
// Example route
router.get('/', async(req,res)=>{
    try{
        const recipes = await Recipe.find();
        res.json(recipes);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') { // For invalid MongoDB ID format
            return res.status(404).json({ msg: 'Recipe not found' });
        }
        res.status(500).send('Server Error');
    }
});


module.exports = router; 

const Recipe = require('../models/Recipes');
// const addRecipeSchema = require('../models/AddRecipe');

exports.addRecipe = async (req, res) => {
    try {
        const { recipeName, servings, instructions, prepTimeMinutes, cookTimeMinutes, ingredients, imageUrl } = req.body;
        
        if(!recipeName || !instructions || !ingredients){
            return res.status(400).json({message:'Recipe Name, Instruction and Ingredients are required fields'});
            return;
        }
        
        const existingRecipe = await Recipe.findOne({ recipeName });
        if (existingRecipe) {
            return res.status(400).json({ message: "Recipe already exists" });
        }


        const newRecipe = new Recipe({
            recipeName,
            servings,
            instructions,
            prepTimeMinutes,
            cookTimeMinutes,
            ingredients,
            imageUrl: imageUrl || ''
        });
        
        await newRecipe.save();


        res.status(201).json({
            recipe: {
                id: newRecipe._id,
                recipeName: newRecipe.recipeName,
                servings: newRecipe.servings,
                instructions: newRecipe.instructions,
                prepTimeMinutes: newRecipe.prepTimeMinutes,
                cookTimeMinutes: newRecipe.cookTimeMinutes,
                ingredients: newRecipe.ingredients,
                imageUrl: newRecipe.imageUrl
            },
            message: "Recipe added successfully"
        });
    } catch (error) {
        console.error('Recipe addition error:', error);
        res.status(500).json({ message: "Recipe not added" });
    }
};

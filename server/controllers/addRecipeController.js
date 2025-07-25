const AddRecipe = require('../models/AddRecipe');
// const addRecipeSchema = require('../models/AddRecipe');

exports.addRecipe = async (req, res) => {
    try {
        const { recipeName, servings, instructions, prepTimeMinutes, cookTimeMinutes, ingredients } = req.body;
        
        if(!recipeName || !instructions || !ingredients){
            return res.status(400).json({message:'Recipe Name, Instruction and Ingredients are required fields'});
            return;
        }
        
        const existingRecipe = await AddRecipe.findOne({ recipeName });
        if (existingRecipe) {
            return res.status(400).json({ message: "Recipe already exists" });
        }


        const newRecipe = new AddRecipe({
            recipeName,
            servings,
            instructions,
            prepTimeMinutes,
            cookTimeMinutes,
            ingredients
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
                ingredients: newRecipe.ingredients
            },
            message: "Recipe added successfully"
        });
    } catch (error) {
        console.error('Recipe addition error:', error);
        res.status(500).json({ message: "Recipe not added" });
    }
};

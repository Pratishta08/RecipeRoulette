const addRecipeSchema = require('../models/AddRecipe');

exports.addRecipe = async (req, res) => {
    try {
        const { recipeName, servings, instructions, prepTimeMinutes, cookTimeMinutes, ingredients } = req.body;
        
        if(!recipeName || !instructions || !ingredients){
            return res.status(400).json({message:'Recipe Name, Instruction and Ingredients are required fields'});
            return;
        }
        
        const existingRecipe = await User.findOne({ recipeName });
        if (existingRecipe) {
            return res.status(400).json({ message: "Recipe already exists" });
        }


        const recipe = new Recipe({
            recipeName,
            servings,
            instructions,
            prepTimeMinutes,
            cookTimeMinutes,
            ingredients,
            imageUrl
        });
        
        await recipe.save();


        res.status(201).json({
            token,
            recipe: {
                id: recipe._id,
                recipeName: recipe.recipeName,
                servings: recipe.servings,
                instructions: recipe.instructions,
                prepTimeMinutes: recipe.prepTimeMinutes,
                cookTimeMinutes: recipe.cookTimeMinutes,
                ingredients: recipe.ingredients,
                imageUrl: recipe.imageUrl
            },
            message: "Recipe added successfully"
        });
    } catch (error) {
        console.error('Recipe addition error:', error);
        res.status(500).json({ message: "Recipe not added" });
    }
};

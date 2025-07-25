const mongoose = require('mongoose');

const addRecipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
    },
    servings: {
        type: String,
    },
    instructions: {
        type: String,
        required: true,
        minlength: 6
    },
    ingredients: [{
        type: String,
        required: true
    }],
    prepTimeMinutes:{
        type: Number,
    },
    cookTimeMinutes:{
        type: Number
    }
});

module.exports = mongoose.model('AddRecipe', addRecipeSchema);
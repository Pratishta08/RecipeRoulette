const mongoose = require ('mongoose');
const recipeSchema = new mongoose.Schema({
    recipeName:{
        type:String,
        required:true,
        trim: true
    },
    rating:{type: String},
    instructions:{type: String, required:true},
    prepTimeMinutes:{type: String},
    cookTimeMinutes:{type: String},
    servings:{type: String},
    ingredients:[{type: String}],
    imageUrl:{type:String}
    },{timestamps:true})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports= Recipe;
